import { supabase } from '../lib/supabase'
import { HeroMainCard, HeroSideCard } from './BlogCard'
import BlogCard from './BlogCard'
import AllStories from './AllStories'
import Newsletter from '../../components/Contact'
import Footer from '../../components/Footer'

export const revalidate = 60

async function getAllPosts() {
  const { data, error, count } = await supabase
    .from('posts')
    .select('id, title, slug, excerpt, cover_image, created_at, category, author, author_image', { count: 'exact' })
    .eq('published', true)
    .order('created_at', { ascending: false })
    .range(0, 99)

  if (error) return { posts: [], total: 0 }
  return { posts: data, total: count }
}

export const metadata = {
  title: 'Blog | Savr',
  description: 'Money tips, app updates, and personal finance insights from the Savr team.',
}

export default async function BlogPage() {
  const { posts, total } = await getAllPosts()

  const heroMain = posts[0]
  const heroSide = posts.slice(1, 4)
  const gridPosts = posts.slice(4, 7)
  const storyPosts = posts.slice(7, 16)
  const remainingTotal = total - 7

  return (
    <>
      <main style={{ minHeight: '100vh', background: 'var(--bg-primary)', paddingTop: '100px', paddingBottom: '0' }}>
        <div className="container" style={{ maxWidth: '1100px' }}>

          {posts.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '120px 0' }}>
              <p style={{ color: 'var(--text-muted)', fontSize: '17px' }}>No posts yet. Check back soon.</p>
            </div>
          ) : (
            <>
              {/* ── HERO SECTION ── */}
              {heroMain && (
                <section style={{ marginBottom: '64px' }}>
                  <div className="blog-hero">
                    <HeroMainCard post={heroMain} />
                    {heroSide.length > 0 && (
                      <div className="blog-hero-side">
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
                  <div className="blog-grid-3">
                    {gridPosts.map(post => (
                      <BlogCard key={post.id} post={post} />
                    ))}
                  </div>
                </section>
              )}

              {/* ── ALL STORIES ── */}
              <AllStories
                initialPosts={storyPosts}
                initialTotal={remainingTotal}
                initialOffset={16}
              />
            </>
          )}

        </div>

        <style>{`
          .blog-hero {
            display: flex;
            gap: 48px;
            align-items: flex-start;
          }
          .blog-hero-side {
            flex: 0 0 340px;
            display: flex;
            flex-direction: column;
            gap: 20px;
          }
          .blog-grid-3 {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 32px;
          }
          .blog-stories-3 {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 0 48px;
          }
          @media (max-width: 900px) {
            .blog-hero {
              flex-direction: column;
              gap: 32px;
            }
            .blog-hero-side {
              flex: unset;
              width: 100%;
            }
            .blog-grid-3 {
              grid-template-columns: repeat(2, 1fr);
              gap: 24px;
            }
            .blog-stories-3 {
              grid-template-columns: repeat(2, 1fr);
              gap: 0 32px;
            }
          }
          @media (max-width: 580px) {
            .blog-grid-3 {
              grid-template-columns: 1fr;
              gap: 24px;
            }
            .blog-stories-3 {
              grid-template-columns: 1fr;
              gap: 0;
            }
          }
        `}</style>

      </main>

      <Newsletter />
      <Footer />
    </>
  )
}