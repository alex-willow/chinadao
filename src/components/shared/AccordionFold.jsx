import { useLayoutEffect, useRef } from 'react'
import './AccordionFold.css'

export default function AccordionFold({ open, duration = 400, children }) {
  const panelRef = useRef(null)
  const innerRef = useRef(null)
  const ready = useRef(false)

  useLayoutEffect(() => {
    const panel = panelRef.current
    const inner = innerRef.current
    if (!panel || !inner) return undefined

    const to = open ? inner.scrollHeight : 0
    panel.getAnimations().forEach((animation) => animation.cancel())

    if (!ready.current) {
      ready.current = true
      panel.style.height = open ? 'auto' : '0px'
      return undefined
    }

    const from = panel.getBoundingClientRect().height
    panel.style.height = `${from}px`
    const anim = panel.animate(
      [{ height: `${from}px` }, { height: `${to}px` }],
      { duration, easing: 'ease', fill: 'forwards' },
    )

    const finish = () => {
      panel.style.height = open ? 'auto' : '0px'
    }
    anim.addEventListener('finish', finish)
    return () => {
      anim.removeEventListener('finish', finish)
      anim.cancel()
    }
  }, [open, duration])

  return (
    <div ref={panelRef} className="accordion-fold" aria-hidden={!open}>
      <div ref={innerRef} className="accordion-fold__inner">
        {children}
      </div>
    </div>
  )
}
