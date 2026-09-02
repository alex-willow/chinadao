import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { about } from '../../data/content'
import { useLocale } from '../../i18n/LocaleContext'
import useInView from '../../hooks/useInView'
import ImageButton from '../shared/ImageButton'
import Reveal from '../shared/Reveal'
import './About.css'

const GALLERY = Object.values(about.stacks).flat()
const CARD_ROTATES = [-5, 2, -6, 7, -5, 2]

function PhotoGrid({ images }) {
  return (
    <div className="about-more__photos">
      <div className="about-grid">
        {images.map((src, i) => (
          <div
            key={src}
            className="about-grid__cell"
            style={{ '--card-tilt': `${CARD_ROTATES[i % CARD_ROTATES.length]}deg` }}
          >
            <img
              src={src}
              alt=""
              className="about-grid__img"
              width={221}
              height={282}
              decoding="async"
              loading="lazy"
              fetchPriority="low"
            />
          </div>
        ))}
      </div>
    </div>
  )
}

function Entry({ date, place, texts }) {
  return (
    <div className="about-entry">
      <p className="about-entry__meta">{date}</p>
      <p className="about-entry__meta">{place}</p>
      {texts.map((text) => (
        <p key={text}>{text}</p>
      ))}
    </div>
  )
}

function MorePanel({ open, children }) {
  const panelRef = useRef(null)
  const started = useRef(false)

  useLayoutEffect(() => {
    const panel = panelRef.current
    if (!panel) return undefined

    if (!started.current) {
      started.current = true
      panel.style.height = open ? 'auto' : '0px'
      return undefined
    }

    panel.getAnimations().forEach((animation) => animation.cancel())

    if (open) {
      const from = panel.getBoundingClientRect().height
      panel.style.height = 'auto'
      const to = panel.scrollHeight
      panel.style.height = `${from}px`
      panel.offsetHeight
      const anim = panel.animate(
        [{ height: `${from}px` }, { height: `${to}px` }],
        { duration: 700, easing: 'cubic-bezier(0.22, 1, 0.36, 1)', fill: 'forwards' },
      )
      const done = () => {
        panel.style.height = 'auto'
      }
      anim.addEventListener('finish', done)
      return () => {
        anim.removeEventListener('finish', done)
        anim.cancel()
      }
    }

    const from = panel.getBoundingClientRect().height
    panel.style.height = `${from}px`
    const anim = panel.animate(
      [{ height: `${from}px` }, { height: '0px' }],
      { duration: 480, easing: 'ease', fill: 'forwards' },
    )
    const done = () => {
      panel.style.height = '0px'
    }
    anim.addEventListener('finish', done)
    return () => {
      anim.removeEventListener('finish', done)
      anim.cancel()
    }
  }, [open])

  return (
    <div ref={panelRef} className="about-more-panel" aria-hidden={!open}>
      {children}
    </div>
  )
}

export default function About() {
  const [open, setOpen] = useState(false)
  const [sectionRef, near] = useInView({ rootMargin: '40% 0px' })
  const { t } = useLocale()
  const entries = t.about.entries

  useEffect(() => {
    if (!near) return undefined
    const links = GALLERY.map((src) => {
      const link = document.createElement('link')
      link.rel = 'preload'
      link.as = 'image'
      link.href = src
      document.head.appendChild(link)
      const image = new Image()
      image.src = src
      image.decode?.().catch(() => {})
      return link
    })
    return () => {
      links.forEach((link) => link.remove())
    }
  }, [near])

  return (
    <section ref={sectionRef} className={`about${open ? ' about--open' : ''}`} id="obo-mne">
      {near && (
        <div className="about-preload" aria-hidden="true">
          {GALLERY.map((src) => (
            <img key={src} src={src} alt="" width={80} height={102} decoding="async" />
          ))}
        </div>
      )}

      <div className="about__inner">
        <img src={about.bgMap} alt="" className="about__bg-map" loading="lazy" decoding="async" />

        <Reveal className="about__content">
          <div className="about__heading-row">
            <img src={about.sticker} alt="" className="about__sticker" loading="lazy" decoding="async" />
            <div className="about__title-wrap">
              <h2 className="about__title">{t.about.title}</h2>
              <img src={about.doodle} alt="" className="about__doodle" loading="lazy" decoding="async" />
            </div>
          </div>

          <div className="about__copy">
            <div className="about__text">
              {t.about.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>

            <ImageButton
              type="button"
              className={`about__btn${open ? ' is-hidden' : ''}`}
              onClick={() => setOpen(true)}
              disabled={open}
            >
              {t.about.cta}
            </ImageButton>
          </div>
        </Reveal>

        <Reveal className="about__image-col" delay={120}>
          <div className="about__photo-frame drawn-photo">
            <span className="drawn-photo__back" aria-hidden="true" />
            <div className="about__photo-wrap drawn-photo__frame">
              <img src={about.photo} alt={t.hero.photoAlt} className="about__photo" loading="lazy" decoding="async" />
            </div>
          </div>
        </Reveal>
      </div>

      <MorePanel open={open}>
        <div className="about-more" id="obo-mne-more">
          <div className="about-more__row about-more__row--photos-left">
            <div className="about-more__col">
              <h2 className="about-more__title">{t.about.extraTitle}</h2>
              <h3 className="about-more__h3">{t.about.sections[0].heading}</h3>
              <Entry {...entries[0]} />
              <Entry {...entries[1]} />
            </div>
            <PhotoGrid images={about.stacks.block1} />
          </div>

          <div className="about-more__row about-more__row--photos-right">
            <div className="about-more__col">
              <h3 className="about-more__h3">{t.about.sections[1].heading}</h3>
              <Entry {...entries[2]} />
              <Entry {...entries[3]} />
              <Entry {...entries[4]} />
            </div>
            <PhotoGrid images={about.stacks.block2} />
          </div>

          <div className="about-more__row about-more__row--photos-left">
            <div className="about-more__col">
              <h3 className="about-more__h3">{t.about.sections[2].heading}</h3>
              <Entry {...entries[5]} />
              <h3 className="about-more__h3">{t.about.sections[3].heading}</h3>
              <Entry {...entries[6]} />
              <Entry {...entries[7]} />
              <Entry {...entries[8]} />
            </div>
            <PhotoGrid images={about.stacks.block3} />
          </div>
        </div>
      </MorePanel>
    </section>
  )
}
