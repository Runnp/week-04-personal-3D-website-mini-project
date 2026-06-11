import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const PROJECTS = [
  { id: 1, title: 'Character Rig',  subtitle: 'Skeletal Animation', year: '2024', tags: ['Maya', 'Rigging', 'Character'], desc: 'Full body character rig with facial blendshapes and dynamic cloth simulation. Built for real-time pipeline.' },
  { id: 2, title: 'Fluid Sim',      subtitle: 'VFX / Houdini',      year: '2024', tags: ['Houdini', 'FLIP', 'VFX'],       desc: 'High-resolution fluid simulation driven by custom velocity fields. Rendered with Mantra.' },
  { id: 3, title: 'Short Film',     subtitle: 'Animated Narrative',  year: '2023', tags: ['Blender', 'Cycles', 'Story'],   desc: 'A silent short exploring memory and place, set in an imagined version of Tashkent. Full CG environment.' },
  { id: 4, title: 'Shader Pack',    subtitle: 'Technical Art',       year: '2024', tags: ['GLSL', 'Unity', 'HLSL'],        desc: 'Stylised surface shaders inspired by cel-shading and ink wash painting. Real-time, game-ready.' },
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
          <p className="font-mono text-xs text-mid mb-4">
            — placeholder. replace with real project breakdown, renders, process notes.
          </p>
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

          <table className="w-full border-collapse border border-ink text-sm">
            <thead>
              <tr className="border-b border-ink bg-faint">
                <th className="font-mono text-[0.65rem] text-mid text-left px-3 py-2 border-r border-rule font-normal">#</th>
                <th className="font-mono text-[0.65rem] text-mid text-left px-3 py-2 border-r border-rule font-normal">Title</th>
                <th className="font-mono text-[0.65rem] text-mid text-left px-3 py-2 border-r border-rule font-normal hidden sm:table-cell">Type</th>
                <th className="font-mono text-[0.65rem] text-mid text-left px-3 py-2 border-r border-rule font-normal hidden sm:table-cell">Tags</th>
                <th className="font-mono text-[0.65rem] text-mid text-left px-3 py-2 font-normal">Year</th>
              </tr>
            </thead>
            <tbody>
              {PROJECTS.map((p) => (
                <tr key={p.id}
                  className="border-b border-rule hover:bg-faint transition-colors duration-100 cursor-none"
                  onClick={() => setSelected(p)}
                  data-cursor
                >
                  <td className="font-mono text-[0.65rem] text-mid px-3 py-2 border-r border-rule tabular-nums">
                    {String(p.id).padStart(2,'0')}
                  </td>
                  <td className="font-mono text-[0.82rem] text-link px-3 py-2 border-r border-rule underline">
                    {p.title}
                  </td>
                  <td className="font-mono text-[0.72rem] text-mid px-3 py-2 border-r border-rule hidden sm:table-cell">
                    {p.subtitle}
                  </td>
                  <td className="font-mono text-[0.65rem] text-mid px-3 py-2 border-r border-rule hidden sm:table-cell">
                    {p.tags.join(', ')}
                  </td>
                  <td className="font-mono text-[0.72rem] text-mid px-3 py-2 tabular-nums">
                    {p.year}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <p className="font-mono text-[0.65rem] text-mid mt-4">
            — click any row to expand. more work available on request.
          </p>
        </div>
      </section>
      <Modal project={selected} onClose={() => setSelected(null)} />
    </>
  )
}
