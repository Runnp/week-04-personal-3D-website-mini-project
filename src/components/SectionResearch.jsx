import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion } from 'framer-motion'

gsap.registerPlugin(ScrollTrigger)

const RESEARCH = [
  {
    id: 1,
    type: 'Research',
    title: 'Procedural Terrain Generation Using Noise Functions',
    desc: 'An exploration of layered Perlin and Simplex noise for real-time terrain synthesis, with applications in game environments.',
    tags: ['CG', 'Procedural', 'Terrain'],
    year: '2024',
  },
  {
    id: 2,
    type: 'Research',
    title: 'NPR Rendering Techniques for Stylised Animation',
    desc: 'Survey of non-photorealistic rendering methods — cel shading, contour lines, hatching — and their aesthetic implications.',
    tags: ['NPR', 'Shaders', 'Rendering'],
    year: '2024',
  },
]

const BLOG = [
  {
    id: 3,
    type: 'Blog',
    title: 'Why Studio Ghibli Backgrounds Feel Infinite',
    desc: 'A visual analysis of how Kazuo Oga\'s background paintings use atmospheric perspective and layered depth to suggest boundless worlds.',
    tags: ['Analysis', 'Ghibli', 'Art Direction'],
    year: '2024',
  },
  {
    id: 4,
    type: 'Blog',
    title: 'Learning R3F: Three.js for React Developers',
    desc: 'Notes from rebuilding my portfolio in React Three Fiber — what clicks, what doesn\'t, and why the declarative model changes everything.',
    tags: ['R3F', 'Three.js', 'Dev'],
    year: '2025',
  },
  {
    id: 5,
    type: 'Blog',
    title: 'The Technical Art Pipeline: Bridging Artists and Engineers',
    desc: 'How technical artists translate between creative vision and engine constraints — and why this role is one of the most interesting in the industry.',
    tags: ['Technical Art', 'Pipeline', 'Industry'],
    year: '2025',
  },
]

const TYPE_COLORS = {
  Research: '#c9a96e',
  Blog: '#6090c0',
}

function Entry({ item, index }) {
  const ref = useRef(null)

  useEffect(() => {
    gsap.fromTo(ref.current,
      { opacity: 0, x: -24 },
      {
        opacity: 1, x: 0, duration: 0.7,
        delay: index * 0.08,
        ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 90%', once: true },
      }
    )
  }, [index])

  return (
    <motion.div
      ref={ref}
      style={{ opacity: 0 }}
      whileHover={{ x: 6 }}
      transition={{ duration: 0.25 }}
      className="group flex gap-6 py-7 border-b border-ghost cursor-default"
      data-cursor
    >
      {/* Left meta */}
      <div className="hidden sm:flex flex-col items-end gap-1 min-w-[5rem] pt-0.5">
        <span className="font-mono text-[0.6rem] tracking-widest uppercase text-dim">{item.year}</span>
        <span className="font-mono text-[0.6rem] tracking-widest uppercase"
          style={{ color: TYPE_COLORS[item.type] }}>
          {item.type}
        </span>
      </div>

      {/* Divider dot */}
      <div className="hidden sm:flex flex-col items-center pt-1.5">
        <div className="w-1.5 h-1.5 rounded-full mt-1"
          style={{ background: TYPE_COLORS[item.type] }} />
        <div className="w-px flex-1 mt-2" style={{ background: 'rgba(255,255,255,0.06)' }} />
      </div>

      {/* Content */}
      <div className="flex flex-col gap-2 flex-1">
        <h3 className="font-body font-medium text-snow text-base leading-snug
                       group-hover:text-accent transition-colors duration-300">
          {item.title}
        </h3>
        <p className="font-body font-light text-mist text-sm leading-relaxed max-w-2xl">
          {item.desc}
        </p>
        <div className="flex gap-2 flex-wrap mt-1">
          {item.tags.map(t => (
            <span key={t}
              className="font-mono text-[0.58rem] tracking-wider uppercase px-2 py-0.5 border border-ghost text-dim">
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Arrow */}
      <div className="self-start pt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M2 8h12M9 3l5 5-5 5" stroke="#c9a96e" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </motion.div>
  )
}

export default function SectionResearch() {
  const headingRef = useRef(null)

  useEffect(() => {
    gsap.fromTo(headingRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: headingRef.current, start: 'top 85%', once: true } }
    )
  }, [])

  const all = [...RESEARCH, ...BLOG]

  return (
    <section id="research"
      className="relative bg-ash py-28 px-6 sm:px-12 lg:px-24 overflow-hidden"
    >
      {/* Section index */}
      <span className="absolute top-12 right-8 font-display text-[clamp(6rem,18vw,14rem)]
                       text-ghost leading-none select-none pointer-events-none">
        03
      </span>

      <div className="relative z-10 max-w-5xl mx-auto">

        {/* Header */}
        <div className="mb-16 flex flex-col gap-5">
          <span className="font-mono text-xs tracking-[0.25em] uppercase text-glow">
            Research &amp; Writing
          </span>
          <h2 ref={headingRef} style={{ opacity: 0 }}
            className="font-display text-[clamp(2.8rem,7vw,5.5rem)] leading-[0.92] text-snow">
            IDEAS &amp;<br /><span className="text-accent">WORDS</span>
          </h2>
          <span className="hr-accent" />
          <p className="font-body font-light text-mist text-sm max-w-md leading-relaxed">
            Papers, essays, and notes from the intersection of computer graphics,
            storytelling, and technical art.
          </p>
        </div>

        {/* Legend */}
        <div className="flex gap-6 mb-2 pl-0 sm:pl-28">
          {Object.entries(TYPE_COLORS).map(([label, color]) => (
            <div key={label} className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: color }} />
              <span className="font-mono text-[0.6rem] tracking-widest uppercase" style={{ color }}>
                {label}
              </span>
            </div>
          ))}
        </div>

        {/* Entries */}
        <div className="border-t border-ghost">
          {all.map((item, i) => (
            <Entry key={item.id} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
