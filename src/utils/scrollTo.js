export function scrollToHref(event, href) {
  if (!href || href.startsWith('#')) {
    event.preventDefault()
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
