import { useEffect, useState } from 'react'

export default function ScrollProgress() {
  const [pct, setPct] = useState(0)
  useEffect(() => {
    const fn = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight
      setPct(h > 0 ? (window.scrollY / h) * 100 : 0)
    }
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <div className="fixed top-[35px] left-0 right-0 h-px z-40 pointer-events-none bg-transparent">
      <div className="h-full bg-link" style={{ width: `${pct}%` }} />
    </div>
  )
}
