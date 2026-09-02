import { useEffect, useRef } from 'react'
import { img, processSteps } from '../../data/content'
import { useLocale } from '../../i18n/LocaleContext'
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

function clearStyle(el) {
  el.style.position = ''
  el.style.top = ''
  el.style.left = ''
  el.style.width = ''
  el.style.height = ''
  el.style.margin = ''
  el.style.zIndex = ''
}

export default function Process() {
  const { t } = useLocale()
  const steps = t.process.steps.map((step, i) => ({
    ...step,
    icon: processSteps[i].icon,
  }))
  const noteIndex = steps.length
  const trackRef = useRef(null)
  const pinRef = useRef(null)
  const headerRef = useRef(null)
  const lastCardRef = useRef(null)

  useEffect(() => {
    const track = trackRef.current
    const pin = pinRef.current
    const header = headerRef.current
    const last = lastCardRef.current
    if (!track || !pin || !header || !last) return

    const frozen = { current: false }
    const freezeY = { current: 0 }
    const nodes = { current: [] }

    function mobile() {
      return window.matchMedia('(max-width: 777px)').matches
    }

    function layout() {
      if (frozen.current || mobile()) {
        if (mobile()) pin.style.removeProperty('--process-stick')
        return
      }
      const headTop = Number.parseFloat(getComputedStyle(header).top) || 0
      pin.style.setProperty('--process-stick', `${headTop + header.offsetHeight}px`)
    }

    function thaw() {
      if (!frozen.current) return
      nodes.current.forEach(clearStyle)
      pin.classList.remove('process__pin--frozen')
      pin.style.position = ''
      pin.style.top = ''
      pin.style.height = ''
      pin.style.width = ''
      track.style.height = ''
      frozen.current = false
    }

    function freeze() {
      if (frozen.current) return
      const list = [header, ...pin.querySelectorAll('.process__card')]
      const pinBox = pin.getBoundingClientRect()
      const headerBox = header.getBoundingClientRect()
      const lastBox = last.getBoundingClientRect()
      const visualTop = headerBox.top
      const visualH = lastBox.bottom - visualTop
      const placed = list.map((el) => {
        const r = el.getBoundingClientRect()
        return {
          el,
          top: r.top - visualTop,
          left: r.left - pinBox.left,
          width: r.width,
        }
      })

      track.style.height = `${track.offsetHeight}px`
      pin.style.position = 'sticky'
      pin.style.top = `${visualTop}px`
      pin.style.height = `${visualH}px`
      pin.style.width = '100%'
      pin.classList.add('process__pin--frozen')

      placed.forEach(({ el, top, left, width }, i) => {
        el.style.position = 'absolute'
        el.style.top = `${top}px`
        el.style.left = `${left}px`
        el.style.width = `${width}px`
        el.style.margin = '0'
        el.style.zIndex = String(30 + i)
      })

      nodes.current = list
      freezeY.current = window.scrollY
      frozen.current = true
    }

    function sync() {
      if (mobile()) {
        thaw()
        layout()
        return
      }

      if (frozen.current) {
        if (window.scrollY < freezeY.current) {
          thaw()
          layout()
        }
        return
      }

      layout()
      const stickTop = Number.parseFloat(getComputedStyle(last).top) || 0
      if (last.getBoundingClientRect().top <= stickTop + 0.5) freeze()
    }

    sync()
    const ro = new ResizeObserver(() => {
      if (!frozen.current) layout()
    })
    ro.observe(header)
    window.addEventListener('scroll', sync, { passive: true })
    window.addEventListener('resize', sync)
    return () => {
      thaw()
      ro.disconnect()
      window.removeEventListener('scroll', sync)
      window.removeEventListener('resize', sync)
    }
  }, [t.process.title])

  return (
    <section className="process" id="process">
      <div className="process__inner">
        <div className="process__track" ref={trackRef}>
          <div className="process__pin" ref={pinRef}>
            <div className="process__sticky-head" ref={headerRef}>
              <div className="process__header">
                <h2 className="process__title">{t.process.title}</h2>
                <img
                  src={img('process-doodle.png')}
                  alt=""
                  className="process__doodle"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>

            {steps.map((step, i) => (
              <article
                key={step.title}
                className={`process__card ${i % 2 === 0 ? 'process__card--fill' : 'process__card--outline'}`}
                style={{ '--z': i + 1 }}
              >
                {DECOS[i] && (
                  <img
                    src={DECOS[i].src}
                    alt=""
                    className={`process__deco process__deco--${i % 2 === 0 ? 'right' : 'left'}`}
                    loading="lazy"
                    decoding="async"
                  />
                )}
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
              ref={lastCardRef}
              className="process__card process__card--outline process__note"
              style={{ '--z': noteIndex + 1 }}
            >
              <h3>{t.process.noteTitle}</h3>
              <ul>
                {t.process.note.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
            <div className="process__end" aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  )
}
