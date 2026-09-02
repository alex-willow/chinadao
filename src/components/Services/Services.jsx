import { useEffect, useState } from 'react'
import { services } from '../../data/content'
import { useLocale } from '../../i18n/LocaleContext'
import Reveal from '../shared/Reveal'
import './Services.css'

function ServicePanel({ item, decoIndex, className = '' }) {
  return (
    <div className={`services__row ${className}`.trim()}>
      <div className="services__photo-col">
        <div className="services__photo-frame drawn-photo drawn-photo--left drawn-photo--flip-mobile">
          <span className="drawn-photo__back" aria-hidden="true" />
          <div className="services__photo-wrap drawn-photo__frame">
            <img src={item.photo} alt={item.title} className="services__photo" loading="lazy" decoding="async" />
          </div>
        </div>
      </div>
      <div className="services__panel">
        <img
          src={item.deco}
          alt=""
          className={`services__deco services__deco--${decoIndex}`}
          loading="lazy"
          decoding="async"
        />
        <h3 className="services__panel-title">{item.title}</h3>
        {item.text && <p className="services__panel-text">{item.text}</p>}
        {item.subsections?.map((sub) => (
          <div key={sub.subtitle} className="services__subsection">
            <h4>{sub.subtitle}</h4>
            <p>{sub.text}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Services() {
  const { t } = useLocale()
  const items = t.services.items.map((item, i) => ({
    ...item,
    photo: services.items[i].photo,
    deco: services.items[i].deco,
  }))
  const [activeTab, setActiveTab] = useState(0)
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(max-width: 777px)').matches,
  )

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 777px)')
    const sync = () => setIsMobile(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  return (
    <section className="services" id="uslugi">
      <div className="services__inner">
        <Reveal className="services__header">
          <h2 className="services__title">{t.services.title}</h2>
          <img src={services.doodle} alt="" className="services__doodle" loading="lazy" decoding="async" />
        </Reveal>

        <div className="services__tabs">
          {t.services.tabs.map((tab, i) => (
            <button
              key={tab}
              type="button"
              className={`services__tab ${activeTab === i ? 'services__tab--active' : ''}`}
              onClick={() => setActiveTab(i)}
            >
              <span>{tab}</span>
              <span className="services__tab-indicator" />
            </button>
          ))}
        </div>

        {!isMobile && (
          <div className="services__desktop">
            <ServicePanel item={items[activeTab]} decoIndex={activeTab} />
          </div>
        )}

        {isMobile && (
          <div className="services__mobile">
            {items.map((item, i) => (
              <ServicePanel key={item.title} item={item} decoIndex={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
