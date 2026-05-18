'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import LinkExt from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
import Placeholder from '@tiptap/extension-placeholder'
import { use } from 'react'

export default function EditPost({ params }) {
  const { id } = use(params)
  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [excerpt, setExcerpt] = useState('')
  const [coverImage, setCoverImage] = useState('')
  const [category, setCategory] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState(false)
  const [saving, setSaving] = useState(false)
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState('')
  const router = useRouter()

  const editor = useEditor({
    extensions: [
      StarterKit,
      LinkExt.configure({ openOnClick: false }),
      Image,
      Placeholder.configure({ placeholder: 'Write your post here...' }),
    ],
    editorProps: {
      attributes: {
        style: 'min-height: 400px; outline: none; color: #d1d5db; font-size: 16px; line-height: 1.8;',
      },
    },
  })

  useEffect(() => {
    const token = localStorage.getItem('admin_token')
    if (!token) { router.push('/admin'); return }
    fetchPost(token)
  }, [])

  async function fetchPost(token) {
    const res = await fetch('/api/admin', {
      headers: { 'x-admin-token': token }
    })
    if (res.status === 401) { router.push('/admin'); return }
    const posts = await res.json()
    const post = posts.find(p => p.id === id)
    if (!post) { router.push('/admin/posts'); return }

    setTitle(post.title)
    setSlug(post.slug)
    setExcerpt(post.excerpt || '')
    setCoverImage(post.cover_image || '')
    setCategory(post.category || '')
    setAuthor(post.author || '')
    setPublished(post.published)
    setLoading(false)
    return post
  }

  useEffect(() => {
    if (editor) {
      const token = localStorage.getItem('admin_token')
      fetchPost(token).then(post => {
        if (post) editor.commands.setContent(post.content || '')
      })
    }
  }, [editor])

  async function handleSave(publish) {
    if (!title) { setMessage('Title is required.'); return }
    setSaving(true)
    setMessage('')
    const token = localStorage.getItem('admin_token')

    const res = await fetch('/api/admin', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', 'x-admin-token': token },
      body: JSON.stringify({
        id, title, slug, excerpt,
        content: editor.getHTML(),
        cover_image: coverImage,
        category, author,
        published: publish
      })
    })

    if (res.ok) {
      router.push('/admin/posts')
    } else {
      const err = await res.json()
      setMessage(err.error || 'Something went wrong.')
    }
    setSaving(false)
  }

  if (loading) return (
    <div style={{ minHeight: '100vh', background: '#0A0A0F', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '100px' }}>
      <p style={{ color: '#6b7280' }}>Loading post...</p>
    </div>
  )

  return (
    <div style={{ minHeight: '100vh', background: '#0A0A0F', paddingTop: '100px', paddingBottom: '80px' }}>
      <div style={{ maxWidth: '860px', margin: '0 auto', padding: '0 32px' }}>

        {/* Top bar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '40px' }}>
          <button onClick={() => router.push('/admin/posts')} style={{ color: '#9ca3af', background: 'none', border: 'none', cursor: 'pointer', fontSize: '14px' }}>
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
            <button onClick={() => handleSave(published)} disabled={saving} style={{
              background: '#6C63FF', color: '#fff', border: 'none',
              padding: '10px 20px', borderRadius: '12px',
              cursor: 'pointer', fontSize: '14px', fontWeight: '600',
            }}>
              {saving ? 'Saving...' : 'Save'}
            </button>
            {!published && (
              <button onClick={() => handleSave(true)} disabled={saving} style={{
                background: '#16a34a', color: '#fff', border: 'none',
                padding: '10px 20px', borderRadius: '12px',
                cursor: 'pointer', fontSize: '14px', fontWeight: '600',
              }}>
                Publish
              </button>
            )}
          </div>
        </div>

        {message && (
          <p style={{ color: '#f87171', fontSize: '14px', marginBottom: '16px' }}>{message}</p>
        )}

        {/* Title */}
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

        {/* Meta fields */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
          <div>
            <label style={{ color: '#6b7280', fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '6px' }}>Slug</label>
            <input
              type="text"
              placeholder="post-slug"
              value={slug}
              onChange={e => setSlug(e.target.value)}
              style={{
                width: '100%', background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px',
                padding: '10px 14px', color: '#9ca3af', fontSize: '14px', outline: 'none',
                boxSizing: 'border-box',
              }}
            />
          </div>
          <div>
            <label style={{ color: '#6b7280', fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '6px' }}>Category</label>
            <input
              type="text"
              placeholder="e.g. Finance Tips"
              value={category}
              onChange={e => setCategory(e.target.value)}
              style={{
                width: '100%', background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px',
                padding: '10px 14px', color: '#d1d5db', fontSize: '14px', outline: 'none',
                boxSizing: 'border-box',
              }}
            />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
          <div>
            <label style={{ color: '#6b7280', fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '6px' }}>Author</label>
            <input
              type="text"
              placeholder="Wary Dev"
              value={author}
              onChange={e => setAuthor(e.target.value)}
              style={{
                width: '100%', background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px',
                padding: '10px 14px', color: '#d1d5db', fontSize: '14px', outline: 'none',
                boxSizing: 'border-box',
              }}
            />
          </div>
          <div>
            <label style={{ color: '#6b7280', fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '6px' }}>Cover Image URL</label>
            <input
              type="text"
              placeholder="https://..."
              value={coverImage}
              onChange={e => setCoverImage(e.target.value)}
              style={{
                width: '100%', background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px',
                padding: '10px 14px', color: '#d1d5db', fontSize: '14px', outline: 'none',
                boxSizing: 'border-box',
              }}
            />
          </div>
        </div>

        <div style={{ marginBottom: '24px' }}>
          <label style={{ color: '#6b7280', fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '6px' }}>Excerpt</label>
          <input
            type="text"
            placeholder="Short description shown in blog listings..."
            value={excerpt}
            onChange={e => setExcerpt(e.target.value)}
            style={{
              width: '100%', background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px',
              padding: '10px 14px', color: '#d1d5db', fontSize: '14px', outline: 'none',
              boxSizing: 'border-box',
            }}
          />
        </div>

        {/* Toolbar */}
        <div style={{
          display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '4px',
          background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '12px 12px 0 0', padding: '12px 16px',
        }}>
          {[
            { label: 'B', action: () => editor?.chain().focus().toggleBold().run(), active: editor?.isActive('bold') },
            { label: 'I', action: () => editor?.chain().focus().toggleItalic().run(), active: editor?.isActive('italic') },
            { label: 'H2', action: () => editor?.chain().focus().toggleHeading({ level: 2 }).run(), active: editor?.isActive('heading', { level: 2 }) },
            { label: 'H3', action: () => editor?.chain().focus().toggleHeading({ level: 3 }).run(), active: editor?.isActive('heading', { level: 3 }) },
            { label: '• List', action: () => editor?.chain().focus().toggleBulletList().run(), active: editor?.isActive('bulletList') },
            { label: '1. List', action: () => editor?.chain().focus().toggleOrderedList().run(), active: editor?.isActive('orderedList') },
            { label: '❝', action: () => editor?.chain().focus().toggleBlockquote().run(), active: editor?.isActive('blockquote') },
            { label: 'Code', action: () => editor?.chain().focus().toggleCodeBlock().run(), active: editor?.isActive('codeBlock') },
          ].map(btn => (
            <button
              key={btn.label}
              onClick={btn.action}
              style={{
                padding: '6px 12px', borderRadius: '8px', fontSize: '13px', fontWeight: '600',
                cursor: 'pointer', border: 'none', transition: 'all 0.15s ease',
                background: btn.active ? '#6C63FF' : 'rgba(255,255,255,0.05)',
                color: btn.active ? '#fff' : '#9ca3af',
              }}
            >
              {btn.label}
            </button>
          ))}
        </div>

        {/* Editor */}
        <div style={{
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderTop: 'none',
          borderRadius: '0 0 12px 12px',
          padding: '20px 24px',
        }}>
          <EditorContent editor={editor} />
        </div>

      </div>
    </div>
  )
}