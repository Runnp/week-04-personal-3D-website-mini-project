import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'

function scrambleTo(el, target, duration = 600) {
  let start = null
  const total = target.length

  const step = (ts) => {
    if (!start) start = ts
    const progress = Math.min((ts - start) / duration, 1)
    const revealed = Math.floor(progress * total)

    el.textContent = target
      .split('')
      .map((char, i) => {
        if (char === ' ') return ' '
        if (i < revealed) return char
        return CHARS[Math.floor(Math.random() * CHARS.length)]
      })
      .join('')

    if (progress < 1) requestAnimationFrame(step)
    else el.textContent = target
  }

  requestAnimationFrame(step)
}

export default function Loader({ onComplete }) {
  const [progress, setProgress]   = useState(0)
  const [phase, setPhase]         = useState('loading') // loading | reveal | done
  const overlayRef  = useRef(null)
  const nameRef     = useRef(null)
  const barRef      = useRef(null)
  const pctRef      = useRef(null)
  const lineTopRef  = useRef(null)
  const lineBotRef  = useRef(null)

  // Simulate asset loading progress
  useEffect(() => {
    let val = 0
    const id = setInterval(() => {
      // Accelerate slowly at first, fast in middle, pause near 100
      const step = val < 40 ? 1.2 : val < 80 ? 2.5 : val < 95 ? 0.6 : 0.2
      val = Math.min(val + step, 100)
      setProgress(Math.floor(val))
      if (pctRef.current) pctRef.current.textContent = String(Math.floor(val)).padStart(3, '0')
      if (val >= 100) {
        clearInterval(id)
        setTimeout(() => setPhase('reveal'), 200)
      }
    }, 28)
    return () => clearInterval(id)
  }, [])

  // Reveal phase — scramble name then exit
  useEffect(() => {
    if (phase !== 'reveal') return
    if (nameRef.current) scrambleTo(nameRef.current, 'RUNNP', 700)

    const tl = gsap.timeline({
      onComplete: () => setPhase('done'),
    })

    tl.to(barRef.current,     { scaleX: 1, duration: 0.4, ease: 'power2.inOut' })
      .to(pctRef.current,     { opacity: 0, duration: 0.2 }, '-=0.1')
      .to(lineTopRef.current, { scaleX: 0, duration: 0.5, ease: 'power3.inOut' }, '+=0.3')
      .to(lineBotRef.current, { scaleX: 0, duration: 0.5, ease: 'power3.inOut' }, '-=0.5')
      .to(nameRef.current,    { y: -8, opacity: 0, duration: 0.4, ease: 'power2.in' }, '-=0.2')
      .to(overlayRef.current, { yPercent: -100, duration: 0.85, ease: 'power4.inOut' }, '-=0.1')
  }, [phase])

  // Done — unmount
  useEffect(() => {
    if (phase === 'done') {
      const t = setTimeout(onComplete, 50)
      return () => clearTimeout(t)
    }
  }, [phase, onComplete])

  if (phase === 'done') return null

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-ink"
    >
      {/* Top line */}
      <div
        ref={lineTopRef}
        className="absolute top-0 left-0 right-0 h-px origin-left"
        style={{ background: 'linear-gradient(90deg, transparent, #c9a96e, transparent)', transform: 'scaleX(1)' }}
      />

      {/* Center content */}
      <div className="flex flex-col items-center gap-8">
        {/* Name */}
        <h1
          ref={nameRef}
          className="font-display text-[clamp(3.5rem,12vw,8rem)] leading-none tracking-tight text-snow select-none"
        >
          RUNNP
        </h1>

        {/* Progress bar */}
        <div className="w-48 sm:w-64 h-px bg-ghost relative overflow-hidden">
          <div
            ref={barRef}
            className="absolute inset-0 origin-left"
            style={{
              background: 'linear-gradient(90deg, #c9a96e, #e8d5b0)',
              transform: `scaleX(${progress / 100})`,
              transition: 'transform 0.1s linear',
            }}
          />
        </div>

        {/* Percentage */}
        <span
          ref={pctRef}
          className="font-mono text-[0.7rem] tracking-[0.3em] text-mist tabular-nums"
        >
          {String(progress).padStart(3, '0')}
        </span>

        {/* Label */}
        <span className="font-mono text-[0.6rem] tracking-[0.25em] uppercase text-dim">
          Loading experience
        </span>
      </div>

      {/* Bottom line */}
      <div
        ref={lineBotRef}
        className="absolute bottom-0 left-0 right-0 h-px origin-right"
        style={{ background: 'linear-gradient(90deg, transparent, #c9a96e, transparent)', transform: 'scaleX(1)' }}
      />

      {/* Corner labels */}
      <span className="absolute bottom-8 left-8 font-mono text-[0.6rem] tracking-widest uppercase text-dim">
        runnp.art
      </span>
      <span className="absolute bottom-8 right-8 font-mono text-[0.6rem] tracking-widest uppercase text-dim">
        Tashkent
      </span>
    </div>
  )
}
