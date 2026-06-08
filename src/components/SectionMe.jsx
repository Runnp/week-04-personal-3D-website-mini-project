import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion } from 'framer-motion'

gsap.registerPlugin(ScrollTrigger)

const FACTS = [
  { num: '2020', label: 'Started CG journey' },
  { num: 'UofT',  label: 'Incoming student' },
  { num: '3D+',   label: 'Art, code & story' },
]

const SKILLS = [
  { name: 'Maya',       cat: 'DCC',       level: 90 },
  { name: 'Blender',    cat: 'DCC',       level: 85 },
  { name: 'Houdini',    cat: 'VFX',       level: 70 },
  { name: 'Nuke',       cat: 'VFX',       level: 60 },
  { name: 'Unity',      cat: 'Realtime',  level: 80 },
  { name: 'Unreal',     cat: 'Realtime',  level: 65 },
  { name: 'GLSL/HLSL',  cat: 'Code',      level: 78 },
  { name: 'Python',     cat: 'Code',      level: 82 },
  { name: 'React / R3F',cat: 'Code',      level: 75 },
  { name: 'Three.js',   cat: 'Code',      level: 73 },
  { name: 'Rigging',    cat: 'Animation', level: 85 },
  { name: 'Compositing',cat: 'DCC',       level: 68 },
]

const CATS = ['All', 'DCC', 'VFX', 'Realtime', 'Code', 'Animation']

const CAT_COLORS = {
  DCC:       '#c9a96e',
  VFX:       '#6090c0',
  Realtime:  '#8aba9a',
  Code:      '#b88be0',
  Animation: '#e07878',
}

