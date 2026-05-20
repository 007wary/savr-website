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
  title: 'Savr – Free Expense Tracker Built for India',
  description: 'Savr is a free offline-first expense tracker built for India. Track every rupee, set budgets, get smart insights, and back up to Google Drive automatically. Available on Android.',
  keywords: 'expense tracker, budget app, money manager, India, offline, savings, personal finance',
  authors: [{ name: 'Wary Dev' }],
  creator: 'Wary Dev',
  openGraph: {
    title: 'Savr – Free Expense Tracker Built for India',
    description: 'Offline-first expense tracker built for India. Track expenses, set budgets, backup to Google Drive.',
    url: 'https://savrappindia.vercel.app',
    siteName: 'Savr',
    locale: 'en_IN',
    type: 'website',
    images: [{ url: 'https://savrappindia.vercel.app/og-image.svg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Savr – Free Expense Tracker Built for India',
    description: 'Offline-first expense tracker built for India.',
    images: ['https://savrappindia.vercel.app/og-image.svg'],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'MobileApplication',
  name: 'Savr',
  operatingSystem: 'Android',
  applicationCategory: 'FinanceApplication',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
  description: 'Savr is an offline-first expense tracker built for India. Track expenses, set budgets, and back up automatically.',
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