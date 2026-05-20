import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'About | Savr',
  description: 'Savr is a free, private expense tracker built for India.',
}

export default function About() {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: '70px', minHeight: '100vh', background: 'var(--bg-primary)' }}>
        <section style={{ padding: '80px 24px' }}>
          <div style={{ maxWidth: '740px', margin: '0 auto' }}>

            <p style={{ fontSize: '13px', fontWeight: '600', color: 'var(--color-primary)', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '12px' }}>About</p>
            <h1 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '16px' }}>Savr</h1>
            <p style={{ fontSize: '18px', color: 'var(--text-muted)', lineHeight: '1.7', marginBottom: '64px' }}>
              A free, private expense tracker built for India. Track daily expenses, income and account balances — all stored privately on your device with no cloud servers involved.
            </p>

            {/* Features */}
            <div style={{ marginBottom: '64px' }}>
              <h2 style={{ fontSize: '22px', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '32px' }}>Features</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
                {[
                  { title: 'Expense & Income Tracking', desc: 'Track daily expenses and income with auto category detection from notes.' },
                  { title: 'Smart Budgets', desc: 'Set monthly budgets per category with AI-powered recommendations and alerts.' },
                  { title: 'Reports & Insights', desc: 'Beautiful charts, 6-month trends, spending heatmap and weekly summaries.' },
                  { title: 'Accounts', desc: 'Track cash, bank accounts, credit cards, savings, investments and loans.' },
                  { title: 'Google Drive Backup', desc: 'Automatic backup to your private Google Drive. Restore anytime on any device.' },
                  { title: 'Works Offline', desc: 'Fully offline — all data stored locally on your device using SQLite.' },
                  { title: 'Recurring Expenses', desc: 'Automate monthly bills, subscriptions and recurring payments.' },
                  { title: '30+ Currencies', desc: 'Support for INR, USD, EUR, GBP, AED, SGD and 30+ more currencies.' },
                ].map(feature => (
                  <div key={feature.title} style={{
                    background: 'var(--bg-surface)', border: '1px solid var(--border)',
                    borderRadius: '12px', padding: '20px',
                  }}>
                    <h3 style={{ fontSize: '15px', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '8px' }}>{feature.title}</h3>
                    <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: '1.6', margin: 0 }}>{feature.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Version History */}
            <div style={{ marginBottom: '64px' }}>
              <h2 style={{ fontSize: '22px', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '32px' }}>Version History</h2>
              {[
                {
                  version: 'v1.7.1', date: 'April 2026', tag: 'Latest',
                  changes: [
                    'Google OAuth login with Drive scope',
                    'Automatic Google Drive backup',
                    'Firebase Analytics integration',
                    'Security hardening — OAuth secret moved server-side',
                    'Fresh install login bug fix',
                  ],
                },
                {
                  version: 'v1.0.0', date: 'April 2026', tag: 'Initial Release',
                  changes: [
                    'Expense tracking with auto category detection',
                    'Monthly budgets with AI recommendations',
                    'Reports, insights and spending heatmap',
                    'Recurring expenses and spending goal',
                    '30+ currencies and offline support',
                  ],
                },
              ].map(release => (
                <div key={release.version} style={{
                  background: 'var(--bg-surface)', border: '1px solid var(--border)',
                  borderRadius: '12px', padding: '24px', marginBottom: '16px',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                    <span style={{ fontSize: '18px', fontWeight: '800', color: 'var(--text-primary)' }}>{release.version}</span>
                    <span style={{
                      fontSize: '12px', fontWeight: '600', color: 'var(--color-primary)',
                      background: 'var(--color-primary-glow)', border: '1px solid var(--color-primary-border)',
                      padding: '2px 10px', borderRadius: '20px',
                    }}>{release.tag}</span>
                    <span style={{ fontSize: '13px', color: 'var(--text-subtle)', marginLeft: 'auto' }}>{release.date}</span>
                  </div>
                  {release.changes.map((change, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '8px' }}>
                      <span style={{ color: 'var(--color-primary)', fontSize: '14px', marginTop: '2px' }}>{'\u2192'}</span>
                      <p style={{ fontSize: '14px', color: 'var(--text-muted)', margin: 0, lineHeight: '1.6' }}>{change}</p>
                    </div>
                  ))}
                </div>
              ))}
            </div>

            {/* Download CTA */}
            <div style={{
              background: 'var(--color-primary-glow)', border: '1px solid var(--color-primary-border)',
              borderRadius: '16px', padding: '40px', textAlign: 'center',
            }}>
              <h2 style={{ fontSize: '22px', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '8px' }}>Download Savr Free</h2>
              <p style={{ fontSize: '15px', color: 'var(--text-muted)', marginBottom: '24px' }}>Available on Google Play — no subscription, no hidden fees</p>
              <a href="https://play.google.com/store/apps/details?id=com.saver.savr" target="_blank" rel="noopener noreferrer" style={{
                display: 'inline-block', background: 'var(--color-primary)', color: '#ffffff',
                textDecoration: 'none', padding: '13px 28px', borderRadius: '10px', fontSize: '15px', fontWeight: '600',
              }}>
                Download on Google Play
              </a>
            </div>

          </div>
        </section>
        <Footer />
      </main>
    </>
  )
}