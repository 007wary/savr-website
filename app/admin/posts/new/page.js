'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
import Placeholder from '@tiptap/extension-placeholder'

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
  const [published, setPublished] = useState(false)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const router = useRouter()

  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({ openOnClick: false }),
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
    if (!token) router.push('/admin')
  }, [])

  useEffect(() => {
    if (title) {
      const timeout = setTimeout(() => {
        setSlug(slugify(title))
      }, 500)
      return () => clearTimeout(timeout)
    }
  }, [title])

  async function handleSave(publish) {
    if (!title || !editor?.getHTML()) {
      setMessage('Title and content are required.')
      return
    }
    setSaving(true)
    setMessage('')
    const token = localStorage.getItem('admin_token')

    const res = await fetch('/api/admin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-admin-token': token
      },
      body: JSON.stringify({
        title,
        slug: slug || slugify(title),
        excerpt,
        content: editor.getHTML(),
        cover_image: coverImage,
        category,
        author,
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

  return (
    <div className="min-h-screen bg-[#0A0A0F] px-6 pt-24 pb-12">
      <div className="max-w-3xl mx-auto">

        {/* Top bar */}
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
              onClick={() => handleSave(true)}
              disabled={saving}
              className="bg-[#6C63FF] hover:bg-[#5a52d5] text-white font-semibold px-5 py-2.5 rounded-xl text-sm transition-colors disabled:opacity-50"
            >
              {saving ? 'Publishing...' : 'Publish'}
            </button>
          </div>
        </div>

        {message && <p className="text-red-400 text-sm mb-4">{message}</p>}

        {/* Title */}
        <input
          type="text"
          placeholder="Post title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full bg-transparent text-white text-4xl font-bold placeholder-gray-700 focus:outline-none mb-8"
        />

        {/* Fields grid */}
        <div className="space-y-4 mb-6">

          {/* Row 1: Slug | Category */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-gray-500 tracking-widest uppercase">Slug</label>
              <input
                type="text"
                placeholder="slug (auto-generated)"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-gray-300 text-sm placeholder-gray-600 focus:outline-none focus:border-[#6C63FF] transition-colors"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-gray-500 tracking-widest uppercase">Category</label>
              <input
                type="text"
                placeholder="e.g. Personal Finance"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-gray-300 text-sm placeholder-gray-600 focus:outline-none focus:border-[#6C63FF] transition-colors"
              />
            </div>
          </div>

          {/* Row 2: Author | Cover Image */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-gray-500 tracking-widest uppercase">Author</label>
              <input
                type="text"
                placeholder="Author name"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-gray-300 text-sm placeholder-gray-600 focus:outline-none focus:border-[#6C63FF] transition-colors"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-gray-500 tracking-widest uppercase">Cover Image URL</label>
              <input
                type="text"
                placeholder="https://..."
                value={coverImage}
                onChange={(e) => setCoverImage(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-gray-300 text-sm placeholder-gray-600 focus:outline-none focus:border-[#6C63FF] transition-colors"
              />
            </div>
          </div>

          {/* Row 3: Excerpt (full width) */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-500 tracking-widest uppercase">Excerpt</label>
            <input
              type="text"
              placeholder="Short excerpt (shown on blog listing)"
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-gray-300 text-sm placeholder-gray-600 focus:outline-none focus:border-[#6C63FF] transition-colors"
            />
          </div>

        </div>

        {/* Toolbar */}
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

        {/* Editor */}
        <div className="bg-white/5 border border-white/10 rounded-2xl px-6 py-5">
          <EditorContent editor={editor} />
        </div>

      </div>
    </div>
  )
}