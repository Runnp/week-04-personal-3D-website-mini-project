import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import Scene from './Scene'

const ROLES = ['Computer Graphics', 'Animation', 'Research']

const TAG_VARIANTS = {
  hidden: { opacity: 0, y: 12 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 1.1 + i * 0.12, duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  }),
}

export default function Hero() {
  const nameRef    = useRef(null)
  const lineRef    = useRef(null)
  const subRef     = useRef(null)
  const tagsRef    = useRef(null)
  const btnRef     = useRef(null)
  const metaRef    = useRef(null)
  const sceneRef   = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })

      tl.fromTo(nameRef.current,
        { opacity: 0, y: 60, skewY: 4 },
        { opacity: 1, y: 0, skewY: 0, duration: 1.1 }
      )
      .fromTo(lineRef.current,
        { scaleX: 0, transformOrigin: 'left center' },
        { scaleX: 1, duration: 0.6 },
        '-=0.4'
      )
      .fromTo(subRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7 },
        '-=0.3'
      )
      .fromTo(tagsRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.4 },
        '-=0.3'
      )
      .fromTo(btnRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.6 },
        '-=0.1'
      )
      .fromTo(metaRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.8 },
        '-=0.2'
      )
      .fromTo(sceneRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1.4 },
        0.2
      )
    })

    return () => ctx.revert()
  }, [])

  return (
    <section className="relative w-full h-full flex overflow-hidden bg-ink">

      {/* ── Left pane ── */}
      <div className="relative z-10 flex flex-col justify-between
                      w-full lg:w-1/2
                      px-8 sm:px-12 lg:px-16 xl:px-24
                      py-10 sm:py-14">

        {/* Top meta */}
        <div ref={metaRef} className="opacity-0 flex items-center gap-6">
          <span className="font-mono text-xs text-mist tracking-[0.2em] uppercase">
            runnp.art
          </span>
          <span className="hr-accent flex-1 max-w-[80px]" />
          <span className="font-mono text-xs text-dim tracking-[0.15em] uppercase">
            Tashkent → Toronto
          </span>
        </div>

        {/* Center content */}
        <div className="flex flex-col gap-6">

          {/* Name */}
          <div className="overflow-hidden">
            <h1
              ref={nameRef}
              className="opacity-0 font-display text-[clamp(4.5rem,12vw,9rem)]
                         leading-none tracking-tight text-snow"
            >
              RUNNP
            </h1>
          </div>

          {/* Gold line */}
          <div
            ref={lineRef}
            className="h-px w-full max-w-xs"
            style={{ background: 'linear-gradient(90deg, #c9a96e 0%, transparent 100%)', transform: 'scaleX(0)' }}
          />

          {/* Tagline */}
          <p
            ref={subRef}
            className="opacity-0 font-body font-light text-pale
                       text-[clamp(0.95rem,1.8vw,1.15rem)]
                       max-w-sm leading-relaxed"
          >
            Building stories through{' '}
            <em className="not-italic text-accent">code</em>,{' '}
            <em className="not-italic text-accent">art</em> and{' '}
            <em className="not-italic text-accent">animation</em>.
          </p>

          {/* Role tags */}
          <div ref={tagsRef} className="opacity-0 flex flex-wrap gap-2 mt-1">
            {ROLES.map((role, i) => (
              <motion.span
                key={role}
                custom={i}
                initial="hidden"
                animate="visible"
                variants={TAG_VARIANTS}
                className="font-mono text-[0.68rem] tracking-[0.18em] uppercase
                           px-3 py-1.5 border border-dim text-mist
                           hover:border-glow hover:text-accent
                           transition-colors duration-300"
              >
                {role}
              </motion.span>
            ))}
          </div>

          {/* CTA Button */}
          <div ref={btnRef} className="opacity-0 mt-4">
            <button
              data-cursor
              className="group relative inline-flex items-center gap-3
                         font-body font-medium text-sm tracking-[0.12em] uppercase
                         text-ink bg-accent
                         px-8 py-3.5
                         overflow-hidden
                         transition-all duration-300
                         hover:bg-glow"
            >
              <span className="relative z-10">View Journey</span>
              <svg
                className="relative z-10 w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1"
                viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              {/* Hover ripple */}
              <span className="absolute inset-0 bg-white/10 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
            </button>
          </div>
        </div>

        {/* Bottom meta */}
        <div ref={metaRef} className="flex items-center gap-4">
          <span className="font-mono text-[0.65rem] text-dim tracking-widest uppercase">
            Phase I — 2024
          </span>
          <span className="block w-1 h-1 rounded-full bg-dim" />
          <span className="font-mono text-[0.65rem] text-dim tracking-widest uppercase">
            Nurmuhammad Mirzaahmadov
          </span>
        </div>
      </div>

      {/* ── Right pane — Three.js canvas ── */}
      <div
        ref={sceneRef}
        className="opacity-0 absolute inset-0 lg:relative lg:w-1/2 pointer-events-auto"
        aria-hidden="true"
      >
        {/* Gradient fade between panes */}
        <div className="absolute inset-y-0 left-0 w-40 z-10 pointer-events-none
                        lg:block hidden"
          style={{ background: 'linear-gradient(90deg, #000 0%, transparent 100%)' }}
        />
        <Scene />
      </div>

      {/* Mobile canvas vignette overlay so text stays readable */}
      <div className="absolute inset-0 lg:hidden z-[5] pointer-events-none"
        style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.75) 100%)' }}
      />

      {/* Corner decoration */}
      <div className="absolute bottom-8 right-8 z-20 hidden lg:flex flex-col items-end gap-1.5 opacity-30">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="h-px bg-pale"
            style={{ width: `${(i + 1) * 10}px` }}
          />
        ))}
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20
                      hidden lg:flex flex-col items-center gap-2 opacity-25">
        <span className="font-mono text-[0.6rem] tracking-[0.25em] uppercase text-pale">Scroll</span>
        <div className="w-px h-8 bg-pale animate-pulse" />
      </div>
    </section>
  )
}
