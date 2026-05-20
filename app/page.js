import Hero from '@/components/Hero'
import Features from '@/components/Features'
import WhySavr from '@/components/WhySavr'
import BlogPreview from '@/components/BlogPreview'
import FAQ from '@/components/FAQ'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main>
      <Hero />
      <Features />
      <WhySavr />
      <BlogPreview />
      <FAQ />
      <Contact />
      <Footer />
    </main>
  )
}