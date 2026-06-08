import { useRef } from 'react'
import { motion } from 'framer-motion'

const ITEMS = [
  'Computer Graphics',
  '✦',
  'Animation',
  '✦',
  'Technical Art',
  '✦',
  'Research',
  '✦',
  'Storytelling',
  '✦',
  'GLSL Shaders',
  '✦',
  'Real-Time Rendering',
  '✦',
  'Rigging',
  '✦',
  'VFX',
  '✦',
  'Tashkent → Toronto',
  '✦',
]

// Duplicate for seamless loop
const DOUBLED = [...ITEMS, ...ITEMS]

export default function Marquee({ speed = 35, reverse = false, dim = false }) {
  const duration = ITEMS.length * (120 / speed)

  return (
    <div className={`w-full overflow-hidden border-y py-3 ${dim ? 'border-ghost' : 'border-dim'}`}>
      <motion.div
        className="flex gap-8 whitespace-nowrap"
        animate={{ x: reverse ? ['0%', '50%'] : ['0%', '-50%'] }}
        transition={{
          duration,
          ease: 'linear',
          repeat: Infinity,
        }}
        style={{ width: 'max-content' }}
      >
        {DOUBLED.map((item, i) => (
          <span
            key={i}
            className={`font-mono text-[0.65rem] tracking-[0.2em] uppercase select-none shrink-0
              ${item === '✦' ? 'text-glow' : dim ? 'text-dim' : 'text-mist'}`}
          >
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  )
}
