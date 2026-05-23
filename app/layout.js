import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-inter',
})

export const metadata = {
  verification: {
    google: 'LhDba_-p3HJwjp-EbkjyvKZp8SjVn7EttjlrptBvEd0',
  },
  title: 'Savr – Free Offline Expense & Budget Tracker',
  description: 'Savr is a free offline expense tracker and budget app for Android. Track expenses, set budgets, get smart insights, and back up to Google Drive automatically. Your Money, Your Control.',
  keywords: 'free expense tracker, budget tracker app, offline expense tracker, money manager app, personal finance app, budget planner, expense manager, android budget app, track expenses, financial tracker',
  authors: [{ name: 'Wary Dev' }],
  creator: 'Wary Dev',
  openGraph: {
    title: 'Savr – Free Expense Tracker Built for India',
    description: 'Free expense tracker & budget planner app for Android. Track spending, set budgets, automatic Google Drive backup. No ads, no data harvesting. Download free.',
    url: 'https://savrappindia.vercel.app',
    siteName: 'Savr',
    locale: 'en_US',
    type: 'website',
    images: [{ url: 'https://savrappindia.vercel.app/og-image.svg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Savr – Free Expense Tracker Built for India',
    description: 'Free expense tracker & budget planner for Android. Track spending, set budgets, no data harvesting.',
    images: ['https://savrappindia.vercel.app/og-image.svg'],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
}

export const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'MobileApplication',
  name: 'Savr',
  operatingSystem: 'Android',
  applicationCategory: 'FinanceApplication',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  description: 'Savr is a free offline expense tracker and budget planner for Android. Track expenses, set budgets, automatic Google Drive backup. No data harvesting. Your Money, Your Control.',
  author: { '@type': 'Person', name: 'Mwnswrang Wary' },
  url: 'https://play.google.com/store/apps/details?id=com.saver.savr',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.variable}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <Navbar />
        {children}
      </body>
    </html>
  )
}