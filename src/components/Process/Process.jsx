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

    // Cards are stacked with a 20px offset, so a taller one would peek out from under the deck.
    function equalize() {
      if (mobile()) {
        pin.style.removeProperty('--process-card-h')
        return
      }
      pin.style.setProperty('--process-card-h', 'auto')
      const cards = [...pin.querySelectorAll('.process__card')]
      const tallest = cards.reduce((max, card) => Math.max(max, card.offsetHeight), 0)
      pin.style.setProperty('--process-card-h', `${tallest}px`)
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
      pin.style.left = ''
      pin.style.height = ''
      pin.style.width = ''
      track.style.height = ''
      frozen.current = false
    }

    function parkedTop(el) {
      const stick = Number.parseFloat(getComputedStyle(el).top)
      return Number.isFinite(stick) ? stick : el.getBoundingClientRect().top
    }

    // Scroll position at which the note card reaches its sticky stop and the whole deck is assembled.
    function parkScroll() {
      const trackTop = track.getBoundingClientRect().top + window.scrollY
      return trackTop + pin.offsetTop + last.offsetTop - parkedTop(last)
    }

    function freeze() {
      if (frozen.current) return
      layout()
      const parkY = parkScroll()
      const list = [header, ...pin.querySelectorAll('.process__card')]
      const pinBox = pin.getBoundingClientRect()
      const headerStick = parkedTop(header)
      const lastStick = parkedTop(last)
      const lastHeight = last.offsetHeight
      const flowOffset = pin.offsetTop + last.offsetTop
      const placed = list.map((el) => {
        const r = el.getBoundingClientRect()
        return {
          el,
          top: parkedTop(el) - headerStick,
          left: r.left - pinBox.left,
          width: r.width,
        }
      })
      const visualH = placed[placed.length - 1].top + lastHeight
      const pinOffset = Math.max(0, flowOffset - lastStick + headerStick)

      track.style.height = `${pinOffset + visualH}px`
      pin.style.position = 'absolute'
      pin.style.top = `${pinOffset}px`
      pin.style.left = '0'
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
      freezeY.current = parkY
      frozen.current = true
    }

    function sync() {
      if (mobile()) {
        thaw()
        layout()
        return
      }

      if (frozen.current) {
        if (window.scrollY < freezeY.current - 8) {
          thaw()
          layout()
        }
        return
      }

      layout()
      if (window.scrollY >= parkScroll()) freeze()
    }

    function remeasure() {
      if (!frozen.current) equalize()
      sync()
    }

    equalize()
    sync()
    let alive = true
    document.fonts?.ready.then(() => {
      if (alive) remeasure()
    })
    const ro = new ResizeObserver(() => {
      if (!frozen.current) layout()
    })
    ro.observe(header)
    window.addEventListener('scroll', sync, { passive: true })
    window.addEventListener('resize', remeasure)
    return () => {
      alive = false
      thaw()
      pin.querySelectorAll('.process__card').forEach((card) => {
        card.style.height = ''
      })
      ro.disconnect()
      window.removeEventListener('scroll', sync)
      window.removeEventListener('resize', remeasure)
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
          </div>
        </div>
      </div>
    </section>
  )
}
