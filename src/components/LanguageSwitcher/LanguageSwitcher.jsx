import { useEffect, useRef, useState } from 'react'
import { useLocale, pathForLang } from '../../i18n/LocaleContext'
import CountryFlag from '../CountryFlag/CountryFlag'
import './LanguageSwitcher.css'

const LANGUAGES = [
  { value: 'ru', label: 'Русский', country: 'ru' },
  { value: 'en', label: 'English', country: 'us' },
]

function Chevron({ open }) {
  const path = open
    ? 'M9.99956 9.121L6.28706 12.8335L5.22656 11.773L9.99956 7L14.7726 11.773L13.7121 12.8335L9.99956 9.121Z'
    : 'M9.99956 10.879L13.7121 7.1665L14.7726 8.227L9.99956 13L5.22656 8.227L6.28706 7.1665L9.99956 10.879Z'

  return (
    <svg className="lang-switch__chevron" width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d={path} fill="currentColor" />
    </svg>
  )
}

export default function LanguageSwitcher({ className = '', variant = 'compact', onPicked }) {
  const { lang, setLang, t } = useLocale()
  const [open, setOpen] = useState(false)
  const rootRef = useRef(null)
  const current = LANGUAGES.find((item) => item.value === lang) || LANGUAGES[0]
  const isFull = variant === 'full'

  useEffect(() => {
    function onPointerDown(event) {
      if (!rootRef.current?.contains(event.target)) setOpen(false)
    }
    document.addEventListener('pointerdown', onPointerDown)
    return () => document.removeEventListener('pointerdown', onPointerDown)
  }, [])

  return (
    <div className={`lang-switch${isFull ? ' lang-switch--full' : ''} ${className}`.trim()} ref={rootRef}>
      <button
        type="button"
        className={`lang-switch__trigger${open ? ' lang-switch__trigger--open' : ''}${isFull ? ' lang-switch__trigger--full' : ''}`}
        aria-label={t.nav.language}
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        <span className="drawn drawn--outline" aria-hidden="true" />
        {isFull && <span className="lang-switch__label">{current.label}</span>}
        <span className="lang-switch__flag">
          <CountryFlag country={current.country} />
        </span>
        <Chevron open={open} />
      </button>

      {open && (
        <ul className="lang-switch__menu" role="listbox" aria-label={t.nav.language}>
          {LANGUAGES.map((item) => (
            <li key={item.value}>
              <a
                href={pathForLang(item.value)}
                hrefLang={item.value}
                className={`lang-switch__option${item.value === lang ? ' lang-switch__option--active' : ''}`}
                role="option"
                aria-selected={item.value === lang}
                onClick={(event) => {
                  event.preventDefault()
                  setLang(item.value)
                  setOpen(false)
                  onPicked?.()
                }}
              >
                <span className="drawn drawn--outline lang-switch__option-hover" aria-hidden="true" />
                <CountryFlag country={item.country} />
                <span>{item.label}</span>
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
