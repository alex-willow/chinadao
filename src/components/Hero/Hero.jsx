import { hero } from '../../data/content'
import { useLocale } from '../../i18n/LocaleContext'
import ImageButton from '../shared/ImageButton'
import Offers from '../Offers/Offers'
import './Hero.css'

export default function Hero() {
  const { t, lang } = useLocale()

  return (
    <section className="hero-section">
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

            <div className="hero__body">
              {t.hero.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>

            <ImageButton href="#cta">{t.hero.cta}</ImageButton>
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

            <img src={hero.lanterns} alt="" className="hero__lanterns" decoding="async" />
          </div>
        </div>
      </div>
      <Offers />
    </section>
  )
}
