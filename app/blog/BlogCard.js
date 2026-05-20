'use client'

import Link from 'next/link'

export function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-IN', {
    year: 'numeric', month: 'short', day: 'numeric'
  })
}

function Avatar({ src, name }) {
  if (src) {
    return <img src={src} alt={name} style={{ width: '28px', height: '28px', borderRadius: '50%', objectFit: 'cover' }} />
  }
  return (
    <div style={{
      width: '28px', height: '28px', borderRadius: '50%',
      background: 'linear-gradient(135deg, #6C63FF, #A78BFA)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: '11px', fontWeight: '700', color: '#fff', flexShrink: 0,
    }}>
      {name ? name[0].toUpperCase() : 'W'}
    </div>
  )
}

function CoverImage({ src, alt, height = '200px', width = '100%', borderRadius = '12px' }) {
  if (src) {
    return (
      <div style={{ width, height, borderRadius, overflow: 'hidden', flexShrink: 0 }}>
        <img src={src} alt={alt} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }} />
      </div>
    )
  }
  return (
    <div style={{
      width, height, borderRadius, overflow: 'hidden', flexShrink: 0,
      background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <rect width="40" height="40" rx="8" fill="#6C63FF" fillOpacity="0.15"/>
        <path d="M20 8L8 14v12l12 6 12-6V14L20 8z" stroke="#6C63FF" strokeWidth="1.5" strokeLinejoin="round" fill="none" opacity="0.6"/>
        <circle cx="20" cy="20" r="4" fill="#6C63FF" opacity="0.4"/>
      </svg>
    </div>
  )
}

// Large hero card (left side of hero section)
export function HeroMainCard({ post }) {
  return (
    <Link href={`/blog/${post.slug}`} style={{ textDecoration: 'none', display: 'block', flex: '1 1 55%' }}>
      <article
        style={{ cursor: 'pointer', height: '100%' }}
        onMouseEnter={e => e.currentTarget.querySelector('.hero-title').style.color = 'var(--accent)'}
        onMouseLeave={e => e.currentTarget.querySelector('.hero-title').style.color = 'var(--text-primary)'}
      >
        <CoverImage src={post.cover_image} alt={post.title} height="280px" borderRadius="16px" />
        <div style={{ paddingTop: '20px' }}>
          <p style={{ color: 'var(--accent)', fontSize: '12px', fontWeight: '700', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '10px' }}>
            {post.category || 'General'}
          </p>
          <h2 className="hero-title" style={{ fontSize: '24px', fontWeight: '800', color: 'var(--text-primary)', lineHeight: '1.3', marginBottom: '12px', transition: 'color 0.2s ease' }}>
            {post.title}
          </h2>
          {post.excerpt && (
            <p style={{ color: 'var(--text-muted)', fontSize: '15px', lineHeight: '1.7', marginBottom: '16px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
              {post.excerpt}
            </p>
          )}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Avatar src={post.author_image} name={post.author} />
            <span style={{ color: 'var(--text-muted)', fontSize: '13px', fontWeight: '500' }}>{post.author || 'Wary Dev'}</span>
            <span style={{ color: 'var(--text-muted)', fontSize: '13px' }}>·</span>
            <span style={{ color: 'var(--text-muted)', fontSize: '13px' }}>{formatDate(post.created_at)}</span>
          </div>
        </div>
      </article>
    </Link>
  )
}

// Small stacked card (right side of hero section)
export function HeroSideCard({ post }) {
  return (
    <Link href={`/blog/${post.slug}`} style={{ textDecoration: 'none', display: 'block' }}>
      <article
        style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', paddingBottom: '20px', borderBottom: '1px solid var(--border)', cursor: 'pointer' }}
        onMouseEnter={e => e.currentTarget.querySelector('.side-title').style.color = 'var(--accent)'}
        onMouseLeave={e => e.currentTarget.querySelector('.side-title').style.color = 'var(--text-primary)'}
      >
        <CoverImage src={post.cover_image} alt={post.title} width="110px" height="80px" borderRadius="10px" />
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ color: 'var(--accent)', fontSize: '11px', fontWeight: '700', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '6px' }}>
            {post.category || 'General'}
          </p>
          <h3 className="side-title" style={{ fontSize: '15px', fontWeight: '700', color: 'var(--text-primary)', lineHeight: '1.4', marginBottom: '8px', transition: 'color 0.2s ease', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
            {post.title}
          </h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Avatar src={post.author_image} name={post.author} />
            <span style={{ color: 'var(--text-muted)', fontSize: '12px' }}>{post.author || 'Wary Dev'}</span>
          </div>
        </div>
      </article>
    </Link>
  )
}

// All stories row card
export function StoryCard({ post }) {
  return (
    <Link href={`/blog/${post.slug}`} style={{ textDecoration: 'none', display: 'block' }}>
      <article
        style={{ display: 'flex', justifyContent: 'space-between', gap: '16px', paddingBottom: '24px', borderBottom: '1px solid var(--border)', cursor: 'pointer' }}
        onMouseEnter={e => e.currentTarget.querySelector('.story-title').style.color = 'var(--accent)'}
        onMouseLeave={e => e.currentTarget.querySelector('.story-title').style.color = 'var(--text-primary)'}
      >
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '12px', marginBottom: '6px' }}>
            {formatDate(post.created_at)}
            {post.category && <span style={{ color: 'var(--accent)', fontWeight: '700', marginLeft: '8px', textTransform: 'uppercase', fontSize: '11px', letterSpacing: '0.06em' }}>{post.category}</span>}
          </p>
          <h3 className="story-title" style={{ fontSize: '16px', fontWeight: '700', color: 'var(--text-primary)', lineHeight: '1.4', marginBottom: '8px', transition: 'color 0.2s ease', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
            {post.title}
          </h3>
          {post.excerpt && (
            <p style={{ color: 'var(--text-muted)', fontSize: '14px', lineHeight: '1.6', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
              {post.excerpt}
            </p>
          )}
        </div>
        <CoverImage src={post.cover_image} alt={post.title} width="120px" height="80px" borderRadius="10px" />
      </article>
    </Link>
  )
}

// Related posts card
export function RelatedCard({ post }) {
  return (
    <Link href={`/blog/${post.slug}`} style={{ textDecoration: 'none', display: 'block' }}>
      <article
        style={{
          cursor: 'pointer',
          border: '1px solid var(--border)',
          borderRadius: '16px',
          overflow: 'hidden',
          background: 'var(--bg-surface)',
          transition: 'transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.transform = 'translateY(-4px)'
          e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.12)'
          e.currentTarget.style.borderColor = 'var(--color-primary-border)'
        }}
        onMouseLeave={e => {
          e.currentTarget.style.transform = 'translateY(0)'
          e.currentTarget.style.boxShadow = 'none'
          e.currentTarget.style.borderColor = 'var(--border)'
        }}
      >
        <div style={{ padding: '20px 20px 0' }}>
          <p style={{ color: 'var(--color-primary)', fontSize: '11px', fontWeight: '700', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '12px' }}>
            {post.category || 'General'}
          </p>
          <h3 style={{ fontSize: '16px', fontWeight: '700', color: 'var(--text-primary)', lineHeight: '1.4', marginBottom: '12px', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
            {post.title}
          </h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <Avatar src={post.author_image} name={post.author} />
            <span style={{ color: 'var(--text-muted)', fontSize: '12px' }}>{post.author || 'Wary Dev'}</span>
            <span style={{ color: 'var(--text-muted)', fontSize: '12px' }}>· {formatDate(post.created_at)}</span>
          </div>
        </div>
        <CoverImage src={post.cover_image} alt={post.title} height="160px" borderRadius="0px" />
      </article>
    </Link>
  )
}

// Default export for grid
export default function BlogCard({ post }) {
  return (
    <Link href={`/blog/${post.slug}`} style={{ textDecoration: 'none', display: 'block' }}>
      <article
        style={{ cursor: 'pointer' }}
        onMouseEnter={e => e.currentTarget.querySelector('.grid-title').style.color = 'var(--accent)'}
        onMouseLeave={e => e.currentTarget.querySelector('.grid-title').style.color = 'var(--text-primary)'}
      >
        <CoverImage src={post.cover_image} alt={post.title} height="180px" borderRadius="12px" />
        <div style={{ paddingTop: '16px' }}>
          <p style={{ color: 'var(--accent)', fontSize: '11px', fontWeight: '700', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '8px' }}>
            {post.category || 'General'}
          </p>
          <h3 className="grid-title" style={{ fontSize: '17px', fontWeight: '700', color: 'var(--text-primary)', lineHeight: '1.4', marginBottom: '10px', transition: 'color 0.2s ease', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
            {post.title}
          </h3>
          {post.excerpt && (
            <p style={{ color: 'var(--text-muted)', fontSize: '14px', lineHeight: '1.6', marginBottom: '14px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
              {post.excerpt}
            </p>
          )}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Avatar src={post.author_image} name={post.author} />
            <span style={{ color: 'var(--text-muted)', fontSize: '12px' }}>{post.author || 'Wary Dev'}</span>
            <span style={{ color: 'var(--text-muted)', fontSize: '12px' }}>· {formatDate(post.created_at)}</span>
          </div>
        </div>
      </article>
    </Link>
  )
}