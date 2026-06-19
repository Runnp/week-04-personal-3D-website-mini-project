import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const PROJECTS = [
  {
    id: 1,
    title: 'Doppi Pomidor',
    subtitle: 'TV Cartoon',
    year: '2023-2026',
    tags: ['Maya', 'Blender', 'Redshift'],
    desc: 'Worked at DIP Animation Studio as Cartoon General Artist, contributing to TV cartoon production and visual polish.',
    link: 'https://youtu.be/0Z8gVQXgab0?feature=shared'
  },
]

function Modal({ project, onClose }) {
  if (!project) return null
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[200] flex items-center justify-center p-4"
        style={{ background: 'rgba(255,255,255,0.92)' }}
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
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
          <hr className="border-ink mb-4" />
          <p className="font-body text-sm text-ink leading-relaxed mb-4">{project.desc}</p>
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs text-link underline mb-4 inline-block"
              data-cursor
            >
              Watch video ↗
            </a>
          )}
          <div className="flex flex-wrap gap-2">
            {project.tags.map(t => (
              <span key={t} className="font-mono text-[0.65rem] border border-ink px-2 py-0.5">{t}</span>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default function SectionAnimation() {
  const [selected, setSelected] = useState(null)

  return (
    <>
      <section id="animation" className="bg-paper border-t border-ink">
        <div className="max-w-5xl mx-auto px-4 sm:px-8 py-10">

          <div className="flex items-baseline gap-4 mb-6 border-b border-ink pb-3">
            <h2 className="font-display text-3xl sm:text-4xl text-ink">Animation</h2>
            <span className="font-mono text-xs text-mid">— selected work</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-6">
            {PROJECTS.map((p) => (
              <button
                key={p.id}
                onClick={() => setSelected(p)}
                className="border border-ink p-5 text-left hover:bg-faint transition-colors duration-100"
                data-cursor
              >
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="font-mono text-[0.65rem] text-mid">{p.subtitle}</span>
                  <span className="font-mono text-[0.65rem] text-mid">•</span>
                  <span className="font-mono text-[0.65rem] text-mid">{p.year}</span>
                </div>
                <h3 className="font-display text-3xl text-ink mb-3">{p.title}</h3>
                <p className="font-body text-sm text-ink leading-relaxed mb-4">{p.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {p.tags.map(t => (
                    <span key={t} className="font-mono text-[0.58rem] border border-rule px-1.5 py-0.5 text-mid">{t}</span>
                  ))}
                </div>
              </button>
            ))}

            <div className="border border-ink bg-faint min-h-[280px] flex items-center justify-center overflow-hidden">
              <img
                src="/justMe.png"
                alt="Runnp"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <p className="font-mono text-[0.65rem] text-mid mt-4">
            — click the project card to expand.
          </p>
        </div>
      </section>
      <Modal project={selected} onClose={() => setSelected(null)} />
    </>
  )
}
