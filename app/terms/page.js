import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'Terms of Service | Savr',
  description: 'Savr terms of service — read our terms and conditions of use.',
}

export default function TermsOfService() {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: '70px', minHeight: '100vh', background: 'var(--bg-primary)' }}>
        <section style={{ padding: '80px 24px' }}>
          <div style={{ maxWidth: '740px', margin: '0 auto' }}>

            <p style={{ fontSize: '13px', fontWeight: '600', color: 'var(--color-primary)', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '12px' }}>Legal</p>
            <h1 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '8px' }}>Terms of Service</h1>
            <p style={{ fontSize: '14px', color: 'var(--text-subtle)', marginBottom: '64px' }}>Effective Date: April 2026</p>

            <p style={{ fontSize: '15px', color: 'var(--text-muted)', lineHeight: '1.8', marginBottom: '48px' }}>
              Welcome to Savr. By downloading or using the app, you agree to these Terms of Service. Please read them carefully.
            </p>

            {[
              {
                title: '1. Acceptance of Terms',
                content: `By accessing or using Savr, you agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree, please do not use the app.`
              },
              {
                title: '2. Description of Service',
                content: `Savr is a personal expense tracking application that allows you to:\n\n• Track daily expenses with automatic category detection\n• Set and monitor monthly budgets\n• View detailed spending reports, trends, and insights\n• Set up recurring expenses that auto-log on schedule\n• Set monthly spending goals and track progress\n• Export your data as CSV\n• Automatically back up your data to your personal Google Drive\n• Restore your data on a new device from your Google Drive backup\n\nImportant: Savr stores all your financial data locally on your device. Your expenses, budgets, and goals are never stored on our servers. Backups go to your own Google Drive account only.`
              },
              {
                title: '3. User Accounts',
                content: `• Savr uses Google Sign In exclusively — no password is required\n• You must have a valid Google account to use Savr\n• You are responsible for maintaining access to your Google account\n• You must be at least 13 years old to use Savr\n• One person may not maintain more than one account\n• You must notify us immediately of any unauthorized use of your account`
              },
              {
                title: '4. User Data and Ownership',
                content: `• You own all financial data you enter into Savr\n• Your financial data is stored locally on your device — we do not have access to it\n• Backups are stored in your personal Google Drive — only you can access them\n• You are responsible for maintaining access to your Google Drive backups\n• You can export your data as CSV at any time from the History screen\n• Deleting the app will delete all local data — restore from Google Drive backup to recover it`
              },
              {
                title: '5. Google Drive Backup',
                content: `• Savr automatically backs up your data to a Savr folder in your Google Drive\n• We use the drive.file scope — Savr can only access files it creates in your Drive\n• You can delete the backup at any time by removing the Savr folder from your Drive\n• We are not responsible for data loss if you delete your Google Drive backup\n• Backup and restore features require an active internet connection`
              },
              {
                title: '6. Acceptable Use',
                content: `You agree not to:\n\n• Use the app for any illegal or unauthorized purpose\n• Attempt to gain unauthorized access to our systems or other users' accounts\n• Interfere with or disrupt the integrity or performance of the app\n• Reverse engineer or attempt to extract the source code of the app\n• Use automated tools to access or interact with the app\n• Use the app to store or transmit malicious, harmful, or offensive content`
              },
              {
                title: '7. Advertising',
                content: `Savr displays advertisements powered by Google AdMob to keep the app free. By using Savr you consent to the display of advertisements.\n\nWe will never sell your personal or financial data to advertisers.\n\nGoogle AdMob may use device identifiers to serve relevant ads. You can opt out of personalized ads in your device settings under Google → Ads → Opt out of Ads Personalization.`
              },
              {
                title: '8. Third Party Services',
                content: `Savr integrates with the following third party services:\n\n• Supabase — account authentication and profile management\n• Google Sign In — authentication service\n• Google Drive API — backup storage in your personal Google Drive\n• Google AdMob — in-app advertising\n\nBy using Savr, you also agree to the terms of these third party services.`
              },
              {
                title: '9. Intellectual Property',
                content: `All content, design, code, and branding in Savr is owned by Mwnswrang Wary. You may not copy, modify, distribute, or create derivative works without written permission. Your data belongs to you.`
              },
              {
                title: '10. Disclaimer of Warranties',
                content: `Savr is provided "as is" without warranties of any kind, express or implied. We do not guarantee that the app will be error-free, uninterrupted, or meet your specific requirements.\n\nSavr is for personal financial tracking only and does not constitute professional financial, tax, or investment advice. Always consult a qualified professional for financial decisions.`
              },
              {
                title: '11. Limitation of Liability',
                content: `To the maximum extent permitted by applicable law, Savr and its developer shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of or inability to use the app, including but not limited to loss of data, loss of profits, or financial loss.\n\nOur total liability to you for any claims arising from these terms shall not exceed INR 500.`
              },
              {
                title: '12. Data Loss',
                content: `Since your financial data is stored locally on your device, we strongly recommend:\n\n• Enabling automatic Google Drive backup (enabled by default in Savr)\n• Periodically exporting your data as CSV from the History screen\n• Not deleting the Savr folder from your Google Drive\n\nWe are not responsible for data loss caused by device failure, accidental deletion, uninstalling the app, or loss of access to your Google Drive account.`
              },
              {
                title: '13. Termination',
                content: `• You may stop using the app and delete your account at any time via the Delete Account page\n• Deleting your account removes your profile from our servers\n• Your local data and Google Drive backup are unaffected by account deletion — you must delete them separately\n• We reserve the right to suspend or terminate accounts that violate these terms`
              },
              {
                title: '14. Changes to Terms',
                content: `We may update these terms from time to time. We will notify you of any material changes through the app. The effective date at the top of this page will always reflect the latest version. Continued use of the app after changes constitutes acceptance of the new terms.`
              },
              {
                title: '15. Governing Law',
                content: `These terms are governed by the laws of India. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts of India.`
              },
              {
                title: '16. Contact Us',
                content: `App: Savr\nDeveloper: Mwnswrang Wary\nEmail: 007mwnswrangwary@gmail.com`
              },
            ].map(section => (
              <div key={section.title} style={{ marginBottom: '40px' }}>
                <h2 style={{ fontSize: '18px', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '12px' }}>{section.title}</h2>
                <p style={{ fontSize: '15px', color: 'var(--text-muted)', lineHeight: '1.8', whiteSpace: 'pre-line' }}>{section.content}</p>
              </div>
            ))}

          </div>
        </section>
        <Footer />
      </main>
    </>
  )
}