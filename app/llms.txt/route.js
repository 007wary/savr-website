import { supabase } from '../lib/supabase'

export const revalidate = 3600 // refresh every 1 hour

export async function GET() {
  // Fetch all published posts
  const { data: posts, error } = await supabase
    .from('posts')
    .select('title, slug, category')
    .eq('published', true)
    .order('created_at', { ascending: false })

  const baseUrl = 'https://savrappindia.vercel.app'

  // Build blog posts section
  const blogLines = (!error && posts?.length > 0)
    ? posts.map(p => `- ${baseUrl}/blog/${p.slug}  ${p.title}`).join('\n')
    : '- No posts available'

  const content = `# Savr
> Offline-first expense tracker for India. Free on Android. No loan upsells, no data harvesting.

## App
- Platform: Android (Google Play)
- Package: com.saver.savr
- Category: Personal Finance
- Features: offline expense tracking, automatic Google Drive backup, privacy-first, INR-first design, no SMS data collection, no loan upsells

## Pages
- ${baseUrl}          Homepage — Savr expense tracker for India
- ${baseUrl}/blog     Blog — personal finance tips and app updates
- ${baseUrl}/faq      FAQ — common questions about Savr
- ${baseUrl}/privacy  Privacy Policy

## Blog Posts
${blogLines}

## Links
- App: https://play.google.com/store/apps/details?id=com.saver.savr
- Website: ${baseUrl}
- Developer: Wary Dev
`

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}