function RevealLine({ children, delay = 0, className = '' }) {
  const ref = useRef(null)
  useEffect(() => {
    gsap.fromTo(ref.current,
      { opacity: 0, y: 36 },
      { opacity: 1, y: 0, duration: 0.85, delay,
        ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 88%', once: true } }
    )
  }, [delay])
  return <div ref={ref} style={{ opacity: 0 }} className={className}>{children}</div>
}

function SkillBar({ skill, visible }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="group flex flex-col gap-1.5 p-3 border border-ghost
                 hover:border-opacity-60 transition-all duration-300"
      style={{ '--accent': CAT_COLORS[skill.cat] }}
      data-cursor
    >
      <div className="flex items-center justify-between">
        <span className="font-mono text-[0.65rem] tracking-wider uppercase text-pale group-hover:text-snow transition-colors">
          {skill.name}
        </span>
        <span className="font-mono text-[0.55rem] tracking-widest uppercase text-dim"
          style={{ color: CAT_COLORS[skill.cat] }}>
          {skill.cat}
        </span>
      </div>
      <div className="h-px bg-ghost relative overflow-hidden">
        <motion.div
          className="absolute inset-y-0 left-0"
          initial={{ width: 0 }}
          animate={visible ? { width: `${skill.level}%` } : { width: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          style={{ background: CAT_COLORS[skill.cat] }}
        />
      </div>
    </motion.div>
  )
}

export default function SectionMe() {
  const sectionRef = useRef(null)
  const imgRef     = useRef(null)
  const gridRef    = useRef(null)
  const [activeFilter, setActiveFilter] = useState('All')
  const [gridVisible, setGridVisible]   = useState(false)

  const filtered = activeFilter === 'All'
    ? SKILLS
    : SKILLS.filter(s => s.cat === activeFilter)

  useEffect(() => {
    gsap.to(imgRef.current, {
      y: -60, ease: 'none',
      scrollTrigger: { trigger: sectionRef.current, start: 'top bottom', end: 'bottom top', scrub: 1.5 },
    })

    ScrollTrigger.create({
      trigger: gridRef.current,
      start: 'top 85%',
      once: true,
      onEnter: () => setGridVisible(true),
    })
  }, [])

  return (
    <section id="me" ref={sectionRef}
      className="relative bg-ash overflow-hidden py-24 sm:py-32 px-6 sm:px-12 lg:px-24">

      <span className="absolute top-12 right-8 font-display text-[clamp(6rem,18vw,14rem)]
                       text-ghost leading-none select-none pointer-events-none">
        01
      </span>

      <div className="relative z-10 max-w-6xl mx-auto w-full flex flex-col gap-20 lg:gap-24">

        {/* Top: origin story */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">

          {/* Text */}
          <div className="flex flex-col gap-7">
            <RevealLine>
              <span className="font-mono text-xs tracking-[0.25em] uppercase text-glow">Origin</span>
            </RevealLine>
            <RevealLine delay={0.05}>
              <h2 className="font-display text-[clamp(2.8rem,7vw,5.5rem)] leading-[0.92] text-snow">
                WHERE IT<br /><span className="text-accent">BEGINS</span>
              </h2>
            </RevealLine>
            <RevealLine delay={0.1}><span className="hr-accent" /></RevealLine>
            <RevealLine delay={0.15}>
              <p className="font-body font-light text-pale text-[1.05rem] leading-[1.85] max-w-md">
                From Tashkent, Uzbekistan — I grew up at the intersection of art and engineering.
                The moment I first saw light bounce off a rendered surface, I knew this was the
                language I wanted to speak.
              </p>
            </RevealLine>
            <RevealLine delay={0.2}>
              <p className="font-body font-light text-mist text-[0.95rem] leading-[1.85] max-w-md">
                I work across computer graphics, animation, technical art, and research — treating
                each as a chapter in a longer story. Now heading to the University of Toronto
                to keep writing it.
              </p>
            </RevealLine>
            <RevealLine delay={0.25}>
              <div className="flex gap-6 sm:gap-8 mt-2 border-t border-ghost pt-7">
                {FACTS.map(({ num, label }) => (
                  <div key={num} className="flex flex-col gap-1">
                    <span className="font-display text-2xl sm:text-3xl text-accent">{num}</span>
                    <span className="font-mono text-[0.6rem] tracking-[0.15em] uppercase text-mist">{label}</span>
                  </div>
                ))}
              </div>
            </RevealLine>
          </div>

          {/* Decorative card */}
          <div ref={imgRef} className="relative hidden lg:block">
            <div className="relative w-full aspect-[3/4] border border-ghost">
              <div className="absolute inset-4"
                style={{ background: 'radial-gradient(ellipse at 30% 40%, rgba(201,169,110,0.15) 0%, rgba(96,144,192,0.08) 50%, transparent 80%)', border: '1px solid rgba(201,169,110,0.12)' }} />
              {[...Array(5)].map((_, i) => (
                <div key={i} className="absolute left-4 right-4 h-px"
                  style={{ top: `${20 + i * 15}%`, background: 'rgba(255,255,255,0.04)' }} />
              ))}
              {['top-0 left-0', 'top-0 right-0', 'bottom-0 left-0', 'bottom-0 right-0'].map((pos) => (
                <span key={pos} className={`absolute ${pos} w-5 h-5`}
                  style={{
                    borderTop:    pos.includes('top')    ? '1px solid #c9a96e' : 'none',
                    borderBottom: pos.includes('bottom') ? '1px solid #c9a96e' : 'none',
                    borderLeft:   pos.includes('left')   ? '1px solid #c9a96e' : 'none',
                    borderRight:  pos.includes('right')  ? '1px solid #c9a96e' : 'none',
                  }} />
              ))}
              <div className="absolute bottom-8 left-8">
                <span className="font-mono text-[0.65rem] tracking-[0.2em] uppercase text-glow">Tashkent, Uzbekistan</span>
              </div>
              <div className="absolute top-8 right-8 border border-dim px-3 py-1.5">
                <span className="font-mono text-[0.6rem] tracking-widest uppercase text-mist">Artist / Researcher</span>
              </div>
            </div>
            <div className="absolute -bottom-3 -right-3 w-full h-full border border-ghost -z-10" />
          </div>
        </div>

        {/* Bottom: skills grid */}
        <div ref={gridRef} className="flex flex-col gap-8">
          <RevealLine>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div className="flex flex-col gap-2">
                <span className="font-mono text-xs tracking-[0.25em] uppercase text-glow">Toolkit</span>
                <h3 className="font-display text-[clamp(1.8rem,4vw,3rem)] leading-none text-snow">
                  SKILLS &amp; <span className="text-accent">TOOLS</span>
                </h3>
              </div>
              {/* Filter pills */}
              <div className="flex flex-wrap gap-2">
                {CATS.map(cat => (
                  <button key={cat} data-cursor
                    onClick={() => setActiveFilter(cat)}
                    className={`font-mono text-[0.6rem] tracking-[0.18em] uppercase px-3 py-1.5 border transition-all duration-200
                      ${activeFilter === cat
                        ? 'border-glow text-accent bg-glow/10'
                        : 'border-ghost text-dim hover:border-dim hover:text-mist'}`}>
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </RevealLine>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
            {filtered.map((skill) => (
              <SkillBar key={skill.name} skill={skill} visible={gridVisible} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
