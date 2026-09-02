import { useLayoutEffect, useRef, useState } from 'react'
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
            <img src={item.photo} alt={item.title} className="services__photo" decoding="async" />
          </div>
        </div>
      </div>
      <div className="services__panel">
        <img
          src={item.deco}
          alt=""
          className={`services__deco services__deco--${decoIndex}`}
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
  const listRef = useRef(null)
  const skipEnter = useRef(true)

  useLayoutEffect(() => {
    const list = listRef.current
    if (!list) return undefined

    const rows = [...list.querySelectorAll('.services__row')]
    const panel = rows.find((row) => row.classList.contains('is-active'))
    rows.forEach((row) => {
      row.getAnimations().forEach((animation) => animation.cancel())
      if (row !== panel) {
        row.style.opacity = ''
        row.style.transform = ''
      }
    })
    if (!panel) return undefined
    if (window.matchMedia('(max-width: 777px)').matches) return undefined

    if (skipEnter.current) {
      skipEnter.current = false
      panel.style.opacity = '1'
      panel.style.transform = 'none'
      return undefined
    }

    const anim = panel.animate(
      [
        { opacity: 0, transform: 'translateY(18px)' },
        { opacity: 1, transform: 'none' },
      ],
      { duration: 520, easing: 'cubic-bezier(0.22, 1, 0.36, 1)', fill: 'forwards' },
    )
    const done = () => {
      panel.style.opacity = '1'
      panel.style.transform = 'none'
    }
    anim.addEventListener('finish', done)
    return () => {
      anim.removeEventListener('finish', done)
      anim.cancel()
    }
  }, [activeTab])

  return (
    <section className="services" id="uslugi">
      <div className="services__inner">
        <Reveal className="services__header">
          <h2 className="services__title">{t.services.title}</h2>
          <img src={services.doodle} alt="" className="services__doodle" decoding="async" />
        </Reveal>

        <div className="services__tabs">
          {t.services.tabs.map((tab, i) => (
            <button
              key={tab}
              type="button"
              className={`services__tab ${activeTab === i ? 'services__tab--active' : ''}`}
              onClick={() => {
                if (i !== activeTab) setActiveTab(i)
              }}
            >
              <span>{tab}</span>
              <span className="services__tab-indicator" />
            </button>
          ))}
        </div>

        <div className="services__list" ref={listRef}>
          {items.map((item, i) => (
            <ServicePanel
              key={item.title}
              item={item}
              decoIndex={i}
              className={activeTab === i ? 'is-active' : ''}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
