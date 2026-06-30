import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { SignJWT } from 'jose'
import { readFileSync, existsSync } from 'fs'
import path from 'path'

// Einfache In-Memory-Sperre: max 5 Fehlversuche pro IP
const failedAttempts = new Map<string, { count: number; lockedUntil: number }>()

function getPasswordHash(): string {
  const settingsPath = path.join(process.cwd(), 'data', 'admin-settings.json')
  if (existsSync(settingsPath)) {
    try {
      const settings = JSON.parse(readFileSync(settingsPath, 'utf-8'))
      if (settings.passwordHash) return settings.passwordHash
    } catch {}
  }
  return process.env.ADMIN_PASSWORD_HASH ?? ''
}

export async function POST(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for') ?? request.headers.get('x-real-ip') ?? 'unknown'
  const now = Date.now()

  const attempts = failedAttempts.get(ip)
  if (attempts && attempts.lockedUntil > now) {
    return NextResponse.json({ error: 'Zu viele Fehlversuche. Bitte warten.' }, { status: 429 })
  }

  const { username, password } = await request.json()

  const validUsername = username?.trim().toLowerCase() === process.env.ADMIN_USERNAME?.trim().toLowerCase()
  const validPassword = await bcrypt.compare(password, getPasswordHash())

  if (!validUsername || !validPassword) {
    const current = failedAttempts.get(ip) ?? { count: 0, lockedUntil: 0 }
    const newCount = current.count + 1
    failedAttempts.set(ip, {
      count: newCount,
      lockedUntil: newCount >= 5 ? now + 15 * 60 * 1000 : 0,
    })
    return NextResponse.json({ error: 'Ungültige Zugangsdaten' }, { status: 401 })
  }

  failedAttempts.delete(ip)

  const secret = new TextEncoder().encode(process.env.ADMIN_SESSION_SECRET!)
  const token = await new SignJWT({ username })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(secret)

  const response = NextResponse.json({ success: true })
  response.cookies.set('admin_session', token, {
    httpOnly: true,
    secure: request.nextUrl.protocol === 'https:',
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60,
    path: '/',
  })
  return response
}
