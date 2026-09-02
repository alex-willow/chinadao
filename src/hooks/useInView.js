import { useEffect, useRef, useState } from 'react'

export default function useInView(options = {}) {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)
  const once = options.once !== false

  useEffect(() => {
    const node = ref.current
    if (!node) return undefined

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          if (once) observer.disconnect()
        } else if (!once) {
          setIsVisible(false)
        }
      },
      { threshold: options.threshold ?? 0, rootMargin: options.rootMargin ?? '25% 0px' },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [once, options.threshold, options.rootMargin])

  return [ref, isVisible]
}
