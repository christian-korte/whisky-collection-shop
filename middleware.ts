import { NextRequest, NextResponse } from 'next/server'
import { jwtVerify } from 'jose'

const PROTECTED_PATHS = ['/admin', '/api/admin']
const PUBLIC_PATHS = ['/admin/login', '/api/admin/login']

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  const isProtected = PROTECTED_PATHS.some(p => pathname.startsWith(p))
  const isPublic = PUBLIC_PATHS.some(p => pathname.startsWith(p))

  if (!isProtected || isPublic) return NextResponse.next()

  const token = request.cookies.get('admin_session')?.value
  if (!token) {
    if (pathname.startsWith('/api/')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    return NextResponse.redirect(new URL('/admin/login', request.url))
  }

  try {
    const secret = new TextEncoder().encode(process.env.ADMIN_SESSION_SECRET!)
    await jwtVerify(token, secret)
    return NextResponse.next()
  } catch {
    if (pathname.startsWith('/api/')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    const response = NextResponse.redirect(new URL('/admin/login', request.url))
    response.cookies.delete('admin_session')
    return response
  }
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
}
