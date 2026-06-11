import { useRef } from 'react'
import { motion } from 'framer-motion'

const BIO = [
  ['Me', '/ᐠ｡ꞈ｡ᐟ\\'],
  ['Name', 'Nurmuhammad Mirzaahmadov'],
  ['Nick', 'Runnp'],
  ['Born', '1st October 2008, Libra'],
  ['City', 'Tashkent, Ozbekistan'],
  ['Gender, Sex', 'Man, Hetero'],
  ['Blood Type', 'A+, II Group'],
  ['Race', 'Ozbek, White'],
  ['Religion', 'Muslim, Sunni'],
  ['Philosophy', 'Do Good, Benefit People'],
  ['Color', 'Black Hair, Brown Eyes'],
  ['Diet', 'Tryna Vegetarian, No Coffee'],
  ['Weight', '50 Kilogram, Light'],
  ['Height', "5'5 Feet"],
  ['School', 'University of Toronto'],
  ['Main Idea of Life', 'Do Cool Computer Graphics'],
  ['—', '—'],
  ['Mouse', 'Logitech Ergo M575'],
  ['Software', 'Blender + 3D Maya'],
  ['Editor', 'Visual Studio Code'],
  ['Wallpaper', 'Studio Ghibli Blue Intro'],
  ['—', '—'],
  ['Music', 'Hard Rock Nu Metal Alternative, Linkin Park, System of a Down, Metallica'],
  ['Art', 'Pieta by Michelangelo, Beautiful'],
  ['Book', 'The Writer\'s Journey, Christopher Vogler'],
  ['Game', 'Doom, John Carmack'],
  ['Anime', 'K-On!, Naoko Yamada'],
  ['Goat', 'JoJo\'s Bizarre Adventure, Hirohiko Araki'],
  ['Cartoon', 'Spirited Away, Hayao Miyazaki'],
  ['Movie', 'Drive, Ryan Gosling'],
  ['TV Series', 'The Sopranos, David Chase'],
]

export default function SectionMe() {
  const ref = useRef(null)

  return (
    <section id="me" className="bg-paper border-t border-ink">
      <div className="max-w-5xl mx-auto px-4 sm:px-8 py-10">

        {/* Header */}
        <div className="flex items-baseline gap-4 mb-6 border-b border-ink pb-3">
          <h2 className="font-display text-3xl sm:text-4xl text-ink">Me</h2>
          <span className="font-mono text-xs text-mid">— about.txt</span>
        </div>

        {/* Bio table */}
        <div ref={ref} className="border border-ink">
          {BIO.map(([key, val], i) => {
            if (key === '—') return (
              <div key={i} className="border-t border-rule h-px bg-faint" />
            )
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.3, delay: i * 0.015 }}
                className="flex border-b border-rule last:border-b-0 hover:bg-faint transition-colors duration-100"
                data-cursor
              >
                <span className="font-mono text-[0.72rem] text-mid w-36 sm:w-48 shrink-0 px-3 py-1.5 border-r border-rule">
                  {key}
                </span>
                <span className="font-mono text-[0.72rem] text-ink px-3 py-1.5 leading-snug">
                  {val}
                </span>
              </motion.div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
