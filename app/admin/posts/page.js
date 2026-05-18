'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function AdminPosts() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('admin_token')
    if (!token) { router.push('/admin'); return }
    fetchPosts(token)
  }, [])

  async function fetchPosts(token) {
    const res = await fetch('/api/admin', {
      headers: { 'x-admin-token': token }
    })
    if (res.status === 401) { router.push('/admin'); return }
    const data = await res.json()
    setPosts(data)
    setLoading(false)
  }

  async function deletePost(id) {
    if (!confirm('Delete this post?')) return
    const token = localStorage.getItem('admin_token')
    await fetch(`/api/admin?id=${id}`, {
      method: 'DELETE',
      headers: { 'x-admin-token': token }
    })
    setPosts(posts.filter(p => p.id !== id))
  }

  function logout() {
    localStorage.removeItem('admin_token')
    router.push('/admin')
  }

  if (loading) return (
    <div className="min-h-screen bg-[#0A0A0F] flex items-center justify-center" style={{ paddingTop: '100px' }}>
      <p className="text-gray-400">Loading...</p>
    </div>
  )

  return (
    <div className="min-h-screen bg-[#0A0A0F] px-6 py-12" style={{ paddingTop: '100px' }}>
      <div className="max-w-4xl mx-auto">

        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Posts</h1>
            <p className="text-gray-400 mt-1">{posts.length} total</p>
          </div>
          <div className="flex gap-3">
            <Link
              href="/admin/posts/new"
              className="bg-[#6C63FF] hover:bg-[#5a52d5] text-white font-semibold px-5 py-2.5 rounded-xl transition-colors"
            >
              + New Post
            </Link>
            <button
              onClick={logout}
              className="bg-white/5 hover:bg-white/10 text-gray-400 px-5 py-2.5 rounded-xl transition-colors"
            >
              Logout
            </button>
          </div>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-20 bg-white/5 border border-white/10 rounded-2xl">
            <p className="text-gray-400 text-lg mb-4">No posts yet.</p>
            <Link href="/admin/posts/new" className="text-[#6C63FF] hover:underline">
              Write your first post →
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {posts.map(post => (
              <div key={post.id} className="bg-white/5 border border-white/10 rounded-2xl px-6 py-4 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h2 className="text-white font-medium">{post.title}</h2>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${post.published ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                      {post.published ? 'Published' : 'Draft'}
                    </span>
                  </div>
                  <p className="text-gray-500 text-sm">
                    {new Date(post.created_at).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' })}
                    {' · '}
                    /{post.slug}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Link
                    href={`/admin/posts/${post.id}/edit`}
                    className="bg-white/5 hover:bg-white/10 text-gray-300 px-4 py-2 rounded-lg text-sm transition-colors"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => deletePost(post.id)}
                    className="bg-red-500/10 hover:bg-red-500/20 text-red-400 px-4 py-2 rounded-lg text-sm transition-colors"
                  >
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