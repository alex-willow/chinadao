import { img } from '../../data/content'
import { useLocale } from '../../i18n/LocaleContext'
import SocialIcons from '../shared/SocialIcons'
import Reveal from '../shared/Reveal'
import { scrollToHref } from '../../utils/scrollTo'
import './Footer.css'

export default function Footer() {
  const { t } = useLocale()

  return (
    <footer className="footer">
      <Reveal className="footer__inner">
        <div className="footer__grid">
          <div className="footer__brand">
            <a
              href="/"
              className="footer__logo"
              onClick={(event) => scrollToHref(event, '#')}
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
                  <a href={l.href} onClick={(event) => scrollToHref(event, l.href)}>{l.label}</a>
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
        </p>
      </Reveal>
    </footer>
  )
}
