'use client'

import { useState } from 'react'

export default function ShareButtons({ title, slug }) {
  const [copied, setCopied] = useState(false)
  const url = `https://savrappindia.vercel.app/blog/${slug}`
  const encoded = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)

  function copyLink() {
    navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const btnStyle = {
    display: 'inline-flex', alignItems: 'center',
    padding: '8px 14px', borderRadius: '8px', fontSize: '13px', fontWeight: '600',
    cursor: 'pointer', border: '1px solid var(--border)',
    background: 'var(--bg-surface)', color: 'var(--text-muted)',
    textDecoration: 'none', lineHeight: '1',
  }

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '10px', marginBottom: '40px' }}>
      <span style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-subtle)' }}>Share</span>

      <a href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encoded}`}
        target="_blank" rel="noopener noreferrer" style={btnStyle}>
        X / Twitter
      </a>

      <a href={`https://wa.me/?text=${encodedTitle}%20${encoded}`}
        target="_blank" rel="noopener noreferrer" style={btnStyle}>
        WhatsApp
      </a>

      <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encoded}`}
        target="_blank" rel="noopener noreferrer" style={btnStyle}>
        LinkedIn
      </a>

      <button onClick={copyLink} style={{
        ...btnStyle,
        color: copied ? 'var(--color-primary)' : 'var(--text-muted)',
        borderColor: copied ? 'var(--color-primary-border)' : 'var(--border)',
      }}>
        {copied ? 'Copied!' : 'Copy Link'}
      </button>
    </div>
  )
}