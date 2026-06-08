import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

const LINKS = [
  { label: 'Me',       href: '#me' },
  { label: 'Animation', href: '#animation' },
  { label: 'Research', href: '#research' },
  { label: 'Contact',  href: '#contact' },
]

export default function Navbar({ activeSection }) {
  const navRef   = useRef(null)
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  // Entrance animation
  useEffect(() => {
    gsap.fromTo(navRef.current,
      { opacity: 0, y: -16 },
      { opacity: 1, y: 0, duration: 0.9, delay: 1.6, ease: 'power3.out' }
    )
  }, [])

  // Scroll shadow
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleClick = (e, href) => {
    e.preventDefault()
    setMenuOpen(false)
    const target = document.querySelector(href)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 opacity-0 transition-all duration-500
        ${scrolled ? 'py-3 border-b border-ghost' : 'py-5'}
      `}
      style={{ background: scrolled ? 'rgba(0,0,0,0.85)' : 'transparent', backdropFilter: scrolled ? 'blur(12px)' : 'none' }}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 flex items-center justify-between">

        {/* Logo */}
        <a
          href="#hero"
          onClick={(e) => handleClick(e, '#hero')}
          data-cursor
          className="font-display text-2xl text-snow tracking-tight hover:text-accent transition-colors duration-300"
        >
          RUNNP
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {LINKS.map(({ label, href }) => {
            const sectionId = href.replace('#', '')
            const isActive  = activeSection === sectionId
            return (
              <li key={label}>
                <a
                  href={href}
                  onClick={(e) => handleClick(e, href)}
                  data-cursor
                  className={`relative font-mono text-xs tracking-[0.18em] uppercase transition-colors duration-300
                    ${isActive ? 'text-accent' : 'text-mist hover:text-snow'}
                  `}
                >
                  {label}
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 right-0 h-px bg-accent" />
                  )}
                </a>
              </li>
            )
          })}
        </ul>

        {/* Mobile hamburger */}
        <button
          data-cursor
          className="md:hidden flex flex-col gap-1.5 p-1"
          onClick={() => setMenuOpen(v => !v)}
          aria-label="Toggle menu"
        >
          <span className={`block h-px w-6 bg-snow transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block h-px w-4 bg-snow transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block h-px w-6 bg-snow transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-500 ${menuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'}`}
        style={{ background: 'rgba(0,0,0,0.95)', backdropFilter: 'blur(12px)' }}
      >
        <ul className="flex flex-col px-6 py-4 gap-4">
          {LINKS.map(({ label, href }) => (
            <li key={label}>
              <a
                href={href}
                onClick={(e) => handleClick(e, href)}
                className="font-mono text-sm tracking-[0.18em] uppercase text-pale hover:text-accent transition-colors"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
