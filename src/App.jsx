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

export default function App() {
  return (
    <>
      <Seo />
      <Header />
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
      <Footer />
    </>
  )
}
