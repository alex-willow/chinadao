import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { ru } from './ru'
import { en } from './en'

const dictionaries = { ru, en }
const STORAGE_KEY = 'chinadao-lang'
const LocaleContext = createContext(null)

export function pathForLang(lang) {
  return lang === 'en' ? '/en' : '/'
}

export function langFromPath(pathname = typeof window === 'undefined' ? '/' : window.location.pathname) {
  const path = pathname.replace(/\/+$/, '') || '/'
  return path === '/en' ? 'en' : 'ru'
}

function readLang() {
  if (typeof window === 'undefined') return 'ru'
  return langFromPath()
}

export function LocaleProvider({ children }) {
  const [lang, setLangState] = useState(readLang)

  function setLang(next) {
    if (next !== 'ru' && next !== 'en') return
    setLangState(next)
    window.localStorage.setItem(STORAGE_KEY, next)
    const nextPath = pathForLang(next)
    if (langFromPath() !== next) {
      window.history.pushState(null, '', nextPath)
    }
  }

  useEffect(() => {
    function onPop() {
      setLangState(langFromPath())
    }
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  useEffect(() => {
    const t = dictionaries[lang]
    document.documentElement.lang = lang
    document.title = t.meta.title
    const description = document.querySelector('meta[name="description"]')
    if (description) description.setAttribute('content', t.meta.description)
  }, [lang])

  const value = useMemo(
    () => ({ lang, setLang, t: dictionaries[lang], pathForLang }),
    [lang],
  )

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
}

export function useLocale() {
  const ctx = useContext(LocaleContext)
  if (!ctx) throw new Error('useLocale must be used within LocaleProvider')
  return ctx
}
