import { motion } from 'framer-motion'

const ITEMS = [
  'Computer Graphics', '/', 'Animation', '/', 'Technical Art', '/',
  'Research', '/', 'Storytelling', '/', 'GLSL Shaders', '/',
  'Real-Time Rendering', '/', 'Rigging', '/', 'VFX', '/', 'Tashkent → Toronto', '/',
]
const DOUBLED = [...ITEMS, ...ITEMS]

export default function Marquee({ reverse = false }) {
  return (
    <div className="w-full overflow-hidden border-y border-rule py-1.5 bg-faint">
      <motion.div
        className="flex gap-6 whitespace-nowrap"
        animate={{ x: reverse ? ['0%', '50%'] : ['0%', '-50%'] }}
        transition={{ duration: 38, ease: 'linear', repeat: Infinity }}
        style={{ width: 'max-content' }}
      >
        {DOUBLED.map((item, i) => (
          <span key={i}
            className={`font-mono text-[0.62rem] select-none shrink-0 tracking-widest uppercase
              ${item === '/' ? 'text-rule' : 'text-mid'}`}>
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  )
}
