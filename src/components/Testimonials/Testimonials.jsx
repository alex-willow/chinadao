import { useState } from 'react'
import { img, testimonials, modalTestimonials } from '../../data/content'
import { useLocale } from '../../i18n/LocaleContext'
import ImageButton from '../shared/ImageButton'
import Reveal from '../shared/Reveal'
import AccordionFold from '../shared/AccordionFold'
import './Testimonials.css'

function mergeReviews(translated, originals) {
  return translated.map((item, i) => ({
    ...originals[i],
    ...item,
    photo: originals[i]?.photo || null,
    avatar: originals[i]?.avatar || null,
    university: originals[i]?.university || item.university,
    scholarship: item.scholarship === '' ? '' : item.scholarship || originals[i]?.scholarship,
  }))
}

function TestimonialCard({ t, copy }) {
  const isProgram = t.degree?.includes('курсы') || t.degree?.includes('Program') || t.degree?.includes('Language courses')
  const label = isProgram ? copy.program : copy.degree

  return (
    <article className="testimonials__card">
      {t.photo && (
        <div className="testimonials__photo-col">
          <img src={t.photo} alt={t.name} className="testimonials__photo" loading="lazy" decoding="async" />
        </div>
      )}
      <div className="testimonials__body">
        <div className="testimonials__details">
          <div className="testimonials__name-row">
            <div className="testimonials__avatar-wrap">
              {t.avatar && <img src={t.avatar} alt={t.name} className="testimonials__avatar" loading="lazy" decoding="async" />}
            </div>
            <h3 className="testimonials__name">{t.name}</h3>
          </div>
          {t.degree && (
            <div className="testimonials__meta-row">
              <span className="testimonials__label">{label}:</span>
              <span className="testimonials__value">{t.degree}</span>
            </div>
          )}
          {t.university && (
            <div className="testimonials__meta-row">
              <span className="testimonials__label">{copy.university}:</span>
              <span className="testimonials__value">{t.university}</span>
            </div>
          )}
          {t.specialty && (
            <div className="testimonials__meta-row testimonials__meta-row--top">
              <span className="testimonials__label">{copy.specialty}:</span>
              <span className="testimonials__value">{t.specialty}</span>
            </div>
          )}
          {t.scholarship && (
            <div className="testimonials__meta-row">
              <span className="testimonials__label">{copy.scholarship}:</span>
              <span className="testimonials__value">{t.scholarship}</span>
            </div>
          )}
        </div>
        {t.text && <p className="testimonials__text">{t.text}</p>}
      </div>
    </article>
  )
}

export default function Testimonials() {
  const [expanded, setExpanded] = useState(false)
  const { t } = useLocale()
  const items = mergeReviews(t.testimonials.items, testimonials)
  const extra = mergeReviews(t.testimonials.extra, modalTestimonials).filter((item) => item.photo || item.text)

  return (
    <section className={`testimonials${expanded ? ' testimonials--open' : ''}`} id="testimonials">
      <div className="testimonials__inner">
        <Reveal className="testimonials__header">
          <h2 className="testimonials__title">
            {t.testimonials.title}
            <img
              src={img('quotes.png')}
              alt=""
              className="testimonials__hart"
              loading="lazy"
              decoding="async"
            />
          </h2>
        </Reveal>

        <Reveal className="testimonials__stack">
          <div className="testimonials__list">
            {items.map((item) => (
              <TestimonialCard key={item.name} t={item} copy={t.testimonials} />
            ))}
          </div>
          <AccordionFold open={expanded} duration={700}>
            <div className="testimonials__list testimonials__more">
              {extra.map((item) => (
                <TestimonialCard key={`more-${item.name}`} t={item} copy={t.testimonials} />
              ))}
            </div>
          </AccordionFold>
        </Reveal>

        <Reveal className={`testimonials__cta-wrap${expanded ? ' is-hidden' : ''}`}>
          <ImageButton
            type="button"
            className="testimonials__cta"
            onClick={() => setExpanded(true)}
            disabled={expanded}
          >
            {t.testimonials.readAll}
          </ImageButton>
        </Reveal>
      </div>
    </section>
  )
}
