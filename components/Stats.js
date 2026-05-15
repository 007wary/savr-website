export default function Stats() {
  const stats = [
    { value: '1,000+', label: 'Downloads', icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
      </svg>
    )},
    { value: '4.5★', label: 'Play Store Rating', icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    )},
    { value: '30+', label: 'Currencies Supported', icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/>
      </svg>
    )},
    { value: '100%', label: 'Offline Support', icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
      </svg>
    )},
  ]

  return (
    <section className="section" style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', padding: '64px 0' }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '40px',
        }}>
          {stats.map((stat) => (
            <div key={stat.label} style={{ textAlign: 'center' }}>
              <div style={{
                width: '56px', height: '56px', borderRadius: '16px',
                background: 'var(--color-primary-glow)', border: '1px solid var(--color-primary-border)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'var(--color-primary)', margin: '0 auto 16px',
              }}>
                {stat.icon}
              </div>
              <div style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: '800', letterSpacing: '-1px', marginBottom: '6px' }}>
                {stat.value}
              </div>
              <div style={{ fontSize: '14px', color: 'var(--text-muted)' }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}