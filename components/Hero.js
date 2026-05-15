'use client'

import { useEffect, useState } from 'react'

export default function Hero() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])

  return (
    <section style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center',
      position: 'relative', overflow: 'hidden', paddingTop: '70px',
    }}>
      <div style={{
        position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)',
        width: '600px', height: '600px',
        background: 'radial-gradient(circle, rgba(108,99,255,0.12) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div className="container" style={{
        display: 'grid', gridTemplateColumns: '1fr 1fr',
        gap: '80px', alignItems: 'center', position: 'relative', zIndex: 1,
      }}>
        <div style={{
          opacity: mounted ? 1 : 0,
          transform: mounted ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.6s ease',
        }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            background: 'var(--color-primary-glow)', border: '1px solid var(--color-primary-border)',
            borderRadius: '100px', padding: '6px 14px', marginBottom: '28px',
          }}>
            <div style={{
              width: '6px', height: '6px', borderRadius: '50%',
              background: 'var(--color-primary)', animation: 'pulse 2s infinite',
            }} />
            <span style={{ fontSize: '13px', color: 'var(--color-primary)', fontWeight: '500' }}>
              Now available on Google Play
            </span>
          </div>

          <h1 style={{
            fontSize: 'clamp(40px, 5vw, 64px)', fontWeight: '800',
            lineHeight: '1.1', marginBottom: '24px', letterSpacing: '-1.5px',
          }}>
            Your Money,{' '}
            <span className="gradient-text">In Control.</span>
          </h1>

          <p style={{
            fontSize: '18px', color: 'var(--text-muted)', lineHeight: '1.7',
            marginBottom: '40px', maxWidth: '480px',
          }}>
            Savr is the offline-first expense tracker built for India.
            Track every rupee, set budgets, and back up automatically — no internet required.
          </p>

          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <a href="https://play.google.com/store/apps/details?id=com.saver.savr" target="_blank" rel="noopener noreferrer" className="btn-primary">
              Download on Google Play
            </a>
            <a href="#features" className="btn-secondary">See Features</a>
          </div>

          <div style={{
            display: 'flex', alignItems: 'center', gap: '24px',
            marginTop: '48px', paddingTop: '32px', borderTop: '1px solid var(--border)',
          }}>
            {[
              { value: 'Free', label: 'Forever free tier' },
              { value: 'Offline', label: 'Works without internet' },
              { value: '30+', label: 'Currencies supported' },
            ].map((stat) => (
              <div key={stat.label}>
                <div style={{ fontSize: '20px', fontWeight: '700', color: 'var(--color-primary)' }}>{stat.value}</div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{
          display: 'flex', justifyContent: 'center', alignItems: 'center',
          opacity: mounted ? 1 : 0,
          transform: mounted ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 0.8s ease 0.2s',
        }}>
          <PhoneMockup />
        </div>
      </div>

      <style>{`
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
        @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-12px); } }
        @media (max-width: 768px) {
          .container { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}

function PhoneMockup() {
  return (
    <div style={{ animation: 'float 4s ease-in-out infinite', filter: 'drop-shadow(0 40px 80px rgba(108,99,255,0.3))' }}>
      <svg width="280" height="560" viewBox="0 0 280 560" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="1" y="1" width="278" height="558" rx="40" fill="#13131A" stroke="#2A2A3E" strokeWidth="2"/>
        <rect x="8" y="8" width="264" height="544" rx="34" fill="#0A0A0F"/>
        <rect x="100" y="16" width="80" height="24" rx="12" fill="#13131A"/>
        <text x="24" y="56" fill="#888899" fontSize="11" fontFamily="Inter">9:41</text>
        <text x="220" y="56" fill="#888899" fontSize="11" fontFamily="Inter">100%</text>
        <rect x="20" y="70" width="240" height="48" rx="12" fill="#13131A"/>
        <text x="36" y="101" fill="#6C63FF" fontSize="18" fontWeight="bold" fontFamily="Inter">Savr</text>
        <circle cx="236" cy="94" r="14" fill="#1A1A24"/>
        <circle cx="236" cy="90" r="5" fill="#888899"/>
        <path d="M226 104 Q236 98 246 104" stroke="#888899" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        <rect x="20" y="130" width="240" height="100" rx="16" fill="#6C63FF"/>
        <text x="36" y="158" fill="rgba(255,255,255,0.7)" fontSize="12" fontFamily="Inter">Total Balance</text>
        <text x="36" y="188" fill="white" fontSize="26" fontWeight="bold" fontFamily="Inter">Rs. 24,500</text>
        <text x="36" y="210" fill="rgba(255,255,255,0.6)" fontSize="11" fontFamily="Inter">Updated just now</text>
        <rect x="20" y="244" width="112" height="60" rx="12" fill="#13131A"/>
        <text x="36" y="268" fill="#888899" fontSize="10" fontFamily="Inter">Income</text>
        <text x="36" y="290" fill="#4ADE80" fontSize="14" fontWeight="bold" fontFamily="Inter">Rs. 45,000</text>
        <rect x="148" y="244" width="112" height="60" rx="12" fill="#13131A"/>
        <text x="164" y="268" fill="#888899" fontSize="10" fontFamily="Inter">Expenses</text>
        <text x="164" y="290" fill="#F87171" fontSize="14" fontWeight="bold" fontFamily="Inter">Rs. 20,500</text>
        <text x="24" y="328" fill="white" fontSize="13" fontWeight="600" fontFamily="Inter">Recent Transactions</text>
        <rect x="20" y="348" width="240" height="40" rx="10" fill="#13131A"/>
        <rect x="32" y="356" width="22" height="22" rx="6" fill="#1A1A24"/>
        <path d="M37 362 L37 371 Q37 374 40 374 L49 374 Q52 374 52 371 L52 362" stroke="#888899" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        <path d="M40 362 Q40 358 43.5 358 Q47 358 47 362" stroke="#888899" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        <text x="62" y="372" fill="white" fontSize="12" fontFamily="Inter">Groceries</text>
        <text x="185" y="372" fill="#F87171" fontSize="12" fontWeight="600" fontFamily="Inter">-850</text>
        <rect x="20" y="396" width="240" height="40" rx="10" fill="#13131A"/>
        <rect x="32" y="404" width="22" height="22" rx="6" fill="#1A1A24"/>
        <path d="M46 405 L40 416 L44 416 L38 427 L46 414 L42 414 Z" fill="#888899"/>
        <text x="62" y="420" fill="white" fontSize="12" fontFamily="Inter">Electricity</text>
        <text x="178" y="420" fill="#F87171" fontSize="12" fontWeight="600" fontFamily="Inter">-1,200</text>
        <rect x="20" y="444" width="240" height="40" rx="10" fill="#13131A"/>
        <rect x="32" y="452" width="22" height="22" rx="6" fill="#1A1A24"/>
        <rect x="36" y="458" width="14" height="10" rx="2" stroke="#888899" strokeWidth="1.5" fill="none"/>
        <path d="M39 458 L39 456 Q39 454 43 454 Q47 454 47 456 L47 458" stroke="#888899" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        <text x="62" y="468" fill="white" fontSize="12" fontFamily="Inter">Salary</text>
        <text x="175" y="468" fill="#4ADE80" fontSize="12" fontWeight="600" fontFamily="Inter">+45,000</text>
        <rect x="20" y="500" width="240" height="44" rx="22" fill="#13131A"/>
        <path d="M44 526 L44 519 L50 514 L56 519 L56 526 Z" stroke="#6C63FF" strokeWidth="1.5" fill="none" strokeLinejoin="round"/>
        <rect x="47" y="521" width="6" height="5" rx="1" fill="#6C63FF"/>
        <rect x="87" y="522" width="4" height="6" rx="1" fill="#555566"/>
        <rect x="93" y="518" width="4" height="10" rx="1" fill="#555566"/>
        <rect x="99" y="520" width="4" height="8" rx="1" fill="#555566"/>
        <circle cx="140" cy="522" r="10" fill="#6C63FF" opacity="0.2"/>
        <line x1="140" y1="517" x2="140" y2="527" stroke="#6C63FF" strokeWidth="2" strokeLinecap="round"/>
        <line x1="135" y1="522" x2="145" y2="522" stroke="#6C63FF" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="183" cy="522" r="7" stroke="#555566" strokeWidth="1.5" fill="none"/>
        <circle cx="183" cy="522" r="3" stroke="#555566" strokeWidth="1.5" fill="none"/>
        <circle cx="230" cy="522" r="4" stroke="#555566" strokeWidth="1.5" fill="none"/>
        <circle cx="230" cy="522" r="1.5" fill="#555566"/>
        <line x1="230" y1="515" x2="230" y2="517" stroke="#555566" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="230" y1="527" x2="230" y2="529" stroke="#555566" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="223" y1="522" x2="225" y2="522" stroke="#555566" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="235" y1="522" x2="237" y2="522" stroke="#555566" strokeWidth="1.5" strokeLinecap="round"/>
        <rect x="110" y="548" width="60" height="4" rx="2" fill="#2A2A3E"/>
      </svg>
    </div>
  )
}