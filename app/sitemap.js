import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

const BASE_URL = 'https://savrappindia.vercel.app'

const staticPages = [
  { path: '', changeFrequency: 'monthly', priority: 1, lastModified: '2026-05-01' },
  { path: '/blog', changeFrequency: 'weekly', priority: 0.8, lastModified: '2026-05-20' },
  { path: '/about', changeFrequency: 'yearly', priority: 0.5, lastModified: '2026-05-01' },
  { path: '/contact', changeFrequency: 'yearly', priority: 0.5, lastModified: '2026-05-01' },
  { path: '/privacy', changeFrequency: 'yearly', priority: 0.3, lastModified: '2026-05-01' },
  { path: '/terms', changeFrequency: 'yearly', priority: 0.3, lastModified: '2026-05-01' },
  { path: '/delete', changeFrequency: 'yearly', priority: 0.3, lastModified: '2026-05-01' },
]

export default async function sitemap() {
  // Fetch all published blog posts from Supabase
  const { data: posts, error } = await supabase
    .from('posts')
    .select('slug, updated_at')
    .eq('published', true)
    .order('updated_at', { ascending: false })

  const blogEntries = error || !posts ? [] : posts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.updated_at),
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  const staticEntries = staticPages.map((page) => ({
    url: `${BASE_URL}${page.path}`,
    lastModified: new Date(page.lastModified),
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }))

  return [...staticEntries, ...blogEntries]
}