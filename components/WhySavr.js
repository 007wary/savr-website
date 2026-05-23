export default function WhySavr() {
  const reasons = [
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        </svg>
      ),
      title: 'Privacy First',
      description: 'Your financial data never leaves your device. No servers, no tracking, no selling your data to advertisers. Ever.',
      tag: 'Zero data collection',
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="1" y1="1" x2="23" y2="23"/><path d="M16.72 11.06A10.94 10.94 0 0119 12.55"/><path d="M5 12.55a10.94 10.94 0 015.17-2.39"/><path d="M10.71 5.05A16 16 0 0122.56 9"/><path d="M1.42 9a15.91 15.91 0 014.7-2.88"/><path d="M8.53 16.11a6 6 0 016.95 0"/><line x1="12" y1="20" x2="12.01" y2="20"/>
        </svg>
      ),
      title: 'Truly Offline',
      description: 'Open Savr in a flight, in a basement, in the middle of nowhere. It works. Always. No internet dependency.',
      tag: 'Works anywhere',
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/>
        </svg>
      ),
      title: 'Multi-Currency',
      description: 'Support for 30+ currencies worldwide. Track expenses in any currency, anywhere in the world.',
      tag: '30+ currencies',
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
        </svg>
      ),
      title: 'No Loan Upsells',
      description: 'We are an expense tracker. Not a lending platform disguised as one. No NBFC, no credit push, no conflict of interest.',
      tag: 'Zero conflicts',
    },
  ]

  return (
    <section id="why-savr" className="section">
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <p style={{ fontSize: '13px', fontWeight: '600', color: 'var(--color-primary)', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '12px' }}>
            Why Savr
          </p>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: '800', letterSpacing: '-1px', marginBottom: '16px' }}>
            Different by design
          </h2>
          <p style={{ fontSize: '18px', color: 'var(--text-muted)', maxWidth: '540px', margin: '0 auto', lineHeight: '1.6' }}>
            Most finance apps want your data. Savr just wants to help you save.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '24px',
        }}>
          {reasons.map((reason) => (
            <div key={reason.title} className="card" style={{ padding: '32px', position: 'relative', overflow: 'hidden' }}>
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
                background: 'linear-gradient(90deg, var(--color-primary), transparent)',
              }} />
              <div style={{
                color: 'var(--color-primary)', marginBottom: '20px',
              }}>
                {reason.icon}
              </div>
              <div style={{
                display: 'inline-block', fontSize: '11px', fontWeight: '600',
                color: 'var(--color-primary)', background: 'var(--color-primary-glow)',
                border: '1px solid var(--color-primary-border)',
                borderRadius: '100px', padding: '3px 10px', marginBottom: '14px',
                letterSpacing: '0.5px',
              }}>
                {reason.tag}
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '12px' }}>
                {reason.title}
              </h3>
              <p style={{ fontSize: '15px', color: 'var(--text-muted)', lineHeight: '1.7' }}>
                {reason.description}
              </p>
            </div>
          ))}
        </div>

        {/* Comparison strip */}
        <div style={{
          marginTop: '64px', padding: '32px',
          background: 'var(--bg-surface)', border: '1px solid var(--border)',
          borderRadius: 'var(--radius-lg)',
        }}>
          <p style={{ textAlign: 'center', fontSize: '13px', fontWeight: '600', color: 'var(--text-muted)', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '28px' }}>
            Savr vs the rest
          </p>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '500px', tableLayout: 'fixed' }}>
              <colgroup>
                <col style={{ width: '25%' }} />
                <col style={{ width: '25%' }} />
                <col style={{ width: '25%' }} />
                <col style={{ width: '25%' }} />
              </colgroup>
              <thead>
                <tr>
                  {['Feature', 'Savr', 'Wallet', 'Axio'].map((h, i) => (
                    <th key={h} style={{
                      padding: '12px 0', textAlign: i === 0 ? 'left' : 'center',
                      fontSize: '14px', fontWeight: '600',
                      color: i === 1 ? 'var(--color-primary)' : 'var(--text-muted)',
                      borderBottom: '1px solid var(--border)',
                    }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ['Offline support', true, false, false],
                  ['Privacy first', true, false, false],
                  ['No loan upsells', true, true, false],
                  ['Multi-currency support', true, false, false],
                  ['Google Drive backup', true, false, false],
                  ['Free to use', true, true, false],
                ].map(([label, ...vals]) => (
                  <tr key={label} style={{ borderBottom: '1px solid var(--border)' }}>
                    <td style={{ padding: '14px 16px', fontSize: '14px', color: 'var(--text-muted)' }}>{label}</td>
                    {vals.map((v, i) => (
                      <td key={i} style={{ padding: '14px 0', textAlign: 'center' }}>
                        {v ? (
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={i === 0 ? '#6C63FF' : '#4ADE80'} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12"/>
                          </svg>
                        ) : (
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#555566" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                          </svg>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  )
}