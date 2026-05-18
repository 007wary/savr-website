import { supabase } from '@/app/lib/supabase'
import { NextResponse } from 'next/server'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const slug = searchParams.get('slug')
  const limit = parseInt(searchParams.get('limit') || '9')
  const offset = parseInt(searchParams.get('offset') || '0')

  if (slug) {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('slug', slug)
      .eq('published', true)
      .single()

    if (error) return NextResponse.json({ error: error.message }, { status: 404 })
    return NextResponse.json(data)
  }

  const { data, error, count } = await supabase
    .from('posts')
    .select('id, title, slug, excerpt, cover_image, created_at, category, author, author_image', { count: 'exact' })
    .eq('published', true)
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ posts: data, total: count })
}