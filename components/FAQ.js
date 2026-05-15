'use client'

import { useState } from 'react'

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null)

  const faqs = [
    {
      question: 'Is Savr free to use?',
      answer: 'Yes, Savr is completely free to download and use. All core features including expense tracking, budgets, reports, and Google Drive backup are free.',
    },
    {
      question: 'Where is my data stored?',
      answer: 'All your financial data is stored locally on your device using SQLite. Nothing is sent to any server. Your data stays on your phone — always.',
    },
    {
      question: 'Does Savr work offline?',
      answer: 'Yes, 100%. Savr is built offline-first. You can log expenses, view reports, and manage budgets without any internet connection.',
    },
    {
      question: 'How does Google Drive backup work?',
      answer: 'Savr automatically backs up your data to your personal Google Drive. Only you can access this backup — we never have access to your Drive or your data.',
    },
    {
      question: 'How do I export my data?',
      answer: 'Go to Settings → Export and choose CSV format. Your complete transaction history will be exported as a CSV file you can open in Excel or Google Sheets.',
    },
    {
      question: 'How do I delete my account?',
      answer: 'You can delete your account and all associated data from Settings → Account → Delete Account. This permanently removes all your data from our systems.',
    },
    {
      question: 'Which currencies does Savr support?',
      answer: 'Savr supports 30+ currencies including INR, USD, EUR, GBP, AED, SGD, and more. You can set your default currency in Settings.',
    },
    {
      question: 'I found a bug. How do I report it?',
      answer: 'Email us at 007mwnswrangwary@gmail.com with a description of the bug and your device model. We typically respond within 24-48 hours.',
    },
  ]

  return (
    <section id="faq" className="section" style={{ borderTop: '1px solid var(--border)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <p style={{ fontSize: '13px', fontWeight: '600', color: 'var(--color-primary)', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '12px' }}>
            FAQ
          </p>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: '800', letterSpacing: '-1px', marginBottom: '16px' }}>
            Frequently asked questions
          </h2>
          <p style={{ fontSize: '18px', color: 'var(--text-muted)', maxWidth: '480px', margin: '0 auto', lineHeight: '1.6' }}>
            Quick answers to common questions about Savr.
          </p>
        </div>

        <div style={{ maxWidth: '720px', margin: '0 auto' }}>
          {faqs.map((faq, index) => (
            <div key={index} style={{
              borderBottom: '1px solid var(--border)',
              overflow: 'hidden',
            }}>
              <button onClick={() => setOpenIndex(openIndex === index ? null : index)} style={{
                width: '100%', background: 'none', border: 'none', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '24px 0', gap: '16px', textAlign: 'left',
              }}>
                <span style={{ fontSize: '16px', fontWeight: '600', color: 'var(--text-primary)' }}>
                  {faq.question}
                </span>
                <div style={{
                  width: '28px', height: '28px', borderRadius: '50%', flexShrink: 0,
                  background: openIndex === index ? 'var(--color-primary)' : 'var(--bg-elevated)',
                  border: '1px solid var(--border)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'all 0.2s ease',
                }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={openIndex === index ? 'white' : 'var(--text-muted)'} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transition: 'transform 0.2s ease', transform: openIndex === index ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                    <polyline points="6 9 12 15 18 9"/>
                  </svg>
                </div>
              </button>

              <div style={{
                maxHeight: openIndex === index ? '200px' : '0',
                overflow: 'hidden',
                transition: 'max-height 0.3s ease',
              }}>
                <p style={{ fontSize: '15px', color: 'var(--text-muted)', lineHeight: '1.7', paddingBottom: '24px' }}>
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}