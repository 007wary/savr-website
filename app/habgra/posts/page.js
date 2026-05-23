'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function AdminPosts() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    fetchPosts()
  }, [])

  async function fetchPosts() {
    const res = await fetch('/api/admin', {
      credentials: 'same-origin'
    })
    if (res.status === 401) { router.push('/habgra'); return }
    const data = await res.json()
    setPosts(data)
    setLoading(false)
  }

  async function deletePost(id) {
    if (!confirm('Delete this post?')) return
    await fetch(`/api/admin?id=${id}`, {
      method: 'DELETE',
      credentials: 'same-origin'
    })
    setPosts(posts.filter(p => p.id !== id))
  }

  if (loading) return (
    <div style={{ minHeight: '100vh', background: '#0A0A0F', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '100px' }}>
      <p style={{ color: '#6b7280' }}>Loading...</p>
    </div>
  )

  return (
    <div style={{ minHeight: '100vh', background: '#0A0A0F', paddingTop: '80px', paddingBottom: '80px' }}>
      <div style={{ maxWidth: '860px', margin: '0 auto', padding: '0 16px' }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
          <div>
            <h1 style={{ fontSize: '28px', fontWeight: '800', color: '#fff', marginBottom: '4px' }}>Posts</h1>
            <p style={{ color: '#6b7280', fontSize: '14px' }}>{posts.length} total</p>
          </div>
          <Link href="/habgra/posts/new" style={{
            background: '#6C63FF', color: '#fff', fontWeight: '600',
            padding: '10px 20px', borderRadius: '12px', textDecoration: 'none',
            fontSize: '14px', whiteSpace: 'nowrap',
          }}>
            + New Post
          </Link>
        </div>

        {/* Posts list */}
        {posts.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 0', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px' }}>
            <p style={{ color: '#6b7280', fontSize: '16px', marginBottom: '16px' }}>No posts yet.</p>
            <Link href="/habgra/posts/new" style={{ color: '#6C63FF', textDecoration: 'none', fontSize: '14px' }}>
              Write your first post →
            </Link>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {posts.map(post => (
              <div key={post.id} style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '16px',
                padding: '16px',
              }}>
                <div style={{ marginBottom: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8, marginBottom: '6px' }}>
                    <h2 style={{ color: '#fff', fontWeight: '600', fontSize: '15px', lineHeight: 1.4 }}>{post.title}</h2>
                    <span style={{
                      fontSize: '11px', padding: '2px 10px', borderRadius: '100px', fontWeight: '600', flexShrink: 0,
                      background: post.published ? 'rgba(74,222,128,0.1)' : 'rgba(234,179,8,0.1)',
                      color: post.published ? '#4ade80' : '#eab308',
                    }}>
                      {post.published ? 'Published' : 'Draft'}
                    </span>
                  </div>
                  <p style={{ color: '#6b7280', fontSize: '12px' }}>
                    {new Date(post.created_at).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' })}
                    {' · /'}{post.slug}
                  </p>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <Link href={`/habgra/posts/${post.id}/edit`} style={{
                    background: 'rgba(255,255,255,0.05)', color: '#d1d5db',
                    padding: '8px 20px', borderRadius: '10px', textDecoration: 'none',
                    fontSize: '13px', fontWeight: '500', flex: 1, textAlign: 'center',
                  }}>
                    Edit
                  </Link>
                  <button onClick={() => deletePost(post.id)} style={{
                    background: 'rgba(239,68,68,0.1)', color: '#f87171',
                    border: 'none', padding: '8px 20px', borderRadius: '10px',
                    cursor: 'pointer', fontSize: '13px', fontWeight: '500', flex: 1,
                  }}>
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  )
}