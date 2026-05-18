'use client'

import { useState } from 'react'
import { StoryCard } from './BlogCard'

const BATCH = 9

export default function AllStories({ initialPosts, initialTotal, initialOffset }) {
  const [posts, setPosts] = useState(initialPosts)
  const [offset, setOffset] = useState(initialOffset)
  const [total, setTotal] = useState(initialTotal)
  const [loading, setLoading] = useState(false)

  const hasMore = posts.length < total

  async function loadMore() {
    setLoading(true)
    try {
      const res = await fetch(`/api/posts?limit=${BATCH}&offset=${offset}`)
      const data = await res.json()
      setPosts(prev => [...prev, ...data.posts])
      setOffset(prev => prev + BATCH)
      setTotal(data.total)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  if (posts.length === 0) return null

  return (
    <section style={{ marginBottom: '80px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
        <h2 style={{ color: 'var(--text-primary)', fontSize: '22px', fontWeight: '800', whiteSpace: 'nowrap' }}>
          All stories
        </h2>
        <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
      </div>

      {/* 3-column grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0 48px' }}>
        {posts.map(post => (
          <StoryCard key={post.id} post={post} />
        ))}
      </div>

      {/* Load more button */}
      {hasMore && (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '48px' }}>
          <button
            onClick={loadMore}
            disabled={loading}
            style={{
              background: 'transparent',
              border: '1px solid var(--border)',
              borderRadius: '100px',
              color: 'var(--text-primary)',
              fontSize: '15px',
              fontWeight: '600',
              padding: '14px 40px',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s ease',
              opacity: loading ? 0.6 : 1,
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'var(--accent)'
              e.currentTarget.style.color = 'var(--accent)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'var(--border)'
              e.currentTarget.style.color = 'var(--text-primary)'
            }}
          >
            {loading ? 'Loading...' : 'Load more stories'}
          </button>
        </div>
      )}
    </section>
  )
}