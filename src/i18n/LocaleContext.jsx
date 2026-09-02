import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { ru } from './ru'
import { en } from './en'

const dictionaries = { ru, en }
const STORAGE_KEY = 'chinadao-lang'
const LocaleContext = createContext(null)

function readLang() {
  if (typeof window === 'undefined') return 'ru'
  const saved = window.localStorage.getItem(STORAGE_KEY)
  return saved === 'en' || saved === 'ru' ? saved : 'ru'
}

export function LocaleProvider({ children }) {
  const [lang, setLangState] = useState(readLang)

  function setLang(next) {
    if (next !== 'ru' && next !== 'en') return
    setLangState(next)
    window.localStorage.setItem(STORAGE_KEY, next)
  }

  useEffect(() => {
    const t = dictionaries[lang]
    document.documentElement.lang = lang
    document.title = t.meta.title
    const description = document.querySelector('meta[name="description"]')
    if (description) description.setAttribute('content', t.meta.description)
  }, [lang])

  const value = useMemo(
    () => ({ lang, setLang, t: dictionaries[lang] }),
    [lang],
  )

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
}

export function useLocale() {
  const ctx = useContext(LocaleContext)
  if (!ctx) throw new Error('useLocale must be used within LocaleProvider')
  return ctx
}
