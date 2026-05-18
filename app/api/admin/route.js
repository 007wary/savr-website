import { supabaseAdmin } from '../../lib/supabase-admin'
import { NextResponse } from 'next/server'

function checkAuth(request) {
  const token = request.headers.get('x-admin-token')
  return token === process.env.ADMIN_PASSWORD
}

// GET — fetch all posts (published + drafts)
export async function GET(request) {
  if (!checkAuth(request)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { data, error } = await supabaseAdmin
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

// POST — create new post
export async function POST(request) {
  if (!checkAuth(request)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await request.json()
  const { title, slug, excerpt, content, cover_image, published } = body

  const { data, error } = await supabaseAdmin
    .from('posts')
    .insert([{ title, slug, excerpt, content, cover_image, published }])
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

// PATCH — update existing post
export async function PATCH(request) {
  if (!checkAuth(request)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await request.json()
  const { id, title, slug, excerpt, content, cover_image, published } = body

  const { data, error } = await supabaseAdmin
    .from('posts')
    .update({ title, slug, excerpt, content, cover_image, published })
    .eq('id', id)
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

// DELETE — delete a post
export async function DELETE(request) {
  if (!checkAuth(request)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')

  const { error } = await supabaseAdmin
    .from('posts')
    .delete()
    .eq('id', id)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true })
}