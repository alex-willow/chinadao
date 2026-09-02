import { img } from '../../data/content'
import { useLocale, pathForLang, pathForPage } from '../../i18n/LocaleContext'
import SocialIcons from '../shared/SocialIcons'
import Reveal from '../shared/Reveal'
import { scrollToHref } from '../../utils/scrollTo'
import './Footer.css'

export default function Footer() {
  const { t, lang, page, navigate } = useLocale()

  return (
    <footer className="footer">
      <Reveal className="footer__inner">
        <div className="footer__grid">
          <div className="footer__brand">
            <a
              href={pathForLang(lang)}
              className="footer__logo"
              onClick={(event) => scrollToHref(event, '#', navigate)}
            >
              <img
                src={img('logo-light.png')}
                alt="ChinaDao"
                className="footer__logo-icon"
                loading="lazy"
                decoding="async"
              />
              <span className="footer__logo-name">ChinaDao</span>
            </a>
            <p className="footer__desc">{t.footer.description}</p>
          </div>

          <div className="footer__col">
            <p className="footer__heading">{t.footer.nav}</p>
            <ul>
              {t.nav.links.map((l) => (
                <li key={l.href}>
                  <a href={l.href} onClick={(event) => scrollToHref(event, l.href, navigate)}>{l.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer__col">
            <p className="footer__heading">{t.footer.contacts}</p>
            <SocialIcons variant="footer" />
          </div>
        </div>

        <p className="footer__copy">
          {t.footer.copyright} <span>ChinaDao</span>
          {' · '}
          <a
            className="footer__legal"
            href={pathForPage(lang, 'privacy')}
            onClick={(event) => {
              event.preventDefault()
              if (page !== 'privacy') navigate(pathForPage(lang, 'privacy'))
              else window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
          >
            {t.footer.privacy}
          </a>
        </p>
      </Reveal>
    </footer>
  )
}
