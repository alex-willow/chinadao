import { useLayoutEffect, useRef } from 'react'
import { hero } from '../../data/content'
import { useLocale } from '../../i18n/LocaleContext'
import ImageButton from '../shared/ImageButton'
import Offers from '../Offers/Offers'
import './Hero.css'

export default function Hero() {
  const { t, lang } = useLocale()
  const rootRef = useRef(null)

  useLayoutEffect(() => {
    const root = rootRef.current
    if (!root) return undefined

    const ease = 'cubic-bezier(0.22, 1, 0.36, 1)'
    const play = (el, { delay = 0, duration = 620, y = 14, fadeOnly = false } = {}) => {
      if (!el) return
      el.animate(
        [
          { opacity: 0, transform: fadeOnly ? 'none' : `translateY(${y}px)` },
          { opacity: 1, transform: 'none' },
        ],
        { duration, delay, easing: ease, fill: 'backwards' },
      )
    }

    play(root.querySelector('.hero__photo-frame'), { delay: 80, duration: 720, y: 16 })
    play(root.querySelector('.hero__badge'), { delay: 200, duration: 620, y: 12 })
    play(root.querySelector('.hero__lanterns'), { delay: 180, duration: 700, fadeOnly: true })
    root.querySelectorAll('.hero__title-line').forEach((line, i) => {
      play(line, { delay: 40 + i * 80, duration: 580, y: 12 })
    })
    play(root.querySelector('.hero__body'), { delay: 260, duration: 600, y: 12 })
    play(root.querySelector('.hero__text-col .image-btn'), { delay: 340, duration: 580, y: 10 })

    return undefined
  }, [])

  return (
    <section className="hero-section" ref={rootRef}>
      <div className="hero">
        <div className="hero__content">
          <div className="hero__text-col" data-hero-lang={lang}>
            <h1 className="hero__title">
              <span className="hero__title-line">{t.hero.titleLines[0]}</span>
              <span className="hero__title-line">
                <img src={hero.photo} alt={t.hero.photoAlt} className="hero__inline-photo" width={56} height={72} decoding="async" />
                {t.hero.titleLines[1]}
              </span>
              <span className="hero__title-line">
                {t.hero.titleLines[2]}
                <img src={hero.chinaText} alt="中国" className="hero__china-text" width={56} height={29} decoding="async" />
              </span>
            </h1>

            <div className="hero__copy">
              <div className="hero__body">
                {t.hero.paragraphs.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>

              <ImageButton href="#cta">{t.hero.cta}</ImageButton>
            </div>
          </div>

          <div className="hero__image-col">
            <div className="hero__badge">
              <span className="drawn drawn--outline hero__badge-shape" aria-hidden="true" />
              <div className="hero__badge-avatars">
                {hero.avatars.map((src) => (
                  <img key={src} src={src} alt="" width={40} height={40} decoding="async" />
                ))}
              </div>
              <span className="hero__badge-text">{t.hero.badge}</span>
            </div>

            <div className="hero__photo-frame drawn-photo">
              <span className="drawn-photo__back" aria-hidden="true" />
              <div className="hero__photo-wrap drawn-photo__frame">
                <img
                  src={hero.mainImage}
                  alt={t.hero.photoAlt}
                  className="hero__photo"
                  width={1803}
                  height={2007}
                  fetchPriority="high"
                  decoding="async"
                />
              </div>
            </div>

            <img src={hero.lanterns} alt="" className="hero__lanterns" width={191} height={278} decoding="async" />
          </div>
        </div>
      </div>
      <Offers />
    </section>
  )
}
