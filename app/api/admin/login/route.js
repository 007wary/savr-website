import { NextResponse } from 'next/server'

const attempts = new Map()
const MAX_ATTEMPTS = 5
const WINDOW_MS = 15 * 60 * 1000

export async function POST(request) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
  const now = Date.now()

  const record = attempts.get(ip) || { count: 0, resetAt: now + WINDOW_MS }
  if (now > record.resetAt) {
    record.count = 0
    record.resetAt = now + WINDOW_MS
  }

  if (record.count >= MAX_ATTEMPTS) {
    const waitMins = Math.ceil((record.resetAt - now) / 60000)
    return NextResponse.json(
      { error: `Too many attempts. Try again in ${waitMins} minute${waitMins !== 1 ? 's' : ''}.` },
      { status: 429 }
    )
  }

  const { password } = await request.json()

  if (password !== process.env.ADMIN_PASSWORD) {
    record.count++
    attempts.set(ip, record)
    const remaining = MAX_ATTEMPTS - record.count
    return NextResponse.json(
      { error: `Wrong password. ${remaining} attempt${remaining !== 1 ? 's' : ''} remaining.` },
      { status: 401 }
    )
  }

  attempts.delete(ip)

  const response = NextResponse.json({ ok: true })
  response.cookies.set('admin_session', process.env.ADMIN_PASSWORD, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7,
    path: '/',
  })
  return response
}