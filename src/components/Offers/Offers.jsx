import { useEffect, useRef } from 'react'
import { offers } from '../../data/content'
import { useLocale } from '../../i18n/LocaleContext'
import Reveal from '../shared/Reveal'
import './Offers.css'

export default function Offers() {
  const { t } = useLocale()
  const doubled = [...offers.images, ...offers.images]
  const trackRef = useRef(null)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    let offset = 0
    let prev = performance.now()
    let frame = 0
    const speed = 48

    function tick(now) {
      const half = track.scrollWidth / 2
      if (half > 0) {
        offset -= ((now - prev) / 1000) * speed
        if (-offset >= half) offset += half
        track.style.transform = `translate3d(${offset}px, 0, 0)`
      }
      prev = now
      frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [])

  return (
    <div className="offers">
      <div className="offers__container">
        <Reveal className="offers__header">
          <h2 className="offers__title">
            {t.offers.before}{' '}
            <span className="offers__highlight">
              {t.offers.highlight}
              <img src={offers.doodle} alt="" className="offers__doodle" decoding="async" />
            </span>{' '}
            {t.offers.after}
          </h2>
          <p className="offers__text">{t.offers.text}</p>
        </Reveal>

        <div className="offers__marquee">
          <div className="offers__track" ref={trackRef}>
            {doubled.map((src, i) => (
              <div key={i} className="offers__card">
                <img src={src} alt={t.offers.imageAlt} decoding="async" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
