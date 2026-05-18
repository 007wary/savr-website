import { HeroMainCard, HeroSideCard } from './BlogCard'
import BlogCard from './BlogCard'
import AllStories from './AllStories'
import Newsletter from '../../components/Contact'
import Footer from '../../components/Footer'

async function getPosts(limit, offset) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/posts?limit=${limit}&offset=${offset}`,
    { cache: 'no-store' }
  )
  if (!res.ok) return { posts: [], total: 0 }
  return res.json()
}

export const metadata = {
  title: 'Blog | Savr',
  description: 'Money tips, app updates, and personal finance insights from the Savr team.',
}

export default async function BlogPage() {
  // Fetch top 7 for hero + more news, then 9 for all stories
  const { posts: topPosts } = await getPosts(7, 0)
  const { posts: storyPosts, total } = await getPosts(9, 7)

  const heroMain = topPosts[0]
  const heroSide = topPosts.slice(1, 4)
  const gridPosts = topPosts.slice(4, 7)

  return (
    <>
      <main style={{ minHeight: '100vh', background: 'var(--bg-primary)', paddingTop: '100px', paddingBottom: '0' }}>
        <div className="container" style={{ maxWidth: '1100px' }}>

          {topPosts.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '120px 0' }}>
              <p style={{ color: 'var(--text-muted)', fontSize: '17px' }}>No posts yet. Check back soon.</p>
            </div>
          ) : (
            <>
              {/* ── HERO SECTION ── */}
              {heroMain && (
                <section style={{ marginBottom: '64px' }}>
                  <div style={{ display: 'flex', gap: '48px', alignItems: 'flex-start' }}>
                    <HeroMainCard post={heroMain} />
                    {heroSide.length > 0 && (
                      <div style={{ flex: '0 0 340px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        {heroSide.map(post => (
                          <HeroSideCard key={post.id} post={post} />
                        ))}
                      </div>
                    )}
                  </div>
                </section>
              )}

              {/* ── MORE NEWS GRID ── */}
              {gridPosts.length > 0 && (
                <section style={{ marginBottom: '64px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
                    <h2 style={{ color: 'var(--text-primary)', fontSize: '22px', fontWeight: '800', whiteSpace: 'nowrap' }}>
                      More news
                    </h2>
                    <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px' }}>
                    {gridPosts.map(post => (
                      <BlogCard key={post.id} post={post} />
                    ))}
                  </div>
                </section>
              )}

              {/* ── ALL STORIES (client component with load more) ── */}
              <AllStories
                initialPosts={storyPosts}
                initialTotal={total - 7}
                initialOffset={7 + 9}
              />

            </>
          )}

        </div>
      </main>

      {/* Newsletter + Footer */}
      <Newsletter />
      <Footer />
    </>
  )
}