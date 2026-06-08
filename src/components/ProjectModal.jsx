import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function ProjectModal({ project, onClose }) {
  // Lock body scroll while open
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [onClose])

  if (!project) return null

  return (
    <AnimatePresence>
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-8"
        style={{ background: 'rgba(0,0,0,0.92)', backdropFilter: 'blur(8px)' }}
        onClick={onClose}
      >
        <motion.div
          key="panel"
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.98 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full max-w-3xl border border-ghost bg-fog overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header preview area */}
          <div className="relative w-full aspect-[16/7] overflow-hidden"
            style={{ background: `radial-gradient(ellipse at 40% 50%, ${project.color}28 0%, #0a0a0a 65%)` }}>

            {/* Grid */}
            <div className="absolute inset-0 opacity-15"
              style={{
                backgroundImage: `linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px),
                                  linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)`,
                backgroundSize: '32px 32px',
              }} />

            {/* Project number */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-display text-[8rem] leading-none select-none"
                style={{ color: `${project.color}20` }}>
                {String(project.id).padStart(2, '0')}
              </span>
            </div>

            {/* Year badge */}
            <div className="absolute top-5 left-5 font-mono text-[0.62rem] tracking-widest uppercase text-dim border border-ghost px-2.5 py-1.5 bg-ink/60">
              {project.year}
            </div>

            {/* Status badge */}
            <div className="absolute top-5 right-14 font-mono text-[0.62rem] tracking-widest uppercase px-2.5 py-1.5 border"
              style={{ color: project.color, borderColor: `${project.color}44`, background: `${project.color}10` }}>
              {project.subtitle}
            </div>

            {/* Close */}
            <button data-cursor onClick={onClose}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center
                         border border-ghost text-mist hover:text-snow hover:border-pale
                         transition-colors duration-200">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
              </svg>
            </button>
          </div>

          {/* Content */}
          <div className="p-6 sm:p-8 flex flex-col gap-5">
            <div className="flex items-start justify-between gap-4">
              <h2 className="font-display text-[clamp(1.8rem,5vw,3rem)] leading-tight text-snow">
                {project.title}
              </h2>
              <div className="h-px flex-1 mt-5 min-w-[2rem]"
                style={{ background: `linear-gradient(90deg, ${project.color}, transparent)` }} />
            </div>

            <p className="font-body font-light text-pale text-base leading-relaxed">
              {project.desc}
            </p>

            {/* Extended placeholder details */}
            <p className="font-body font-light text-mist text-sm leading-relaxed">
              This project is currently in portfolio — replace this section with detailed process notes,
              breakdowns, renders, and production insights once you add your real project data.
            </p>

            {/* Tags + CTA row */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2 border-t border-ghost mt-2">
              <div className="flex flex-wrap gap-2">
                {project.tags.map(t => (
                  <span key={t}
                    className="font-mono text-[0.6rem] tracking-wider uppercase px-2.5 py-1 border border-ghost text-dim">
                    {t}
                  </span>
                ))}
              </div>
              <button data-cursor onClick={onClose}
                className="font-mono text-[0.65rem] tracking-[0.18em] uppercase
                           text-ink bg-accent px-5 py-2.5 hover:bg-glow transition-colors duration-300 shrink-0">
                Close
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
