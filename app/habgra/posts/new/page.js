'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

export default function NewPost() {
  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [excerpt, setExcerpt] = useState('')
  const [coverImage, setCoverImage] = useState('')
  const [category, setCategory] = useState('')
  const [author, setAuthor] = useState('Wary Dev')
  const [content, setContent] = useState('')
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const router = useRouter()

  useEffect(() => {
    fetch('/api/admin', { credentials: 'same-origin' })
      .then(res => { if (res.status === 401) router.push('/habgra') })
  }, [])

  useEffect(() => {
    if (title) {
      const timeout = setTimeout(() => setSlug(slugify(title)), 500)
      return () => clearTimeout(timeout)
    }
  }, [title])

  async function handleSave(publish) {
    if (!title || !content) { setMessage('Title and content are required.'); return }
    setSaving(true)
    setMessage('')
    const res = await fetch('/api/admin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'same-origin',
      body: JSON.stringify({
        title, slug: slug || slugify(title), excerpt,
        content, cover_image: coverImage, category, author, published: publish
      })
    })

    if (res.ok) {
      router.push('/habgra/posts')
    } else {
      const err = await res.json()
      setMessage(err.error || 'Something went wrong.')
    }
    setSaving(false)
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0A0A0F', paddingTop: '100px', paddingBottom: '80px' }}>
      <div style={{ maxWidth: '860px', margin: '0 auto', padding: '0 32px' }}>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '40px' }}>
          <button onClick={() => router.push('/habgra/posts')} style={{ color: '#9ca3af', background: 'none', border: 'none', cursor: 'pointer', fontSize: '14px' }}>
            ← Back
          </button>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button onClick={() => handleSave(false)} disabled={saving} style={{
              background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
              color: '#9ca3af', padding: '10px 20px', borderRadius: '12px',
              cursor: 'pointer', fontSize: '14px', fontWeight: '500',
            }}>
              Save Draft
            </button>
            <button onClick={() => handleSave(true)} disabled={saving} style={{
              background: '#6C63FF', color: '#fff', border: 'none',
              padding: '10px 20px', borderRadius: '12px',
              cursor: 'pointer', fontSize: '14px', fontWeight: '600',
            }}>
              {saving ? 'Publishing...' : 'Publish'}
            </button>
          </div>
        </div>

        {message && <p style={{ color: '#f87171', fontSize: '14px', marginBottom: '16px' }}>{message}</p>}

        <input
          type="text"
          placeholder="Post title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          style={{
            width: '100%', background: 'transparent', border: 'none', outline: 'none',
            color: '#fff', fontSize: '36px', fontWeight: '800',
            marginBottom: '24px', lineHeight: '1.2',
          }}
        />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
          <div>
            <label style={{ color: '#6b7280', fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '6px' }}>Slug</label>
            <input type="text" value={slug} onChange={e => setSlug(e.target.value)} placeholder="auto-generated"
              style={{ width: '100%', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', padding: '10px 14px', color: '#9ca3af', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }} />
          </div>
          <div>
            <label style={{ color: '#6b7280', fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '6px' }}>Category</label>
            <input type="text" value={category} onChange={e => setCategory(e.target.value)} placeholder="e.g. Tips"
              style={{ width: '100%', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', padding: '10px 14px', color: '#d1d5db', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }} />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
          <div>
            <label style={{ color: '#6b7280', fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '6px' }}>Author</label>
            <input type="text" value={author} onChange={e => setAuthor(e.target.value)} placeholder="Wary Dev"
              style={{ width: '100%', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', padding: '10px 14px', color: '#d1d5db', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }} />
          </div>
          <div>
            <label style={{ color: '#6b7280', fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '6px' }}>Cover Image URL</label>
            <input type="text" value={coverImage} onChange={e => setCoverImage(e.target.value)} placeholder="https://..."
              style={{ width: '100%', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', padding: '10px 14px', color: '#d1d5db', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }} />
          </div>
        </div>

        <div style={{ marginBottom: '24px' }}>
          <label style={{ color: '#6b7280', fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '6px' }}>Excerpt</label>
          <input type="text" value={excerpt} onChange={e => setExcerpt(e.target.value)} placeholder="Short description shown in blog listings..."
            style={{ width: '100%', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', padding: '10px 14px', color: '#d1d5db', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }} />
        </div>

        <div>
          <label style={{ color: '#6b7280', fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '6px' }}>Content (HTML)</label>
          <textarea
            value={content}
            onChange={e => setContent(e.target.value)}
            placeholder="Paste your HTML content here..."
            style={{
              width: '100%', minHeight: '500px', background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px',
              padding: '20px 24px', color: '#d1d5db', fontSize: '14px',
              lineHeight: '1.8', fontFamily: 'monospace', resize: 'vertical',
              outline: 'none', boxSizing: 'border-box',
            }}
          />
        </div>

      </div>
    </div>
  )
}