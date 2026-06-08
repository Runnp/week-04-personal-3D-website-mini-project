import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion, AnimatePresence } from 'framer-motion'
import ProjectModal from './ProjectModal'

gsap.registerPlugin(ScrollTrigger)

const PROJECTS = [
  { id: 1, title: 'Character Rig',  subtitle: 'Skeletal Animation', year: '2024', tags: ['Maya', 'Rigging', 'Character'], desc: 'Full body character rig with facial blendshapes and dynamic cloth simulation. Built for real-time pipeline compatibility.', color: '#c9a96e' },
  { id: 2, title: 'Fluid Sim',      subtitle: 'VFX / Houdini',      year: '2024', tags: ['Houdini', 'FLIP', 'VFX'],       desc: 'High-resolution fluid simulation driven by custom velocity fields. Rendered with Mantra for cinematic realism.',      color: '#6090c0' },
  { id: 3, title: 'Short Film',     subtitle: 'Animated Narrative',  year: '2023', tags: ['Blender', 'Cycles', 'Story'],   desc: 'A silent short exploring memory and place, set in an imagined version of Tashkent. Full CG environment.',           color: '#9b8bb4' },
  { id: 4, title: 'Shader Pack',    subtitle: 'Technical Art',       year: '2024', tags: ['GLSL', 'Unity', 'HLSL'],        desc: 'Stylised surface shaders inspired by cel-shading and ink wash painting. Designed for real-time use in games.',     color: '#8aba9a' },
]

function ProjectCard({ project, index, onClick }) {
  const [hovered, setHovered] = useState(false)
  const cardRef = useRef(null)

  useEffect(() => {
    gsap.fromTo(cardRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.75, delay: index * 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: cardRef.current, start: 'top 90%', once: true } }
    )
  }, [index])

  return (
    <div ref={cardRef} style={{ opacity: 0 }}
      className="relative border border-ghost overflow-hidden group cursor-none
                 transition-border duration-500 hover:border-opacity-60"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onClick(project)}
      data-cursor
    >
      {/* Preview area */}
      <div className="aspect-[16/10] relative overflow-hidden"
        style={{ background: `radial-gradient(ellipse at 40% 50%, ${project.color}22 0%, #0a0a0a 70%)` }}>
        <div className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }} />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-display text-[5rem] leading-none select-none"
            style={{ color: `${project.color}30` }}>
            {String(project.id).padStart(2, '0')}
          </span>
        </div>
        <div className="absolute top-4 right-4 font-mono text-[0.6rem] tracking-widest uppercase text-dim border border-ghost px-2 py-1">
          {project.year}
        </div>

        {/* Hover overlay */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 flex flex-col items-end justify-end p-5 gap-3"
              style={{ background: 'linear-gradient(0deg, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.3) 100%)' }}>
              <p className="font-body font-light text-pale text-sm leading-relaxed self-start">
                {project.desc}
              </p>
              <span className="font-mono text-[0.6rem] tracking-[0.2em] uppercase text-accent border border-accent/40 px-3 py-1.5">
                Click to expand →
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer */}
      <div className="p-5 flex items-start justify-between gap-4 bg-fog">
        <div className="flex flex-col gap-1.5">
          <h3 className="font-display text-xl text-snow tracking-wide">{project.title}</h3>
          <span className="font-mono text-[0.65rem] tracking-[0.18em] uppercase text-mist">{project.subtitle}</span>
          <div className="flex gap-1.5 mt-2 flex-wrap">
            {project.tags.map(tag => (
              <span key={tag} className="font-mono text-[0.58rem] tracking-wider uppercase px-2 py-0.5 border border-ghost text-dim">
                {tag}
              </span>
            ))}
          </div>
        </div>
        <motion.div animate={{ x: hovered ? 3 : 0 }} transition={{ duration: 0.25 }} className="mt-1 shrink-0">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M3 9h12M10 4l5 5-5 5" stroke="#c9a96e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.div>
      </div>

      {/* Color sweep */}
      <div className="absolute bottom-0 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-500"
        style={{ background: project.color }} />
    </div>
  )
}

export default function SectionAnimation() {
  const headingRef = useRef(null)
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    gsap.fromTo(headingRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: headingRef.current, start: 'top 85%', once: true } }
    )
  }, [])

  return (
    <>
      <section id="animation"
        className="relative min-h-screen bg-ink py-24 sm:py-32 px-6 sm:px-12 lg:px-24 overflow-hidden">

        <span className="absolute top-12 right-8 font-display text-[clamp(6rem,18vw,14rem)]
                         text-ghost leading-none select-none pointer-events-none">
          02
        </span>

        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="mb-14 flex flex-col gap-5">
            <span className="font-mono text-xs tracking-[0.25em] uppercase text-glow">Selected Work</span>
            <h2 ref={headingRef} style={{ opacity: 0 }}
              className="font-display text-[clamp(2.8rem,7vw,5.5rem)] leading-[0.92] text-snow">
              ANIMATION<br /><span className="text-accent">&amp; ART</span>
            </h2>
            <span className="hr-accent" />
            <p className="font-body font-light text-mist text-sm max-w-md leading-relaxed">
              A selection of personal and professional work spanning character animation,
              VFX, technical art, and real-time shaders. Click any card for details.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            {PROJECTS.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} onClick={setSelected} />
            ))}
          </div>

          <div className="mt-10 flex items-center gap-4 opacity-40">
            <span className="hr-accent" />
            <span className="font-mono text-[0.65rem] tracking-widest uppercase text-mist">
              More work available on request
            </span>
          </div>
        </div>
      </section>

      {/* Modal */}
      {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
    </>
  )
}
