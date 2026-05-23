import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'About | Savr',
  description: 'Savr is a free offline expense tracker and budget app. Your data stays on your device. No cloud servers, no data harvesting.',
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
              A free offline expense tracker and budget app. Track daily expenses, income and account balances — all stored privately on your device. No cloud servers, no data harvesting, no loan upsells. Your Money, Your Control.
            </p>

            {/* Mission */}
            <div style={{ marginBottom: '64px' }}>
              <h2 style={{ fontSize: '22px', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '16px' }}>Why we built Savr</h2>
              <p style={{ fontSize: '16px', color: 'var(--text-muted)', lineHeight: '1.8', marginBottom: '16px' }}>
                Most expense tracker apps are built around your data, not your needs. They sync everything to their servers, analyse your spending patterns, and use that information to sell you financial products you didn't ask for.
              </p>
              <p style={{ fontSize: '16px', color: 'var(--text-muted)', lineHeight: '1.8', marginBottom: '16px' }}>
                Savr is different. Every transaction you log stays on your device. We can't see it, we don't want to see it. Your finances are yours alone.
              </p>
              <p style={{ fontSize: '16px', color: 'var(--text-muted)', lineHeight: '1.8' }}>
                We built Savr because we believe privacy shouldn't be a premium feature — it should be the default.
              </p>
            </div>

            {/* Features */}
            <div style={{ marginBottom: '64px' }}>
              <h2 style={{ fontSize: '22px', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '32px' }}>Features</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
                {[
                  { title: 'Expense & Income Tracking', desc: 'Track daily expenses and income with auto category detection from notes.' },
                  { title: 'Smart Budgets', desc: 'Set monthly budgets per category with alerts before you overspend.' },
                  { title: 'Reports & Insights', desc: 'Beautiful charts, 6-month trends, spending heatmap and weekly summaries.' },
                  { title: 'Accounts', desc: 'Track cash, bank accounts, credit cards, savings, investments and loans.' },
                  { title: 'Google Drive Backup', desc: 'Automatic backup to your private Google Drive. Restore anytime on any device.' },
                  { title: 'Works Offline', desc: 'Fully offline — all data stored locally on your device using SQLite.' },
                  { title: 'Recurring Expenses', desc: 'Automate monthly bills, subscriptions and recurring payments.' },
                  { title: '30+ Currencies', desc: 'Support for USD, EUR, GBP, AED, SGD, INR and 30+ more currencies worldwide.' },
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

            {/* Privacy commitment */}
            <div style={{
              background: 'var(--bg-surface)', border: '1px solid var(--border)',
              borderRadius: '16px', padding: '40px', marginBottom: '64px',
            }}>
              <h2 style={{ fontSize: '22px', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '16px' }}>Our privacy commitment</h2>
              {[
                'Your transaction data never leaves your device',
                'No selling your data to advertisers or lenders',
                'Google Drive backup goes directly to your account — we never see it',
                'We only collect your name, email and profile picture via Google Sign-In',
                'Privacy is the default — not a paid feature',
              ].map((point, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '12px' }}>
                  <span style={{ color: 'var(--color-primary)', fontSize: '14px', marginTop: '2px' }}>→</span>
                  <p style={{ fontSize: '15px', color: 'var(--text-muted)', margin: 0, lineHeight: '1.6' }}>{point}</p>
                </div>
              ))}
            </div>

            {/* Built by */}
            <div style={{
              background: 'var(--color-primary-glow)', border: '1px solid var(--color-primary-border)',
              borderRadius: '16px', padding: '40px', textAlign: 'center',
            }}>
              <h2 style={{ fontSize: '22px', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '8px' }}>Built by Wary Dev</h2>
              <p style={{ fontSize: '15px', color: 'var(--text-muted)', marginBottom: '24px', maxWidth: '480px', margin: '0 auto 24px' }}>
                Savr is an independent app built by a solo developer. No VC funding, no data deals, no conflict of interest. Just a useful app that respects your privacy.
              </p>
              <a href="https://play.google.com/store/apps/details?id=com.saver.savr" target="_blank" rel="noopener noreferrer" style={{
                display: 'inline-block', background: 'var(--color-primary)', color: '#ffffff',
                textDecoration: 'none', padding: '13px 28px', borderRadius: '10px', fontSize: '15px', fontWeight: '600',
              }}>
                Download Free on Google Play
              </a>
            </div>

          </div>
        </section>
        <Footer />
      </main>
    </>
  )
}