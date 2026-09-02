import { img, processSteps } from '../../data/content'
import { useLocale } from '../../i18n/LocaleContext'
import Reveal from '../shared/Reveal'
import './Process.css'

const DECOS = [
  { src: img('process-deco-a.png'), className: 'process__deco--a' },
  { src: img('process-deco-b.png'), className: 'process__deco--b' },
  { src: img('process-deco-c.png'), className: 'process__deco--c' },
  { src: img('process-deco-d.png'), className: 'process__deco--d' },
  { src: img('process-deco-e.png'), className: 'process__deco--e' },
  { src: img('process-deco-f.png'), className: 'process__deco--f' },
  { src: img('process-deco-g.png'), className: 'process__deco--g' },
]

function paragraphs(text) {
  return text.replace(/&nbsp;/g, ' ').split(/\n\n/).map((p) => p.trim()).filter(Boolean)
}

export default function Process() {
  const { t } = useLocale()
  const steps = t.process.steps.map((step, i) => ({
    ...step,
    icon: processSteps[i].icon,
  }))
  const noteIndex = steps.length

  return (
    <section className="process" id="process">
      <div className="process__inner">
        <Reveal className="process__header">
          <h2 className="process__title">{t.process.title}</h2>
          <img
            src={img('process-doodle.png')}
            alt=""
            className="process__doodle"
            loading="lazy"
            decoding="async"
          />
        </Reveal>

        <div className="process__stack">
          {DECOS.map((d) => (
            <img key={d.className} src={d.src} alt="" className={`process__deco ${d.className}`} loading="lazy" decoding="async" />
          ))}

          {steps.map((step, i) => (
            <article
              key={step.title}
              className={`process__card ${i % 2 === 0 ? 'process__card--fill' : 'process__card--outline'}`}
              style={{ '--stick': `${80 + i * 20}px`, '--z': i + 1 }}
            >
              <div className="process__card-head">
                <img src={img(step.icon)} alt="" className="process__icon" loading="lazy" decoding="async" />
                <h3>{step.title}</h3>
              </div>
              <div className="process__card-body">
                {paragraphs(step.text).map((p) => (
                  <p key={p.slice(0, 48)}>{p}</p>
                ))}
              </div>
            </article>
          ))}

          <article
            className="process__card process__card--outline process__note"
            style={{ '--stick': `${80 + noteIndex * 20}px`, '--z': noteIndex + 1 }}
          >
            <h3>{t.process.noteTitle}</h3>
            <ul>
              {t.process.note.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        </div>
      </div>
    </section>
  )
}
