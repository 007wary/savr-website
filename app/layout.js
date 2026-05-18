import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-inter',
})

export const metadata = {
  title: 'Savr – Your Money, In Control',
  description: 'Savr is an offline-first expense tracker built for India. Track expenses, set budgets, and take control of your money. Available on Android.',
  keywords: 'expense tracker, budget app, money manager, India, offline, savings, personal finance',
  authors: [{ name: 'Wary Dev' }],
  creator: 'Wary Dev',
  openGraph: {
    title: 'Savr – Your Money, In Control',
    description: 'Offline-first expense tracker built for India. Track expenses, set budgets, backup to Google Drive.',
    url: 'https://savrappindia.vercel.app',
    siteName: 'Savr',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Savr – Your Money, In Control',
    description: 'Offline-first expense tracker built for India.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.variable}>
        <Navbar />
        {children}
      </body>
    </html>
  )
}