import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function ProjectModal({ project, onClose }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', onKey) }
  }, [onClose])

  if (!project) return null
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-[200] flex items-center justify-center p-4"
        style={{ background: 'rgba(255,255,255,0.95)' }}
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="bg-paper border border-ink w-full max-w-lg p-6"
          onClick={e => e.stopPropagation()}
        >
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="font-display text-2xl text-ink">{project.title}</h3>
              <span className="font-mono text-xs text-mid">{project.subtitle} — {project.year}</span>
            </div>
            <button onClick={onClose} className="font-mono text-xs text-mid hover:text-ink" data-cursor>
              [close]
            </button>
          </div>
          <hr className="mb-4" />
          <p className="font-body text-sm text-ink leading-relaxed mb-3">{project.desc}</p>
          <p className="font-mono text-[0.65rem] text-mid mb-4 italic">
            — replace this with real renders, breakdowns, and process notes.
          </p>
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.map(t => (
              <span key={t} className="font-mono text-[0.65rem] border border-ink px-2 py-0.5">{t}</span>
            ))}
          </div>
          <div className="border-t border-rule pt-4">
            <button onClick={onClose}
              className="font-mono text-xs text-link hover:text-red underline" data-cursor>
              ← back to list
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
