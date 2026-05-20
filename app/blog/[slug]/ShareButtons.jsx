'use client'

import { useState } from 'react'

export default function ShareButtons({ title, slug }) {
  const [copied, setCopied] = useState(false)
  const url = `https://savrappindia.vercel.app/blog/${slug}`
  const encoded = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)

  function openLink(href) {
    const a = document.createElement('a')
    a.href = href
    a.target = '_blank'
    a.rel = 'noopener noreferrer'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

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
    lineHeight: '1',
  }

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '10px', marginBottom: '40px' }}>
      <span style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-subtle)' }}>Share</span>

      <button style={btnStyle} onClick={() => openLink(`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encoded}`)}>
        X / Twitter
      </button>

      <button style={btnStyle} onClick={() => openLink(`https://api.whatsapp.com/send?text=${encodedTitle}%20${encoded}`)}>
        WhatsApp
      </button>

      <button style={btnStyle} onClick={() => openLink(`https://www.linkedin.com/sharing/share-offsite/?url=${encoded}`)}>
        LinkedIn
      </button>

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