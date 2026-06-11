import { useEffect, useRef, useState } from 'react'

export default function Loader({ onComplete }) {
  const [pct, setPct]   = useState(0)
  const [done, setDone] = useState(false)
  const pctRef = useRef(null)

  useEffect(() => {
    let val = 0
    const id = setInterval(() => {
      val = Math.min(val + (val < 60 ? 1.8 : val < 90 ? 2.8 : 0.4), 100)
      setPct(Math.floor(val))
      if (val >= 100) { clearInterval(id); setTimeout(() => setDone(true), 300) }
    }, 24)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    if (done) { setTimeout(onComplete, 400) }
  }, [done, onComplete])

  if (done) return null

  return (
    <div className="fixed inset-0 z-[9999] bg-paper flex flex-col items-center justify-center gap-6">
      <span className="font-display text-5xl text-ink">runnp</span>
      <div className="w-48 border-t border-ink relative">
        <div className="absolute top-0 left-0 border-t-2 border-ink transition-none"
          style={{ width: `${pct}%`, marginTop: '-1px' }} />
      </div>
      <span className="font-mono text-xs text-mid">{String(pct).padStart(3,'0')}%</span>
    </div>
  )
}
