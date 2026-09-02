import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { ru } from './ru'
import { en } from './en'

const dictionaries = { ru, en }
const STORAGE_KEY = 'chinadao-lang'
const LocaleContext = createContext(null)

export function langFromPath(pathname = typeof window === 'undefined' ? '/' : window.location.pathname) {
  const path = pathname.replace(/\/+$/, '') || '/'
  return path === '/en' || path.startsWith('/en/') ? 'en' : 'ru'
}

export function pageFromPath(pathname = typeof window === 'undefined' ? '/' : window.location.pathname) {
  const path = pathname.replace(/\/+$/, '') || '/'
  return path === '/privacy' || path === '/en/privacy' ? 'privacy' : 'home'
}

export function pathForLang(lang) {
  return lang === 'en' ? '/en' : '/'
}

export function pathForPage(lang, page) {
  if (page === 'privacy') return lang === 'en' ? '/en/privacy' : '/privacy'
  return pathForLang(lang)
}

function readPath() {
  if (typeof window === 'undefined') return '/'
  stripLegacyWordpressParams()
  return window.location.pathname
}

function stripLegacyWordpressParams() {
  const url = new URL(window.location.href)
  url.searchParams.delete('page_id')
  url.searchParams.delete('p')
  const query = url.searchParams.toString()
  const next = `${url.pathname}${query ? `?${query}` : ''}${url.hash}`
  const current = `${window.location.pathname}${window.location.search}${window.location.hash}`
  if (next !== current) window.history.replaceState(null, '', next)
}

export function LocaleProvider({ children }) {
  const [path, setPath] = useState(readPath)
  const lang = langFromPath(path)
  const page = pageFromPath(path)

  const navigate = useCallback((nextPath) => {
    if (typeof window === 'undefined') return
    window.history.pushState(null, '', nextPath)
    setPath(nextPath)
    window.localStorage.setItem(STORAGE_KEY, langFromPath(nextPath))
  }, [])

  const setLang = useCallback((next) => {
    if (next !== 'ru' && next !== 'en') return
    const nextPath = pathForPage(next, pageFromPath(window.location.pathname))
    navigate(nextPath)
  }, [navigate])

  useEffect(() => {
    function onPop() {
      setPath(window.location.pathname)
    }
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  useEffect(() => {
    const t = dictionaries[lang]
    document.documentElement.lang = lang
    document.title = page === 'privacy' ? t.privacy.metaTitle : t.meta.title
  }, [lang, page])

  const value = useMemo(
    () => ({
      lang,
      page,
      setLang,
      navigate,
      t: dictionaries[lang],
      pathForLang,
      pathForPage,
    }),
    [lang, page, navigate, setLang],
  )

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
}

export function useLocale() {
  const ctx = useContext(LocaleContext)
  if (!ctx) throw new Error('useLocale must be used within LocaleProvider')
  return ctx
}
