'use client'

import { useState } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [formStatus, setFormStatus] = useState(null)

  const handleContact = async (e) => {
  e.preventDefault()
  setFormStatus('loading')

  const res = await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(form),
  })

  if (res.ok) {
    setFormStatus('success')
    setForm({ name: '', email: '', message: '' })
  } else {
    setFormStatus('error')
  }
}

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: '70px', minHeight: '100vh' }}>
        <section className="section">
          <div className="container" style={{ maxWidth: '800px' }}>
            <div style={{ textAlign: 'center', marginBottom: '64px' }}>
              <p style={{ fontSize: '13px', fontWeight: '600', color: 'var(--color-primary)', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '12px' }}>
                Contact
              </p>
              <h1 style={{ fontSize: 'clamp(32px, 4vw, 56px)', fontWeight: '800', letterSpacing: '-1px', marginBottom: '16px' }}>
                Get in touch
              </h1>
              <p style={{ fontSize: '18px', color: 'var(--text-muted)', lineHeight: '1.7', maxWidth: '480px', margin: '0 auto' }}>
                Have a question, found a bug, or just want to say hi? We read every message and reply within 24-48 hours.
              </p>
            </div>

            <style>{`
  @media (max-width: 640px) {
    .contact-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
  }
`}</style>
<div className="contact-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: '48px', alignItems: 'start' }}>
              {/* Left info */}
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '24px' }}>Contact info</h3>
                {[
                  {
                    icon: (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
                      </svg>
                    ),
                    label: 'Email',
                    value: '007mwnswrangwary@gmail.com',
                  },
                  {
                    icon: (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"/>
                      </svg>
                    ),
                    label: 'GitHub',
                    value: 'github.com/007wary',
                  },
                  {
                    icon: (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
                      </svg>
                    ),
                    label: 'Location',
                    value: 'India',
                  },
                ].map(item => (
                  <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
                    <div style={{
                      width: '44px', height: '44px', borderRadius: '12px', flexShrink: 0,
                      background: 'var(--color-primary-glow)', border: '1px solid var(--color-primary-border)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: 'var(--color-primary)',
                    }}>
                      {item.icon}
                    </div>
                    <div>
                      <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '2px' }}>{item.label}</div>
                      <div style={{ fontSize: '15px', fontWeight: '500' }}>{item.value}</div>
                    </div>
                  </div>
                ))}

                <div style={{
                  marginTop: '32px', padding: '20px',
                  background: 'var(--bg-surface)', border: '1px solid var(--border)',
                  borderRadius: 'var(--radius)',
                }}>
                  <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: '1.6' }}>
                    We typically respond within <strong style={{ color: 'var(--text-primary)' }}>24-48 hours</strong>. For bug reports, please include your device model and Android version.
                  </p>
                </div>
              </div>

              {/* Right form */}
              <div className="card" style={{ padding: '36px' }}>
                {formStatus === 'success' ? (
                  <div style={{ textAlign: 'center', padding: '40px 0' }}>
                    <div style={{
                      width: '64px', height: '64px', borderRadius: '50%',
                      background: 'rgba(74, 222, 128, 0.1)', border: '1px solid rgba(74, 222, 128, 0.3)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      margin: '0 auto 16px', color: '#4ADE80',
                    }}>
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                    </div>
                    <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '8px' }}>Message sent!</h3>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>We will get back to you within 24-48 hours.</p>
                    <button onClick={() => setFormStatus(null)} className="btn-secondary">Send another</button>
                  </div>
                ) : (
                  <form onSubmit={handleContact} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div>
                      <label style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-muted)', display: 'block', marginBottom: '8px' }}>Name</label>
                      <input
                        type="text" required placeholder="Your name"
                        value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                        style={{
                          width: '100%', background: 'var(--bg-elevated)', border: '1px solid var(--border)',
                          borderRadius: 'var(--radius)', padding: '12px 16px', color: 'var(--text-primary)',
                          fontSize: '15px', outline: 'none', boxSizing: 'border-box',
                        }}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-muted)', display: 'block', marginBottom: '8px' }}>Email</label>
                      <input
                        type="email" required placeholder="your@email.com"
                        value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                        style={{
                          width: '100%', background: 'var(--bg-elevated)', border: '1px solid var(--border)',
                          borderRadius: 'var(--radius)', padding: '12px 16px', color: 'var(--text-primary)',
                          fontSize: '15px', outline: 'none', boxSizing: 'border-box',
                        }}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-muted)', display: 'block', marginBottom: '8px' }}>Message</label>
                      <textarea
                        required placeholder="Your message..."
                        value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
                        rows={5}
                        style={{
                          width: '100%', background: 'var(--bg-elevated)', border: '1px solid var(--border)',
                          borderRadius: 'var(--radius)', padding: '12px 16px', color: 'var(--text-primary)',
                          fontSize: '15px', outline: 'none', resize: 'vertical', fontFamily: 'inherit',
                          boxSizing: 'border-box',
                        }}
                      />
                    </div>
                    <button type="submit" className="btn-primary" disabled={formStatus === 'loading'} style={{ width: '100%', justifyContent: 'center' }}>
                      {formStatus === 'loading' ? 'Sending...' : 'Send Message'}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </main>
    </>
  )
}