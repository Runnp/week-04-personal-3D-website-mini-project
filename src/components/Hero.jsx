import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import Scene from './Scene'
import Marquee from './Marquee'
import { useScramble, useTypewriter } from '../hooks/useTextEffects'

const ROLES = ['Computer Graphics', 'Animation', 'Research']

const TAG_VARIANTS = {
  hidden: { opacity: 0, y: 12 },
  visible: (i) => ({
    opacity: 1, y: 0,
    transition: { delay: 1.4 + i * 0.12, duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  }),
}

export default function Hero() {
  const lineRef  = useRef(null)
  const tagsRef  = useRef(null)
  const btnRef   = useRef(null)
  const metaRef  = useRef(null)
  const sceneRef = useRef(null)
  const nameRef  = useRef(null)
  const marqRef  = useRef(null)

  const { text: scrambledName, trigger } = useScramble('RUNNP', { delay: 300, speed: 55, scrambleCycles: 3 })
  const tagline = useTypewriter('Building stories through code, art and animation.', { delay: 1200, speed: 38 })

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.timeline({ defaults: { ease: 'power4.out' } })
        .fromTo(nameRef.current,  { opacity: 0, y: 40 },        { opacity: 1, y: 0, duration: 0.8, delay: 0.2 })
        .fromTo(lineRef.current,  { scaleX: 0, transformOrigin: 'left center' }, { scaleX: 1, duration: 0.6 }, '-=0.2')
        .fromTo(tagsRef.current,  { opacity: 0 },                { opacity: 1, duration: 0.4 }, '-=0.1')
        .fromTo(btnRef.current,   { opacity: 0, y: 16 },         { opacity: 1, y: 0, duration: 0.6 }, '-=0.1')
        .fromTo(metaRef.current,  { opacity: 0 },                { opacity: 1, duration: 0.8 }, '-=0.3')
        .fromTo(marqRef.current,  { opacity: 0 },                { opacity: 1, duration: 0.6 }, '-=0.4')
        .fromTo(sceneRef.current, { opacity: 0 },                { opacity: 1, duration: 1.4 }, 0.1)
    })
    return () => ctx.revert()
  }, [])

  return (
    <section id="hero" className="relative w-screen flex flex-col overflow-hidden bg-ink"
      style={{ minHeight: '100svh' }}>

      {/* Main split layout */}
      <div className="relative flex flex-1 min-h-0" style={{ minHeight: 'calc(100svh - 44px)' }}>

        {/* ── Left pane ── */}
        <div className="relative z-10 flex flex-col justify-between
                        w-full lg:w-1/2
                        px-6 sm:px-12 lg:px-16 xl:px-24
                        pt-24 pb-8 sm:pt-28 sm:pb-10">

          {/* Top meta */}
          <div ref={metaRef} style={{ opacity: 0 }} className="flex items-center gap-4 sm:gap-6">
            <span className="font-mono text-[0.6rem] sm:text-xs text-mist tracking-[0.2em] uppercase">runnp.art</span>
            <span className="hr-accent flex-1 max-w-[60px] sm:max-w-[80px]" />
            <span className="font-mono text-[0.6rem] sm:text-xs text-dim tracking-[0.15em] uppercase">
              Tashkent → Toronto
            </span>
          </div>

          {/* Center content */}
          <div className="flex flex-col gap-4 sm:gap-6 my-auto py-8">

            {/* Name */}
            <div ref={nameRef} style={{ opacity: 0 }} className="overflow-hidden">
              <h1
                className="font-display text-[clamp(4rem,15vw,9rem)] leading-none tracking-tight text-snow"
                onMouseEnter={trigger}
                data-cursor
              >
                {scrambledName}
              </h1>
            </div>

            {/* Gold line */}
            <div ref={lineRef} className="h-px w-full max-w-xs"
              style={{ background: 'linear-gradient(90deg, #c9a96e 0%, transparent 100%)', transform: 'scaleX(0)' }}
            />

            {/* Typewriter tagline */}
            <p className="font-body font-light text-pale text-[clamp(0.9rem,2.2vw,1.1rem)] max-w-sm leading-relaxed min-h-[3.5rem]">
              {tagline}<span className="blink text-accent">_</span>
            </p>

            {/* Role tags */}
            <div ref={tagsRef} style={{ opacity: 0 }} className="flex flex-wrap gap-2">
              {ROLES.map((role, i) => (
                <motion.span key={role} custom={i} initial="hidden" animate="visible" variants={TAG_VARIANTS}
                  className="font-mono text-[0.63rem] sm:text-[0.68rem] tracking-[0.18em] uppercase
                             px-3 py-1.5 border border-dim text-mist
                             hover:border-glow hover:text-accent transition-colors duration-300">
                  {role}
                </motion.span>
              ))}
            </div>

            {/* CTA */}
            <div ref={btnRef} style={{ opacity: 0 }} className="mt-2">
              <button data-cursor
                onClick={() => document.querySelector('#me')?.scrollIntoView({ behavior: 'smooth' })}
                className="group relative inline-flex items-center gap-3
                           font-body font-medium text-sm tracking-[0.12em] uppercase
                           text-ink bg-accent px-6 sm:px-8 py-3 sm:py-3.5
                           overflow-hidden transition-all duration-300 hover:bg-glow">
                <span className="relative z-10">View Journey</span>
                <svg className="relative z-10 w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1"
                  viewBox="0 0 14 14" fill="none">
                  <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="absolute inset-0 bg-white/10 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
              </button>
            </div>
          </div>

          {/* Bottom meta */}
          <div className="flex items-center gap-3">
            <span className="font-mono text-[0.58rem] text-dim tracking-widest uppercase">Phase II — 2025</span>
            <span className="block w-1 h-1 rounded-full bg-dim" />
            <span className="font-mono text-[0.58rem] text-dim tracking-widest uppercase hidden sm:inline">
              Nurmuhammad Mirzaahmadov
            </span>
          </div>
        </div>

        {/* ── Right pane — Three.js ── */}
        <div ref={sceneRef} style={{ opacity: 0 }}
          className="absolute inset-0 lg:relative lg:w-1/2 pointer-events-auto" aria-hidden="true">
          <div className="absolute inset-y-0 left-0 w-32 lg:w-40 z-10 pointer-events-none hidden lg:block"
            style={{ background: 'linear-gradient(90deg, #000 0%, transparent 100%)' }} />
          <Scene />
        </div>

        {/* Mobile vignette */}
        <div className="absolute inset-0 lg:hidden z-[5] pointer-events-none"
          style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.25) 50%, rgba(0,0,0,0.8) 100%)' }} />

        {/* Desktop corner decoration */}
        <div className="absolute bottom-8 right-8 z-20 hidden lg:flex flex-col items-end gap-1.5 opacity-30">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-px bg-pale" style={{ width: `${(i + 1) * 10}px` }} />
          ))}
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 hidden lg:flex flex-col items-center gap-2 opacity-25">
          <span className="font-mono text-[0.58rem] tracking-[0.25em] uppercase text-pale">Scroll</span>
          <div className="w-px h-7 bg-pale animate-pulse" />
        </div>
      </div>

      {/* ── Marquee ticker below hero ── */}
      <div ref={marqRef} style={{ opacity: 0 }}>
        <Marquee />
      </div>
    </section>
  )
}
