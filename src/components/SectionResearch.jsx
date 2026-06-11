import { motion } from 'framer-motion'

const ENTRIES = [
  { type: 'Research', year: '2024', title: 'Procedural Terrain Generation Using Noise Functions', desc: 'Layered Perlin and Simplex noise for real-time terrain synthesis.', tags: ['CG', 'Procedural', 'Terrain'] },
  { type: 'Research', year: '2024', title: 'NPR Rendering Techniques for Stylised Animation',    desc: 'Survey of non-photorealistic rendering — cel shading, contour lines, hatching.', tags: ['NPR', 'Shaders', 'Rendering'] },
  { type: 'Blog',     year: '2024', title: 'Why Studio Ghibli Backgrounds Feel Infinite',         desc: 'Visual analysis of Kazuo Oga\'s background paintings and atmospheric perspective.', tags: ['Analysis', 'Ghibli', 'Art'] },
  { type: 'Blog',     year: '2024', title: 'Learning R3F: Three.js for React Developers',         desc: 'Notes from rebuilding my portfolio in React Three Fiber.', tags: ['R3F', 'Three.js', 'Dev'] },
  { type: 'Blog',     year: '2025', title: 'The Technical Art Pipeline',                          desc: 'How technical artists translate between creative vision and engine constraints.', tags: ['Technical Art', 'Pipeline'] },
]

export default function SectionResearch() {
  return (
    <section id="research" className="bg-paper border-t border-ink">
      <div className="max-w-5xl mx-auto px-4 sm:px-8 py-10">

        <div className="flex items-baseline gap-4 mb-6 border-b border-ink pb-3">
          <h2 className="font-display text-3xl sm:text-4xl text-ink">Research</h2>
          <span className="font-mono text-xs text-mid">— writing & papers</span>
        </div>

        <div className="flex flex-col">
          {ENTRIES.map((e, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.35, delay: i * 0.05 }}
              className="border-b border-rule py-4 flex flex-col sm:flex-row sm:gap-6 hover:bg-faint transition-colors duration-100 px-2 -mx-2"
              data-cursor
            >
              <div className="flex gap-3 items-baseline shrink-0 mb-1 sm:mb-0">
                <span className="font-mono text-[0.6rem] text-mid w-14 tabular-nums">{e.year}</span>
                <span className="font-mono text-[0.6rem] border border-rule px-1.5 py-0.5 text-mid w-16 text-center">
                  {e.type}
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-body text-sm text-link underline hover:text-red cursor-none" data-cursor>
                  {e.title}
                </span>
                <span className="font-mono text-[0.68rem] text-mid">{e.desc}</span>
                <div className="flex gap-2 flex-wrap mt-0.5">
                  {e.tags.map(t => (
                    <span key={t} className="font-mono text-[0.58rem] text-mid border border-rule px-1.5 py-0.5">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
