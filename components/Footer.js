'use client'

import Link from 'next/link'

export default function Footer() {
  return (
    <footer style={{ borderTop: '1px solid var(--border)', padding: '48px 0' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '48px', marginBottom: '48px' }}>

          {/* Brand */}
          <div>
            <div style={{
              fontSize: '24px', fontWeight: '800', marginBottom: '12px',
              background: 'linear-gradient(135deg, #6C63FF 0%, #A78BFA 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              display: 'inline-block',
            }}>Savr</div>
            <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: '1.7', maxWidth: '280px', marginBottom: '24px' }}>
              Free offline expense & budget tracker. Your Money, Your Control.
            </p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <a href="mailto:007mwnswrangwary@gmail.com" style={{
                width: '36px', height: '36px', borderRadius: '10px',
                background: 'var(--bg-surface)', border: '1px solid var(--border)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'var(--text-muted)', transition: 'all 0.2s ease', textDecoration: 'none',
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--color-primary-border)'; e.currentTarget.style.color = 'var(--color-primary)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-muted)' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
                </svg>
              </a>
              <a href="https://github.com/007wary" target="_blank" rel="noopener noreferrer" style={{
                width: '36px', height: '36px', borderRadius: '10px',
                background: 'var(--bg-surface)', border: '1px solid var(--border)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'var(--text-muted)', transition: 'all 0.2s ease', textDecoration: 'none',
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--color-primary-border)'; e.currentTarget.style.color = 'var(--color-primary)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-muted)' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"/>
                </svg>
              </a>
            </div>

            {/* Product Hunt Badge */}
            <div style={{ marginTop: '20px', minHeight: '54px' }}>
              <a href="https://www.producthunt.com/products/savr-3?embed=true&utm_source=badge-featured&utm_medium=badge&utm_campaign=badge-savr-3" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block' }}>
                <img 
                  alt="Savr on Product Hunt" 
                  width="250" 
                  height="54" 
                  src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1154120&theme=dark&t=1779551672363"
                  style={{ display: 'block', width: '250px', height: '54px' }}
                />
              </a>
            </div>
          </div>

          {/* Product links */}
          <div>
            <h4 style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-primary)', letterSpacing: '0.5px', marginBottom: '16px' }}>Product</h4>
            {[
              { label: 'Features', href: '/#features' },
              { label: 'Why Savr', href: '/#why-savr' },
              { label: 'Blog', href: '/#blog' },
              { label: 'FAQ', href: '/#faq' },
              { label: 'Download', href: 'https://play.google.com/store/apps/details?id=com.saver.savr' },
            ].map(link => (
              <a key={link.label} href={link.href} style={{
                display: 'block', fontSize: '14px', color: 'var(--text-muted)',
                textDecoration: 'none', marginBottom: '10px', transition: 'color 0.2s ease',
              }}
                onMouseEnter={e => e.target.style.color = 'var(--text-primary)'}
                onMouseLeave={e => e.target.style.color = 'var(--text-muted)'}>
                {link.label}
              </a>
            ))}
          </div>

          {/* Legal links */}
          <div>
            <h4 style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-primary)', letterSpacing: '0.5px', marginBottom: '16px' }}>Legal</h4>
            {[
              { label: 'Privacy Policy', href: '/privacy' },
              { label: 'Terms of Service', href: '/terms' },
              { label: 'Delete Account', href: '/delete' },
              { label: 'Contact', href: '/contact' },
            ].map(link => (
              <a key={link.label} href={link.href} style={{
                display: 'block', fontSize: '14px', color: 'var(--text-muted)',
                textDecoration: 'none', marginBottom: '10px', transition: 'color 0.2s ease',
              }}
                onMouseEnter={e => e.target.style.color = 'var(--text-primary)'}
                onMouseLeave={e => e.target.style.color = 'var(--text-muted)'}>
                {link.label}
              </a>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          paddingTop: '24px', borderTop: '1px solid var(--border)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px',
        }}>
          <p style={{ fontSize: '13px', color: 'var(--text-subtle)' }}>
            © 2026 Savr. Built by <span style={{ color: 'var(--text-muted)' }}>Wary Dev.</span>
          </p>
          <p style={{ fontSize: '13px', color: 'var(--text-subtle)' }}>
            Made with ♥ for everyone
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          footer .container > div:first-child {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  )
}