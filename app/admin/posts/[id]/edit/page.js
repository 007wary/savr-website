'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import LinkExt from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
import Placeholder from '@tiptap/extension-placeholder'

export default function EditPost({ params }) {
  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [excerpt, setExcerpt] = useState('')
  const [coverImage, setCoverImage] = useState('')
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
        class: 'prose prose-invert prose-lg max-w-none focus:outline-none min-h-[300px] text-gray-300',
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
    const post = posts.find(p => p.id === params.id)
    if (!post) { router.push('/admin/posts'); return }

    setTitle(post.title)
    setSlug(post.slug)
    setExcerpt(post.excerpt || '')
    setCoverImage(post.cover_image || '')
    setPublished(post.published)
    editor?.commands.setContent(post.content || '')
    setLoading(false)
  }

  useEffect(() => {
    if (editor && !loading) {
      const token = localStorage.getItem('admin_token')
      fetchPost(token)
    }
  }, [editor])

  async function handleSave(publish) {
    if (!title || !editor?.getHTML()) {
      setMessage('Title and content are required.')
      return
    }
    setSaving(true)
    setMessage('')
    const token = localStorage.getItem('admin_token')

    const res = await fetch('/api/admin', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'x-admin-token': token
      },
      body: JSON.stringify({
        id: params.id,
        title,
        slug,
        excerpt,
        content: editor.getHTML(),
        cover_image: coverImage,
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
    <div className="min-h-screen bg-[#0A0A0F] flex items-center justify-center">
      <p className="text-gray-400">Loading post...</p>
    </div>
  )

  return (
    <div className="min-h-screen bg-[#0A0A0F] px-6 py-12">
      <div className="max-w-3xl mx-auto">

        <div className="flex items-center justify-between mb-8">
          <button onClick={() => router.push('/admin/posts')} className="text-gray-400 hover:text-white transition-colors">
            ← Back
          </button>
          <div className="flex gap-3">
            <button
              onClick={() => handleSave(false)}
              disabled={saving}
              className="bg-white/5 hover:bg-white/10 text-gray-300 px-5 py-2.5 rounded-xl text-sm transition-colors disabled:opacity-50"
            >
              Save Draft
            </button>
            <button
              onClick={() => handleSave(published)}
              disabled={saving}
              className="bg-[#6C63FF] hover:bg-[#5a52d5] text-white font-semibold px-5 py-2.5 rounded-xl text-sm transition-colors disabled:opacity-50"
            >
              {saving ? 'Saving...' : 'Save'}
            </button>
            {!published && (
              <button
                onClick={() => handleSave(true)}
                disabled={saving}
                className="bg-green-600 hover:bg-green-700 text-white font-semibold px-5 py-2.5 rounded-xl text-sm transition-colors disabled:opacity-50"
              >
                Publish
              </button>
            )}
          </div>
        </div>

        {message && <p className="text-red-400 text-sm mb-4">{message}</p>}

        <div className="space-y-4 mb-6">
          <input
            type="text"
            placeholder="Post title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-transparent text-white text-4xl font-bold placeholder-gray-700 focus:outline-none"
          />
          <input
            type="text"
            placeholder="slug"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-gray-400 text-sm placeholder-gray-700 focus:outline-none focus:border-[#6C63FF] transition-colors"
          />
          <input
            type="text"
            placeholder="Short excerpt"
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-gray-300 text-sm placeholder-gray-600 focus:outline-none focus:border-[#6C63FF] transition-colors"
          />
          <input
            type="text"
            placeholder="Cover image URL (optional)"
            value={coverImage}
            onChange={(e) => setCoverImage(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-gray-300 text-sm placeholder-gray-600 focus:outline-none focus:border-[#6C63FF] transition-colors"
          />
        </div>

        <div className="flex flex-wrap gap-2 mb-4 bg-white/5 border border-white/10 rounded-xl px-4 py-3">
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
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${btn.active ? 'bg-[#6C63FF] text-white' : 'text-gray-400 hover:text-white hover:bg-white/10'}`}
            >
              {btn.label}
            </button>
          ))}
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl px-6 py-5">
          <EditorContent editor={editor} />
        </div>

      </div>
    </div>
  )
}