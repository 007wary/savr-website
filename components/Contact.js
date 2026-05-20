'use client'

import { useState } from 'react'

export default function Contact() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle')
  const [message, setMessage] = useState('')

  async function handleSubscribe() {
    if (!email.trim()) return
    setStatus('loading')
    setMessage('')
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, tag: 'newsletter' }),
      })
      const data = await res.json()
      if (res.ok) {
        setStatus('success')
        setEmail('')
      } else {
        setStatus('error')
        setMessage(data.error || 'Something went wrong. Please try again.')
      }
    } catch {
      setStatus('error')
      setMessage('Something went wrong. Please try again.')
    }
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') handleSubscribe()
  }

  return (
    <section style={{ background: 'var(--bg-elevated)', padding: '80px 24px' }}>
      <div style={{ maxWidth: '540px', margin: '0 auto', textAlign: 'center' }}>

        <p style={{
          fontSize: '13px',
          fontWeight: '600',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: 'var(--color-primary)',
          marginBottom: '16px',
        }}>
          Newsletter
        </p>

        <h2 style={{
          fontSize: '28px',
          fontWeight: '700',
          color: 'var(--text-primary)',
          marginBottom: '12px',
          lineHeight: '1.3',
        }}>
          Stay in the loop.
        </h2>

        <p style={{
          fontSize: '16px',
          color: 'var(--text-muted)',
          marginBottom: '36px',
          lineHeight: '1.6',
        }}>
          App updates, money tips, and the occasional behind-the-scenes post. No spam.
        </p>

        {status === 'success' ? (
          <div style={{
            padding: '16px 24px',
            background: 'var(--bg-surface)',
            border: '1px solid var(--border)',
            borderRadius: '10px',
            color: '#4ade80',
            fontSize: '15px',
          }}>
            You&apos;re on the list. Welcome aboard.
          </div>
        ) : (
          <>
            <style>{`
              @media (max-width: 480px) {
                .newsletter-form { flex-direction: column !important; }
                .newsletter-form input { width: 100% !important; }
                .newsletter-form button { width: 100% !important; }
              }
            `}</style>
            <div className="newsletter-form" style={{
              display: 'flex',
              gap: '10px',
              maxWidth: '420px',
              margin: '0 auto',
            }}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="your@email.com"
                disabled={status === 'loading'}
                style={{
                  flex: 1,
                  padding: '12px 16px',
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--border)',
                  borderRadius: '8px',
                  color: 'var(--text-primary)',
                  fontSize: '15px',
                  outline: 'none',
                  opacity: status === 'loading' ? 0.6 : 1,
                }}
              />
              <button
                onClick={handleSubscribe}
                disabled={status === 'loading' || !email.trim()}
                style={{
                  padding: '12px 22px',
                  background: status === 'loading' ? '#4a44cc' : 'var(--color-primary)',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '15px',
                  fontWeight: '600',
                  cursor: status === 'loading' ? 'not-allowed' : 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'background 0.2s',
                }}
              >
                {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
              </button>
            </div>

            {status === 'error' && (
              <p style={{ marginTop: '12px', fontSize: '14px', color: '#f87171' }}>
                {message}
              </p>
            )}
          </>
        )}
      </div>
    </section>
  )
}