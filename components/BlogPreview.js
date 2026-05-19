import Link from 'next/link'
import { supabase } from '@/app/lib/supabase'

const categoryColors = {
  STORY: '#A78BFA',
  PRIVACY: '#34D399',
  TIPS: '#FBBF24',
  GENERAL: '#60A5FA',
  NEWS: '#F472B6',
  UPDATE: '#34D399',
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-IN', {
    month: 'short', day: 'numeric', year: 'numeric'
  })
}

export default async function BlogPreview() {
  const { data: posts } = await supabase
    .from('posts')
    .select('title, slug, excerpt, category, created_at')
    .eq('published', true)
    .order('created_at', { ascending: false })
    .limit(3)

  if (!posts || posts.length === 0) return null

  return (
    <section id="blog" className="section" style={{ borderTop: '1px solid var(--border)' }}>
      <div className="container">
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '48px', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <p style={{ fontSize: '13px', fontWeight: '600', color: 'var(--color-primary)', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '12px' }}>
              Blog
            </p>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: '800', letterSpacing: '-1px' }}>
              From the Savr team
            </h2>
          </div>
          <Link href="/blog" style={{
            color: 'var(--color-primary)', textDecoration: 'none', fontSize: '14px',
            fontWeight: '600', display: 'flex', alignItems: 'center', gap: '6px',
          }}>
            View all posts
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
            </svg>
          </Link>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '24px',
        }}>
          {posts.map((post) => {
            const category = (post.category || 'GENERAL').toUpperCase()
            const color = categoryColors[category] || '#94A3B8'
            return (
              <Link key={post.slug} href={`/blog/${post.slug}`} style={{ textDecoration: 'none' }}>
                <div className="card" style={{ padding: '28px', height: '100%', cursor: 'pointer' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                    <span style={{
                      fontSize: '11px', fontWeight: '700', letterSpacing: '1px',
                      color: color,
                      background: `${color}18`,
                      border: `1px solid ${color}33`,
                      borderRadius: '100px', padding: '3px 10px',
                    }}>
                      {category}
                    </span>
                    <span style={{ fontSize: '12px', color: 'var(--text-subtle)' }}>{formatDate(post.created_at)}</span>
                  </div>

                  <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '10px', lineHeight: '1.4', color: 'var(--text-primary)' }}>
                    {post.title}
                  </h3>
                  <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '24px' }}>
                    {post.excerpt}
                  </p>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '12px', color: 'var(--text-subtle)' }}>{post.author || 'Wary Dev'}</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                    </svg>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}