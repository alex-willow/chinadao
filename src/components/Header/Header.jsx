import { useEffect, useState } from 'react'
import { useLocale, pathForLang } from '../../i18n/LocaleContext'
import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher'
import { scrollToHref } from '../../utils/scrollTo'
import './Header.css'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { t, lang } = useLocale()

  useEffect(() => {
    document.body.classList.toggle('nav-open', menuOpen)
    return () => document.body.classList.remove('nav-open')
  }, [menuOpen])

  useEffect(() => {
    function onResize() {
      if (window.innerWidth >= 1200) setMenuOpen(false)
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  function closeMenu() {
    setMenuOpen(false)
  }

  const links = t.nav.links.map((link) => (
    <a
      key={link.href}
      href={link.href}
      className="header__link"
      onClick={(event) => {
        scrollToHref(event, link.href)
        closeMenu()
      }}
    >
      <span className="drawn drawn--blue header__link-shape" aria-hidden="true" />
      <span className="header__link-text">{link.label}</span>
    </a>
  ))

  return (
    <header className={`header ${menuOpen ? 'header--open' : ''}`}>
      <nav className="header__nav" aria-label={t.nav.aria}>
        <div className="header__inner">
          <a
            href={pathForLang(lang)}
            className="header__logo"
            onClick={(event) => {
              scrollToHref(event, '#')
              closeMenu()
            }}
          >
            <span className="header__logo-icon-wrap">
              <img src="/images/logo.png" alt="ChinaDao" className="header__logo-icon" width={51} height={57} fetchPriority="high" />
            </span>
            <span className="header__logo-text">
              <span className="header__logo-name">CHINADAO</span>
              <span className="header__logo-tagline">
                {t.nav.taglineBefore}
                <span className="header__logo-china">{t.nav.taglineChina}</span>
              </span>
            </span>
          </a>

          {menuOpen && (
            <button
              type="button"
              className="header__backdrop"
              aria-label={t.nav.closeMenu}
              onClick={closeMenu}
            />
          )}

          <div className="header__panel">
            <span className="header__panel-shape" aria-hidden="true" />
            <div className="header__links">{links}</div>
            <LanguageSwitcher className="header__lang header__lang--mobile" variant="full" onPicked={closeMenu} />
          </div>

          <div className="header__actions">
            <LanguageSwitcher className="header__lang header__lang--desktop" />
            <button
              type="button"
              className={`header__burger ${menuOpen ? 'header__burger--open' : ''}`}
              onClick={() => setMenuOpen((open) => !open)}
              aria-label={menuOpen ? t.nav.closeMenu : t.nav.openMenu}
              aria-expanded={menuOpen}
            >
              <span />
              <span />
            </button>
          </div>
        </div>
      </nav>
    </header>
  )
}
