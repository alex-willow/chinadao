import { useState } from 'react'
import { img } from '../../data/content'
import { useLocale } from '../../i18n/LocaleContext'
import Reveal from '../shared/Reveal'
import './Faq.css'

const btnOpen = img('accordion-open.png')
const btnClosed = img('accordion-closed.png')

function Chevron({ open }) {
  const fill = open ? 'rgb(255,255,255)' : 'rgb(49,127,244)'
  return (
    <svg className="faq__chevron" viewBox="0 0 15 10" aria-hidden="true">
      <path
        d="M 7.5 0.828 C 8.027 0.828 8.539 1.063 8.904 1.471 L 14.23 7.417 C 14.607 7.838 14.586 8.498 14.183 8.891 C 13.78 9.282 13.146 9.262 12.77 8.841 L 7.5 2.959 L 2.23 8.841 C 1.854 9.263 1.219 9.283 0.817 8.891 C 0.414 8.498 0.392 7.838 0.769 7.417 L 6.095 1.471 C 6.461 1.063 6.973 0.828 7.5 0.828 Z"
        fill={fill}
      />
    </svg>
  )
}

function Answer({ text, guardian, guardianAlt }) {
  if (text.includes(guardian)) {
    const [before, after] = text.split(guardian)
    return (
      <p className="faq__item-body">
        {before}
        <strong>{guardian}</strong>
        {after}
      </p>
    )
  }
  if (text.includes(guardianAlt)) {
    const [before, after] = text.split(guardianAlt)
    return (
      <p className="faq__item-body">
        {before}
        <strong>{guardianAlt}</strong>
        {after}
      </p>
    )
  }
  return <p className="faq__item-body">{text}</p>
}

export default function Faq() {
  const [open, setOpen] = useState(0)
  const { t } = useLocale()

  return (
    <section className="faq" id="faq">
      <Reveal className="faq__photo-col">
        <div className="faq__photo-frame drawn-photo drawn-photo--left drawn-photo--plain-mobile">
          <span className="drawn-photo__back" aria-hidden="true" />
          <div className="faq__photo-wrap drawn-photo__frame">
            <img
              src={img('faq-photo.jpg')}
              alt={t.hero.photoAlt}
              className="faq__photo"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </Reveal>
      <Reveal className="faq__inner" delay={80}>
        <h2 className="faq__title">{t.faq.title}</h2>
        <div className="faq__list">
          {t.faq.items.map((item, i) => {
            const isOpen = open === i
            return (
              <button
                key={item.q}
                type="button"
                className={`faq__item${isOpen ? ' faq__item--open' : ''}`}
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? -1 : i)}
              >
                <div className="faq__head">
                  <p className="faq__item-title">{item.q}</p>
                  <span className="faq__toggle" aria-hidden="true">
                    <img src={isOpen ? btnOpen : btnClosed} alt="" loading="lazy" decoding="async" />
                    <Chevron open={isOpen} />
                  </span>
                </div>
                {isOpen && (
                  <Answer text={item.a} guardian={t.faq.guardian} guardianAlt={t.faq.guardianAlt} />
                )}
              </button>
            )
          })}
        </div>
      </Reveal>
    </section>
  )
}
