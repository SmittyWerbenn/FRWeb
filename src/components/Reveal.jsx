import { useEffect, useRef, useState } from 'react'

/** Fade + naik halus saat section masuk viewport. Tanpa IntersectionObserver / reduced-motion → langsung tampil. */
export default function Reveal({ children, className = '', delay = 0 }) {
  const ref = useRef(null)
  const [shown, setShown] = useState(() => {
    if (typeof window === 'undefined') return true
    if (typeof IntersectionObserver === 'undefined') return true
    return window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false
  })

  useEffect(() => {
    if (shown) return undefined
    const node = ref.current
    if (!node) return undefined
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShown(true)
          observer.disconnect()
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.04 },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [shown])

  return (
    <div
      ref={ref}
      className={`reveal ${shown ? 'reveal-in' : ''} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  )
}
