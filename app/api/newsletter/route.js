import { supabaseAdmin } from '@/app/lib/supabase-admin'
import { NextResponse } from 'next/server'

export async function POST(request) {
  const body = await request.json()
  const { email } = body

  if (!email || !email.includes('@')) {
    return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
  }

  const { error } = await supabaseAdmin
    .from('subscribers')
    .insert([{ email }])

  if (error) {
    if (error.code === '23505') {
      return NextResponse.json({ error: 'Already subscribed' }, { status: 409 })
    }
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}