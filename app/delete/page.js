import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'Delete Account | Savr',
  description: 'Request deletion of your Savr account and all associated data.',
}

export default function DeleteAccount() {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: '70px', minHeight: '100vh', background: '#0A0A0F' }}>
        <section style={{ padding: '80px 24px' }}>
          <div style={{ maxWidth: '640px', margin: '0 auto' }}>

            <p style={{ fontSize: '13px', fontWeight: '600', color: '#6C63FF', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '12px' }}>Account</p>
            <h1 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: '800', color: '#ffffff', marginBottom: '16px' }}>Delete Your Account</h1>
            <p style={{ fontSize: '16px', color: '#9ca3af', lineHeight: '1.7', marginBottom: '48px' }}>
              You can request deletion of your Savr account and all associated data at any time. We will process your request within 30 days.
            </p>

            {/* Warning */}
            <div style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '12px', padding: '20px 24px', marginBottom: '48px' }}>
              <p style={{ fontSize: '15px', color: '#fca5a5', lineHeight: '1.7', margin: 0 }}>
                Account deletion is permanent and cannot be undone. All your expenses, budgets and settings will be permanently deleted.
              </p>
            </div>

            {/* How to delete */}
            <div style={{ marginBottom: '48px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#ffffff', marginBottom: '20px' }}>How to delete your account</h2>
              <p style={{ fontSize: '15px', color: '#9ca3af', marginBottom: '16px' }}>You can delete your account directly from the app:</p>
              {[
                'Open the Savr app',
                'Go to Settings tab',
                'Scroll down to Account section',
                'Tap Sign Out',
                'Email us at the address below to request full data deletion',
              ].map((step, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', marginBottom: '12px' }}>
                  <div style={{
                    width: '28px', height: '28px', borderRadius: '50%', flexShrink: 0,
                    background: 'rgba(108,99,255,0.15)', border: '1px solid rgba(108,99,255,0.3)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '13px', fontWeight: '700', color: '#6C63FF',
                  }}>{i + 1}</div>
                  <p style={{ fontSize: '15px', color: '#9ca3af', lineHeight: '1.6', margin: '4px 0 0' }}>{step}</p>
                </div>
              ))}
            </div>

            {/* Email button */}
            <div style={{ marginBottom: '48px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#ffffff', marginBottom: '16px' }}>Request data deletion by email</h2>
              <p style={{ fontSize: '15px', color: '#9ca3af', marginBottom: '20px' }}>
                Send an email from your registered Gmail address with subject line &quot;Delete My Savr Account&quot;:
              </p>
              
                href="mailto:007mwnswrangwary@gmail.com?subject=Delete My Savr Account&body=Please delete my Savr account and all associated data. My registered email is: [your email]"
                style={{
                  display: 'inline-block', background: '#6C63FF', color: '#ffffff',
                  textDecoration: 'none', padding: '13px 28px', borderRadius: '10px',
                  fontSize: '15px', fontWeight: '600',
                }}
              >
                Send Deletion Request
              </a>
            </div>

            {/* What gets deleted */}
            <div style={{ marginBottom: '48px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#ffffff', marginBottom: '20px' }}>What data gets deleted</h2>
              {[
                { label: 'All expenses and transactions', deleted: true },
                { label: 'Budget settings', deleted: true },
                { label: 'Spending goals', deleted: true },
                { label: 'Recurring expense rules', deleted: true },
                { label: 'Profile information (name, phone)', deleted: true },
                { label: 'Account credentials', deleted: true },
                { label: 'Anonymous analytics data may be retained for up to 90 days', deleted: false },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                  <span style={{ fontSize: '16px', color: item.deleted ? '#f87171' : '#f59e0b' }}>{item.deleted ? '\u2715' : '\u26a0'}</span>
                  <p style={{ fontSize: '15px', color: item.deleted ? '#f87171' : '#9ca3af', margin: 0 }}>{item.label}</p>
                </div>
              ))}
            </div>

            {/* Processing time */}
            <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '24px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#ffffff', marginBottom: '12px' }}>Processing time</h2>
              <p style={{ fontSize: '15px', color: '#9ca3af', lineHeight: '1.7', margin: 0 }}>
                We will process your deletion request within <strong style={{ color: '#ffffff' }}>30 days</strong> of receiving it. You will receive a confirmation email once your account has been deleted.
              </p>
            </div>

          </div>
        </section>
        <Footer />
      </main>
    </>
  )
}