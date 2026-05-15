import Link from 'next/link'

export default function BlogPreview() {
  const posts = [
    {
      category: 'STORY',
      date: 'Apr 18, 2026',
      title: 'Why I Built Savr — A Developer\'s Story',
      description: 'How a simple frustration with existing expense trackers turned into a full Android app on the Play Store.',
      slug: 'why-i-built-savr',
      readTime: '5 min read',
    },
    {
      category: 'PRIVACY',
      date: 'Apr 18, 2026',
      title: 'How Savr Protects Your Financial Data',
      description: 'A deep dive into our privacy-first architecture — why your expenses never touch our servers.',
      slug: 'how-savr-protects-your-data',
      readTime: '4 min read',
    },
    {
      category: 'TIPS',
      date: 'Apr 18, 2026',
      title: '5 Simple Tips to Save More Money Every Month',
      description: 'Practical, India-specific money saving tips that actually work — no complicated finance jargon.',
      slug: '5-tips-to-save-money',
      readTime: '3 min read',
    },
  ]

  const categoryColors = {
    STORY: '#A78BFA',
    PRIVACY: '#34D399',
    TIPS: '#FBBF24',
  }

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
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} style={{ textDecoration: 'none' }}>
              <div className="card" style={{ padding: '28px', height: '100%', cursor: 'pointer' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                  <span style={{
                    fontSize: '11px', fontWeight: '700', letterSpacing: '1px',
                    color: categoryColors[post.category],
                    background: `${categoryColors[post.category]}18`,
                    border: `1px solid ${categoryColors[post.category]}33`,
                    borderRadius: '100px', padding: '3px 10px',
                  }}>
                    {post.category}
                  </span>
                  <span style={{ fontSize: '12px', color: 'var(--text-subtle)' }}>{post.date}</span>
                </div>

                <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '10px', lineHeight: '1.4', color: 'var(--text-primary)' }}>
                  {post.title}
                </h3>
                <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '24px' }}>
                  {post.description}
                </p>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '12px', color: 'var(--text-subtle)' }}>{post.readTime}</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}