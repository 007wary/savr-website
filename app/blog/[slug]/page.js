import { notFound } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '../../lib/supabase'

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

export default async function PostPage({ params }) {
  const { slug } = await params

  const { data: post, error } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .single()

  if (error || !post) notFound()

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

        <h1 style={{ fontSize: '40px', fontWeight: '900', color: 'var(--text-primary)', lineHeight: '1.2', marginBottom: '24px' }}>
          {post.title}
        </h1>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '40px', paddingBottom: '32px', borderBottom: '1px solid var(--border)' }}>
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

        {post.cover_image && (
          <div style={{ width: '100%', height: '400px', borderRadius: '16px', overflow: 'hidden', marginBottom: '48px' }}>
            <img src={post.cover_image} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        )}

        {post.excerpt && (
          <p style={{ color: 'var(--text-primary)', fontSize: '20px', lineHeight: '1.7', marginBottom: '40px', fontWeight: '400', opacity: 0.85 }}>
            {post.excerpt}
          </p>
        )}

        <div
          style={{ color: 'var(--text-muted)', fontSize: '17px', lineHeight: '1.9' }}
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

      </div>
    </main>
  )
}