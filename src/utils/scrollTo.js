import { langFromPath, pageFromPath, pathForLang } from '../i18n/LocaleContext'

const SCROLL_KEY = 'chinadao-scroll'

export function rememberHomeScroll(href) {
  const target = !href || href === '#' ? '' : href.replace(/^#/, '')
  sessionStorage.setItem(SCROLL_KEY, target)
}

export function consumeHomeScroll() {
  const raw = sessionStorage.getItem(SCROLL_KEY)
  if (raw === null) return null
  sessionStorage.removeItem(SCROLL_KEY)
  return raw
}

export function scrollToHref(event, href, navigate) {
  if (!href || href.startsWith('#')) {
    event.preventDefault()
  }

  if (pageFromPath() === 'privacy') {
    event.preventDefault()
    const lang = langFromPath()
    rememberHomeScroll(href)
    navigate(pathForLang(lang))
    return
  }

  if (!href || href === '#') {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    history.replaceState(null, '', `${window.location.pathname}${window.location.search}`)
    return
  }

  if (!href.startsWith('#')) return

  const node = document.getElementById(href.slice(1))
  if (node) node.scrollIntoView({ behavior: 'smooth', block: 'start' })
  history.replaceState(null, '', `${window.location.pathname}${window.location.search}`)
}
