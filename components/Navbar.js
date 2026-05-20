'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
  { label: 'Features', href: '/#features' },
  { label: 'Why Savr', href: '/#why-savr' },
  { label: 'Blog', href: '/blog' },
  { label: 'FAQ', href: '/#faq' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      transition: 'all 0.3s ease',
      background: scrolled ? 'var(--bg-primary)' : 'transparent',
      backdropFilter: scrolled ? 'blur(20px)' : 'none',
      borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
    }}>
      <div className="container" style={{
        display: 'flex', alignItems: 'center',
        justifyContent: 'space-between', height: '70px',
      }}>
        <Link href="/" style={{
          fontSize: '24px', fontWeight: '800', textDecoration: 'none',
          background: 'linear-gradient(135deg, #6C63FF 0%, #A78BFA 100%)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
        }}>Savr</Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }} className="desktop-nav">
          {navLinks.map(link => (
            <a key={link.label} href={link.href} style={{
              color: 'var(--text-muted)', textDecoration: 'none',
              fontSize: '14px', fontWeight: '500', transition: 'color 0.2s ease',
            }}
              onMouseEnter={e => e.target.style.color = 'var(--text-primary)'}
              onMouseLeave={e => e.target.style.color = 'var(--text-muted)'}>
              {link.label}
            </a>
          ))}
        </div>

        <div className="desktop-nav">
          <a href="https://play.google.com/store/apps/details?id=com.saver.savr" target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ fontSize: '14px', padding: '10px 20px' }}>
            Download
          </a>
        </div>

        <button onClick={() => setMenuOpen(!menuOpen)} className="mobile-menu-btn" style={{
          background: 'none', border: 'none', cursor: 'pointer', padding: '8px', display: 'none',
        }}>
          <div style={{ width: '24px', height: '2px', background: 'var(--text-primary)', marginBottom: '5px', transition: 'all 0.3s ease', transform: menuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none' }} />
          <div style={{ width: '24px', height: '2px', background: 'var(--text-primary)', marginBottom: '5px', opacity: menuOpen ? 0 : 1, transition: 'all 0.3s ease' }} />
          <div style={{ width: '24px', height: '2px', background: 'var(--text-primary)', transition: 'all 0.3s ease', transform: menuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none' }} />
        </button>
      </div>

      {menuOpen && (
        <div style={{ background: 'var(--bg-surface)', borderTop: '1px solid var(--border)', padding: '20px 24px' }} className="mobile-menu">
          {navLinks.map(link => (
            <a key={link.label} href={link.href} onClick={() => setMenuOpen(false)} style={{
              display: 'block', color: 'var(--text-muted)', textDecoration: 'none',
              fontSize: '16px', fontWeight: '500', padding: '12px 0', borderBottom: '1px solid var(--border)',
            }}>{link.label}</a>
          ))}
          <a href="https://play.google.com/store/apps/details?id=com.saver.savr" target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ marginTop: '16px', width: '100%', justifyContent: 'center' }}>
            Download on Google Play
          </a>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
        @media (min-width: 769px) {
          .mobile-menu { display: none !important; }
          .desktop-nav { display: flex !important; }
        }
      `}</style>
    </nav>
  )
}