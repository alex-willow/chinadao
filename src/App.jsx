import { useEffect } from 'react'
import Header from './components/Header/Header'
import Hero from './components/Hero/Hero'
import About from './components/About/About'
import Services from './components/Services/Services'
import Why from './components/Why/Why'
import Process from './components/Process/Process'
import Pricing from './components/Pricing/Pricing'
import Testimonials from './components/Testimonials/Testimonials'
import Faq from './components/Faq/Faq'
import Contact from './components/Contact/Contact'
import Footer from './components/Footer/Footer'
import Seo from './components/Seo'
import Privacy from './pages/Privacy/Privacy'
import { useLocale } from './i18n/LocaleContext'
import { consumeHomeScroll } from './utils/scrollTo'

function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Services />
      <Why />
      <Process />
      <Pricing />
      <Contact />
      <Testimonials />
      <Faq />
    </main>
  )
}

export default function App() {
  const { page } = useLocale()

  useEffect(() => {
    if (page === 'privacy') {
      window.scrollTo(0, 0)
      return
    }

    const target = consumeHomeScroll()
    if (target === null) return

    requestAnimationFrame(() => {
      if (!target) {
        window.scrollTo({ top: 0, behavior: 'instant' })
        return
      }
      document.getElementById(target)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }, [page])

  return (
    <>
      <Seo />
      <Header />
      {page === 'privacy' ? (
        <main>
          <Privacy />
        </main>
      ) : (
        <Home />
      )}
      <Footer />
    </>
  )
}
