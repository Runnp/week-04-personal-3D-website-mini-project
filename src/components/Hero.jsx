import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import Scene from './Scene'
import { useScramble } from '../hooks/useTextEffects'

const STORY = [
  'Kid in Factory near CNC Machine',
  'Slightly Older Kid with Laptop doing Robotics',
  'Slightly Older Kid in Animation Studio watching Maya Courses',
  'Slightly Older Kid Doing 3D Stuff Alone in Quarantine',
  'Slightly Older Kid Winning Architecture Competition',
  'Slightly Older Kid Obsessed with Gaming',
  'Slightly Older Kid Receiving First Wacom Tablet',
  'Slightly Older Kid at Television Company Intern',
  'Slightly Older Kid General Artist at Professional Animation Studio',
  'Slightly Older Kid Obsessed with Reflecting, Storytelling, Writer\'s Journey',
  'Slightly Older Kid Got Into UofT with a Scholarship for CCIT',
]

export default function Hero() {
  const wrapRef  = useRef(null)
  const { text: name, trigger } = useScramble('RUNNP', { delay: 200, speed: 50, scrambleCycles: 3 })

  useEffect(() => {
    gsap.fromTo(wrapRef.current.querySelectorAll('.fade-in'),
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.06, ease: 'power2.out', delay: 0.1 }
    )
  }, [])

  return (
    <section id="hero" className="pt-9 min-h-screen bg-paper">

      {/* ── Top: name + 3D canvas ── */}
      <div className="max-w-5xl mx-auto px-4 sm:px-8 pt-8 pb-0">

        {/* Name row */}
        <div ref={wrapRef}>
          <div className="fade-in flex items-center gap-6 border-b border-ink pb-3 mb-6">
            <h1
              className="font-display text-[clamp(2.8rem,8vw,5.5rem)] leading-none text-ink select-none"
              onMouseEnter={trigger} data-cursor>
              {name}
            </h1>
            <span className="font-mono text-xs text-mid hidden sm:inline">
              — computer graphics. animation. research.
            </span>
          </div>

          {/* Two-col: storytelling left, canvas right */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 items-start">

            {/* Storytelling list */}
            <div className="fade-in border-r-0 lg:border-r border-rule pr-0 lg:pr-8">
              <p className="font-mono text-[0.65rem] text-mid uppercase tracking-widest mb-3">
                — Storytelling
              </p>
              <ol className="list-none flex flex-col gap-0">
                {STORY.map((line, i) => (
                  <li key={i}
                    className="fade-in font-mono text-[0.75rem] sm:text-[0.82rem] text-ink leading-snug
                               border-b border-rule py-1.5 flex gap-3 items-baseline
                               hover:text-link transition-colors duration-100 cursor-default"
                    data-cursor>
                    <span className="text-rule shrink-0 tabular-nums text-[0.65rem]">
                      {String(i+1).padStart(2,'0')}.
                    </span>
                    {line}
                  </li>
                ))}
              </ol>
            </div>

            {/* 3D Canvas — right col */}
            <div className="fade-in relative h-[320px] sm:h-[420px] lg:h-full min-h-[320px]
                            overflow-hidden border-t lg:border-t-0 border-rule mt-6 lg:mt-0">
              {/* 3D canvas behind */}
              <div className="absolute inset-0">
                <Scene />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="max-w-5xl mx-auto px-4 sm:px-8 mt-6 pb-8">
        <div className="border-t border-ink pt-3 flex flex-wrap items-center gap-x-6 gap-y-1">
          <span className="font-mono text-[0.65rem] text-mid">Nurmuhammad Mirzaahmadov</span>
          <span className="font-mono text-[0.65rem] text-mid">Tashkent, Uzbekistan</span>
          <span className="font-mono text-[0.65rem] text-mid">→ University of Toronto - Toronto, Canada</span>
          <span className="font-mono text-[0.65rem] text-link ml-auto hidden sm:inline">
            <a href="#me">read more ↓</a>
          </span>
        </div>
      </div>
    </section>
  )
}
