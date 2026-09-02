import { img, pricingPackages, otherServices } from '../../data/content'
import { useLocale } from '../../i18n/LocaleContext'
import Reveal from '../shared/Reveal'
import './Pricing.css'

function CheckIcon() {
  return (
    <svg className="pricing__check" viewBox="0 0 21 20" aria-hidden="true">
      <path
        d="M10.2991 0C4.61108 0 0 4.47715 0 10C0 15.5228 4.61108 20 10.2991 20C15.9872 20 20.5983 15.5228 20.5983 10C20.5917 4.47982 15.9845 0.00642897 10.2991 0Z"
        fill="#D0E5FE"
      />
      <path
        d="M14.8547 7.00701L10.3777 12.7511C10.271 12.885 10.1118 12.9728 9.93589 12.9947C9.76001 13.0165 9.58222 12.9707 9.44246 12.8674L6.24548 10.4507C5.96337 10.2373 5.91769 9.84804 6.14345 9.58131C6.36921 9.31458 6.78093 9.27139 7.06304 9.48484L9.72893 11.5014L13.8017 6.27547C13.9352 6.08599 14.1681 5.98123 14.4079 6.00278C14.6476 6.02434 14.8554 6.16872 14.9488 6.37859C15.0422 6.58847 15.006 6.82989 14.8547 7.00701Z"
        fill="#1C64F2"
      />
    </svg>
  )
}

function clean(text) {
  return text.replace(/\u00a0|&nbsp;/g, ' ').trim()
}

function PricingCard({ pkg, deco }) {
  return (
    <article className={`pricing__card${deco ? ' pricing__card--deco' : ''}`}>
      {deco && <img src={deco} alt="" className="pricing__deco" loading="lazy" decoding="async" />}
      <div className="pricing__card-top">
        <h3 className="pricing__card-name">{pkg.name}</h3>
        <div className="pricing__price-row">
          <span className="pricing__price">{pkg.price}</span>
          <span className="pricing__duration"> {pkg.duration}</span>
        </div>
      </div>
      <p className="pricing__summary">{pkg.summary}</p>
      <ul className="pricing__features">
        {pkg.features.map((f) => (
          <li key={f}>
            <CheckIcon />
            <span>{clean(f)}</span>
          </li>
        ))}
      </ul>
      {pkg.paymentNote && <p className="pricing__payment-note">{pkg.paymentNote}</p>}
    </article>
  )
}

function PricingNote({ label, children }) {
  return (
    <div className="pricing__note">
      <p className="pricing__note-label">{label}</p>
      <ul>{children}</ul>
    </div>
  )
}

export default function Pricing() {
  const { t } = useLocale()
  const packages = t.pricing.packages.map((pkg, i) => ({
    ...pricingPackages[i],
    ...pkg,
    duration: t.pricing.duration,
    paymentNote: t.pricing.paymentNote,
  }))
  const extras = t.pricing.other.map((svc, i) => ({
    ...otherServices[i],
    ...svc,
  }))
  const [noteA, noteB] = t.pricing.noteMain

  return (
    <section className="pricing" id="pricing">
      <Reveal className="pricing__header">
        <h2 className="pricing__title">{t.pricing.title}</h2>
      </Reveal>

      <Reveal className="pricing__block">
        <div className="pricing__grid">
          {packages.map((pkg, i) => (
            <PricingCard
              key={pkg.name}
              pkg={pkg}
              deco={i === 2 ? img('pricing-deco.png') : null}
            />
          ))}
        </div>

        <PricingNote label={t.pricing.noteLabel}>
          <li>{noteA}</li>
          <li>
            {noteB.before}
            <strong>{noteB.strong}</strong>
            {noteB.after}
          </li>
        </PricingNote>
      </Reveal>

      <Reveal className="pricing__block" delay={80}>
        <h3 className="pricing__subtitle">{t.pricing.otherTitle}</h3>
        <div className="pricing__grid">
          {extras.map((svc) => (
            <PricingCard key={svc.name} pkg={svc} />
          ))}
        </div>
        <PricingNote label={t.pricing.noteLabel}>
          <li>
            {t.pricing.noteOther.before}
            <strong>{t.pricing.noteOther.strong}</strong>
            {t.pricing.noteOther.after}
          </li>
        </PricingNote>
      </Reveal>
    </section>
  )
}
