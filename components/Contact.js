'use client'

import { useState } from 'react'

export default function Contact() {
  const [email, setEmail] = useState('')
  const [newsletterStatus, setNewsletterStatus] = useState(null)

  const handleNewsletter = async (e) => {
    e.preventDefault()
    setNewsletterStatus('loading')
    await new Promise(r => setTimeout(r, 1000))
    setNewsletterStatus('success')
    setEmail('')
  }

  return (
    <section id="newsletter" className="section" style={{ borderTop: '1px solid var(--border)' }}>
      <div className="container">
        <div style={{
          background: 'var(--bg-surface)', border: '1px solid var(--border)',
          borderRadius: 'var(--radius-lg)', padding: '64px 48px',
          textAlign: 'center', position: 'relative', overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
            width: '400px', height: '400px',
            background: 'radial-gradient(circle, rgba(108,99,255,0.08) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />
          <p style={{ fontSize: '13px', fontWeight: '600', color: 'var(--color-primary)', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '12px', position: 'relative' }}>
            Newsletter
          </p>
          <h2 style={{ fontSize: 'clamp(24px, 3vw, 40px)', fontWeight: '800', letterSpacing: '-1px', marginBottom: '12px', position: 'relative' }}>
            Stay in the loop
          </h2>
          <p style={{ fontSize: '16px', color: 'var(--text-muted)', maxWidth: '420px', margin: '0 auto 32px', lineHeight: '1.7', position: 'relative' }}>
            Get updates on new features, money saving tips, and Savr news. No spam, ever.
          </p>

          {newsletterStatus === 'success' ? (
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              background: 'rgba(74, 222, 128, 0.1)', border: '1px solid rgba(74, 222, 128, 0.3)',
              borderRadius: 'var(--radius)', padding: '12px 24px', color: '#4ADE80', fontWeight: '600',
              position: 'relative',
            }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              You are subscribed!
            </div>
          ) : (
            <form onSubmit={handleNewsletter} style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap', position: 'relative' }}>
              <input
                type="email" required placeholder="Enter your email"
                value={email} onChange={e => setEmail(e.target.value)}
                style={{
                  background: 'var(--bg-elevated)', border: '1px solid var(--border)',
                  borderRadius: 'var(--radius)', padding: '12px 20px', color: 'var(--text-primary)',
                  fontSize: '15px', outline: 'none', width: '300px', maxWidth: '100%',
                }}
              />
              <button type="submit" className="btn-primary" disabled={newsletterStatus === 'loading'}>
                {newsletterStatus === 'loading' ? 'Subscribing...' : 'Subscribe'}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}