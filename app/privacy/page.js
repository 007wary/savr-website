import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'Privacy Policy | Savr',
  description: 'Savr privacy policy — how we handle and protect your data.',
}

export default function PrivacyPolicy() {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: '70px', minHeight: '100vh', background: '#0A0A0F' }}>
        <section style={{ padding: '80px 24px' }}>
          <div style={{ maxWidth: '740px', margin: '0 auto' }}>

            <p style={{ fontSize: '13px', fontWeight: '600', color: '#6C63FF', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '12px' }}>Legal</p>
            <h1 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: '800', color: '#ffffff', marginBottom: '8px' }}>Privacy Policy</h1>
            <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '64px' }}>Effective Date: April 2026</p>

            <div style={{ background: 'rgba(108,99,255,0.08)', border: '1px solid rgba(108,99,255,0.2)', borderRadius: '12px', padding: '20px 24px', marginBottom: '48px' }}>
              <p style={{ fontSize: '15px', color: '#a78bfa', lineHeight: '1.7', margin: 0 }}>
                <strong>Summary:</strong> Your financial data never leaves your device. It is stored locally and backed up only to your own Google Drive. We never store your expenses on our servers.
              </p>
            </div>

            {[
              {
                title: '1. Data Storage Architecture',
                content: `Savr uses a privacy-first architecture:\n\n• All financial data (expenses, budgets, recurring expenses, spending goals) is stored locally on your device using SQLite — it never touches our servers\n• Backups are stored in your own Google Drive account — only you can access them\n• Authentication is handled by Supabase using Google Sign In — we store only your identity, not your financial data`
              },
              {
                title: '2. Information We Collect',
                content: `Stored on your device only:\n• Expense amounts, categories, notes and dates\n• Budget limits and recurring expense settings\n• Spending goals\n• App preferences (currency, notification settings)\n\nStored on our servers (Supabase) for account management only:\n• Email address (from Google Sign In)\n• Full name and profile picture (from Google Sign In)\n• Device model and Android version (for support and analytics)\n• App version installed\n• Last active timestamp\n\nStored in your Google Drive:\n• Encrypted backup of your expense data in a private Savr folder\n• Only accessible by you and the Savr app`
              },
              {
                title: '3. Google Drive Backup',
                content: `Savr automatically backs up your data to a Savr folder in your Google Drive. This backup:\n\n• Is stored in your personal Google Drive account\n• Is only accessible by you and the Savr app\n• Contains your expenses, budgets, recurring expenses, and goals\n• Is used to restore your data when you reinstall the app or switch devices\n• Can be deleted at any time by deleting the Savr folder from your Google Drive\n\nWe use the drive.file scope which only allows Savr to access files it creates — we cannot access any other files in your Google Drive.`
              },
              {
                title: '4. Advertising',
                content: `Savr displays advertisements powered by Google AdMob to keep the app free.\n\nWe will never sell your personal or financial data to advertisers. Your expense data is never shared with advertisers.\n\nGoogle AdMob may use device identifiers to show relevant ads. You can opt out of personalized ads through your device settings under Google → Ads → Opt out of Ads Personalization.`
              },
              {
                title: '5. How We Use Your Information',
                content: `• Authenticate your identity via Google Sign In\n• Restore your data when you reinstall or switch devices\n• Send local notifications such as budget alerts and weekly summaries\n• Display advertisements via Google AdMob\n• Understand app usage patterns to improve Savr (using anonymized analytics)\n• Provide customer support`
              },
              {
                title: '6. Data Sharing',
                content: `We do not sell your personal data. We share information only with:\n\n• Supabase — stores your account profile (not financial data) securely on our behalf\n• Google Drive — stores your backup in your own account\n• Google AdMob — serves advertisements within the app\n• Legal authorities — if required by law or court order`
              },
              {
                title: '7. Third Party Services',
                content: `• Supabase — account authentication and profile storage\n• Google Sign In — authentication service\n• Google Drive API — backup storage in your personal Drive\n• Google AdMob — advertisement service`
              },
              {
                title: '8. Data Security',
                content: `• Financial data is stored locally on your device — never transmitted to our servers\n• All network communications use encrypted HTTPS/TLS\n• Supabase uses row-level security ensuring only you can access your profile\n• Google Drive backup is protected by your Google account security`
              },
              {
                title: '9. Data Retention',
                content: `Your financial data lives on your device and in your Google Drive — you control it completely. Your account profile on our servers is retained as long as your account is active.\n\nTo delete your account and all associated server-side data, visit our Delete Account page or contact us at 007mwnswrangwary@gmail.com. We will respond within 30 days.`
              },
              {
                title: '10. Children\'s Privacy',
                content: `Savr is not intended for users under the age of 13. We do not knowingly collect data from children under 13. If we become aware of such data, we will delete it promptly.`
              },
              {
                title: '11. Your Rights',
                content: `• Access — all your financial data is on your device and accessible at any time\n• Export — export your data as CSV from the History screen\n• Backup — back up and restore your data via Google Drive\n• Correction — edit any expense or profile data directly in the app\n• Deletion — delete your account and all server-side data at any time\n• Opt out of ads — opt out of personalized ads via device settings`
              },
              {
                title: '12. Changes to This Policy',
                content: `We may update this policy from time to time. We will notify you of any material changes through the app. The effective date at the top of this page will always reflect the latest version.`
              },
              {
                title: '13. Contact Us',
                content: `App: Savr\nDeveloper: Mwnswrang Wary\nEmail: 007mwnswrangwary@gmail.com`
              },
            ].map(section => (
              <div key={section.title} style={{ marginBottom: '40px' }}>
                <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#ffffff', marginBottom: '12px' }}>{section.title}</h2>
                <p style={{ fontSize: '15px', color: '#9ca3af', lineHeight: '1.8', whiteSpace: 'pre-line' }}>{section.content}</p>
              </div>
            ))}

          </div>
        </section>
        <Footer />
      </main>
    </>
  )
}