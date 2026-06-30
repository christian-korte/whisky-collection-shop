import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function POST(request: NextRequest) {
  const formData = await request.formData()
  const file = formData.get('file') as File | null
  const slug = (formData.get('slug') as string | null) ?? 'whisky'

  if (!file) {
    return NextResponse.json({ error: 'Keine Datei' }, { status: 400 })
  }

  const ext = file.name.split('.').pop()?.toLowerCase().replace(/[^a-z0-9]/g, '') ?? 'jpg'
  if (!['jpg', 'jpeg', 'png', 'webp'].includes(ext)) {
    return NextResponse.json({ error: 'Ungültiger Dateityp' }, { status: 400 })
  }

  const safeSlug = slug.replace(/[^a-z0-9-]/g, '')
  const filename = `${safeSlug}-${Date.now()}.${ext}`
  const uploadDir = path.join(process.cwd(), 'public', 'images', 'whisky')

  if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true })

  const buffer = Buffer.from(await file.arrayBuffer())
  fs.writeFileSync(path.join(uploadDir, filename), buffer)

  return NextResponse.json({ url: `/images/whisky/${filename}` })
}
