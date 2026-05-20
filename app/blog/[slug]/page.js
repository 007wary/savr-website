import { notFound } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '../../lib/supabase'
import ShareButtons from './ShareButtons'
import BlogCard from '../BlogCard'

export const revalidate = 60

export async function generateStaticParams() {
  const { data } = await supabase
    .from('posts')
    .select('slug')
    .eq('published', true)

  return (data || []).map(post => ({ slug: post.slug }))
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-IN', {
    year: 'numeric', month: 'long', day: 'numeric'
  })
}

function Avatar({ src, name }) {
  if (src) {
    return <img src={src} alt={name} style={{ width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover' }} />
  }
  return (
    <div style={{
      width: '44px', height: '44px', borderRadius: '50%',
      background: 'linear-gradient(135deg, #6C63FF, #A78BFA)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: '16px', fontWeight: '700', color: '#fff', flexShrink: 0,
    }}>
      {name ? name[0].toUpperCase() : 'W'}
    </div>
  )
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const { data: post } = await supabase
    .from('posts')
    .select('title, excerpt, cover_image, author')
    .eq('slug', slug)
    .eq('published', true)
    .single()

  if (!post) return {}

  return {
    title: `${post.title} | Savr Blog`,
    description: post.excerpt || 'Read the latest from the Savr team.',
    openGraph: {
      title: post.title,
      description: post.excerpt || '',
      url: `https://savrappindia.vercel.app/blog/${slug}`,
      siteName: 'Savr',
      images: post.cover_image ? [{ url: post.cover_image, width: 800, height: 420 }] : [],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt || '',
      images: post.cover_image ? [post.cover_image] : [],
    },
    alternates: {
      canonical: `https://savrappindia.vercel.app/blog/${slug}`,
    },
  }
}

async function getRelatedPosts(currentSlug, category) {
  let related = []

  if (category) {
    const { data: sameCat } = await supabase
      .from('posts')
      .select('id, title, slug, excerpt, cover_image, created_at, category, author, author_image')
      .eq('published', true)
      .eq('category', category)
      .neq('slug', currentSlug)
      .limit(3)

    related = sameCat || []
  }

  if (related.length < 3) {
    const { data: latest } = await supabase
      .from('posts')
      .select('id, title, slug, excerpt, cover_image, created_at, category, author, author_image')
      .eq('published', true)
      .neq('slug', currentSlug)
      .not('id', 'in', `(${related.map(p => p.id).join(',') || 0})`)
      .limit(3 - related.length)

    related = [...related, ...(latest || [])]
  }

  return related
}

export default async function PostPage({ params }) {
  const { slug } = await params

  const { data: post, error } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .single()

  if (error || !post) notFound()

  const relatedPosts = await getRelatedPosts(slug, post.category)

  return (
    <main style={{ minHeight: '100vh', background: 'var(--bg-primary)', paddingTop: '100px', paddingBottom: '80px' }}>
      <div className="container" style={{ maxWidth: '780px' }}>

        <Link href="/blog" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)', fontSize: '14px', textDecoration: 'none', marginBottom: '40px' }}>
          ← Back to Blog
        </Link>

        {post.category && (
          <p style={{ color: 'var(--accent)', fontSize: '13px', fontWeight: '700', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '16px' }}>
            {post.category}
          </p>
        )}

        <h1 style={{ fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: '700', color: 'var(--text-primary)', lineHeight: '1.3', marginBottom: '24px' }}>
          {post.title}
        </h1>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px', paddingBottom: '24px', borderBottom: '1px solid var(--border)' }}>
          <Avatar src={post.author_image} name={post.author} />
          <div>
            <p style={{ color: 'var(--text-primary)', fontSize: '15px', fontWeight: '600', marginBottom: '2px' }}>
              {post.author || 'Wary Dev'}
            </p>
            <p style={{ color: 'var(--text-muted)', fontSize: '13px' }}>
              {formatDate(post.created_at)}
            </p>
          </div>
        </div>

        <ShareButtons title={post.title} slug={slug} />

        {post.cover_image && (
          <div style={{ width: '100%', borderRadius: '16px', overflow: 'hidden', marginBottom: '48px' }}>
  <img src={post.cover_image} alt={post.title} style={{ width: '100%', height: 'auto', display: 'block' }} />
</div>
        )}

        {post.excerpt && (
          <p style={{ color: 'var(--text-primary)', fontSize: '20px', lineHeight: '1.7', marginBottom: '40px', fontWeight: '400', opacity: 0.85 }}>
            {post.excerpt}
          </p>
        )}

        <style>{`
          .post-content p { margin-bottom: 24px; }
          .post-content h2 { font-size: 28px; font-weight: 800; color: var(--text-primary); margin: 48px 0 16px; line-height: 1.3; }
          .post-content h3 { font-size: 22px; font-weight: 700; color: var(--text-primary); margin: 36px 0 12px; line-height: 1.3; }
          .post-content ul, .post-content ol { margin: 0 0 24px 24px; }
          .post-content li { margin-bottom: 10px; }
          .post-content strong { color: var(--text-primary); font-weight: 700; }
          .post-content a { color: #6C63FF; text-decoration: underline; }
          .post-content a:hover { color: #A78BFA; }
          .post-content figure { margin: 0 0 40px 0; border-radius: 12px; overflow: hidden; }
          .post-content blockquote { border-left: 3px solid #6C63FF; padding-left: 20px; margin: 32px 0; color: var(--text-muted); font-style: italic; }
          .post-content code { background: rgba(255,255,255,0.08); padding: 2px 8px; border-radius: 6px; font-size: 14px; font-family: monospace; }
          .post-content pre { background: rgba(255,255,255,0.05); padding: 20px; border-radius: 12px; overflow-x: auto; margin-bottom: 24px; }
        `}</style>
        <div
          className="post-content"
          style={{ color: 'var(--text-muted)', fontSize: '17px', lineHeight: '1.9' }}
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

      </div>

      {/* Related Articles */}
      {relatedPosts.length > 0 && (
        <div style={{ borderTop: '1px solid var(--border)', marginTop: '80px', paddingTop: '64px', paddingBottom: '80px', background: 'var(--bg-elevated)' }}>
          <div className="container" style={{ maxWidth: '780px' }}>
            <h2 style={{ fontSize: '22px', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '32px' }}>
              Related Articles
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '24px' }}>
              {relatedPosts.map(p => (
                <BlogCard key={p.id} post={p} />
              ))}
            </div>
          </div>
        </div>
      )}

    </main>
  )
}