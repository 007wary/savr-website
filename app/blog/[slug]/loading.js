export default function Loading() {
  return (
    <main style={{ minHeight: '100vh', background: 'var(--bg-primary)', paddingTop: '100px', paddingBottom: '80px' }}>
      <div className="container" style={{ maxWidth: '780px' }}>
        <div style={{ width: '80px', height: '14px', background: 'var(--bg-surface)', borderRadius: '8px', marginBottom: '40px' }} />
        <div style={{ width: '60%', height: '12px', background: 'var(--bg-surface)', borderRadius: '8px', marginBottom: '16px' }} />
        <div style={{ width: '90%', height: '40px', background: 'var(--bg-surface)', borderRadius: '8px', marginBottom: '24px' }} />
        <div style={{ display: 'flex', gap: '12px', marginBottom: '40px' }}>
          <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'var(--bg-surface)' }} />
          <div>
            <div style={{ width: '100px', height: '12px', background: 'var(--bg-surface)', borderRadius: '6px', marginBottom: '8px' }} />
            <div style={{ width: '80px', height: '10px', background: 'var(--bg-surface)', borderRadius: '6px' }} />
          </div>
        </div>
        <div style={{ width: '100%', height: '360px', borderRadius: '16px', background: 'var(--bg-surface)', marginBottom: '48px' }} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {[...Array(4)].map((_, i) => (
            <div key={i} style={{ width: i % 2 === 0 ? '100%' : '80%', height: '14px', background: 'var(--bg-surface)', borderRadius: '6px' }} />
          ))}
        </div>
      </div>
    </main>
  )
}