import { useEffect, useState } from 'react'

export default function ScrollProgress() {
  const [pct, setPct] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const scrollTop    = window.scrollY
      const docHeight    = document.documentElement.scrollHeight - window.innerHeight
      const progress     = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0
      setPct(Math.min(progress, 100))
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] h-px pointer-events-none">
      <div
        className="h-full origin-left transition-none"
        style={{
          width: `${pct}%`,
          background: 'linear-gradient(90deg, #c9a96e, #e8d5b0)',
        }}
      />
    </div>
  )
}
