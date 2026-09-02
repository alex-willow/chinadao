import { useState } from 'react'
import { img } from '../../data/content'
import { useLocale } from '../../i18n/LocaleContext'
import AccordionFold from '../shared/AccordionFold'
import Reveal from '../shared/Reveal'
import './Why.css'

const btnOpen = img('accordion-open.png')
const btnClosed = img('accordion-closed.png')

function Chevron() {
  return (
    <svg className="why__chevron" viewBox="0 0 15 10" aria-hidden="true">
      <path
        d="M 7.5 0.828 C 8.027 0.828 8.539 1.063 8.904 1.471 L 14.23 7.417 C 14.607 7.838 14.586 8.498 14.183 8.891 C 13.78 9.282 13.146 9.262 12.77 8.841 L 7.5 2.959 L 2.23 8.841 C 1.854 9.263 1.219 9.283 0.817 8.891 C 0.414 8.498 0.392 7.838 0.769 7.417 L 6.095 1.471 C 6.461 1.063 6.973 0.828 7.5 0.828 Z"
        fill="currentColor"
      />
    </svg>
  )
}

export default function Why() {
  const [open, setOpen] = useState(0)
  const { t } = useLocale()

  return (
    <section className="why">
      <img
        src={img('why-deco.png')}
        alt=""
        className="why__deco"
        loading="lazy"
        decoding="async"
      />
        <Reveal className="why__inner">
          <div className="why__title-wrap">
            <h2 className="why__title">{t.why.title}</h2>
            <img src={img('services-doodle.png')} alt="" className="why__doodle" loading="lazy" decoding="async" />
          </div>
        <div className="why__list">
          {t.why.items.map((item, i) => {
            const isOpen = open === i
            return (
              <button
                key={item.title}
                type="button"
                className={`why__item${isOpen ? ' why__item--open' : ''}`}
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? -1 : i)}
              >
                <div className="why__head">
                  <span className="why__toggle" aria-hidden="true">
                    <span className="why__disc">
                      <img src={btnClosed} alt="" className={isOpen ? 'is-off' : ''} decoding="async" />
                      <img src={btnOpen} alt="" className={isOpen ? '' : 'is-off'} decoding="async" />
                    </span>
                    <Chevron />
                  </span>
                  <p className="why__item-title">{item.title}</p>
                </div>
                <AccordionFold open={isOpen}>
                  <div className="why__fold-inner">
                    <p className="why__item-body">{item.text}</p>
                  </div>
                </AccordionFold>
              </button>
            )
          })}
        </div>
      </Reveal>
      <Reveal className="why__photo-col" delay={100}>
        <div className="why__photo-frame drawn-photo">
          <span className="drawn-photo__back" aria-hidden="true" />
          <div className="why__photo-wrap drawn-photo__frame">
            <img
              src={img('why-photo.jpg')}
              alt={t.hero.photoAlt}
              className="why__photo"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </Reveal>
    </section>
  )
}
