import { useEffect, useRef, useState } from 'react'

const LINKS = [
  { label: 'Me',        href: '#me' },
  { label: 'Animation', href: '#animation' },
  { label: 'Research',  href: '#research' },
  { label: 'Work',      href: '#work' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  const go = (e, href) => {
    e.preventDefault()
    setMenuOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-paper border-b border-ink">
      <div className="max-w-5xl mx-auto px-4 sm:px-8 flex items-center justify-between h-9">

        {/* Name */}
        <a href="#hero" onClick={e => go(e,'#hero')}
          className="font-display text-base text-ink no-underline hover:text-link"
          data-cursor>
          runnp.art
        </a>

        {/* Desktop nav */}
        <ul className="hidden sm:flex items-center gap-6 list-none">
          {LINKS.map(({ label, href }) => (
            <li key={label}>
              <a href={href} onClick={e => go(e, href)}
                className="font-mono text-xs text-ink no-underline hover:text-link hover:underline"
                data-cursor>
                {label}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile toggle */}
        <button className="sm:hidden font-mono text-xs text-ink"
          onClick={() => setMenuOpen(v => !v)} data-cursor>
          {menuOpen ? '[close]' : '[menu]'}
        </button>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="sm:hidden border-t border-ink bg-paper px-4 py-3 flex flex-col gap-2">
          {LINKS.map(({ label, href }) => (
            <a key={label} href={href} onClick={e => go(e, href)}
              className="font-mono text-sm text-link">
              {label}
            </a>
          ))}
        </div>
      )}
    </nav>
  )
}
