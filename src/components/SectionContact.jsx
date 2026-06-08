import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const LINKS = [
  { label: 'GitHub',   href: 'https://github.com/' },
  { label: 'LinkedIn', href: 'https://linkedin.com/' },
  { label: 'Email',    href: 'mailto:hello@runnp.art' },
]

export default function SectionContact() {
  const ref = useRef(null)

  useEffect(() => {
    gsap.fromTo(ref.current.querySelectorAll('.reveal'),
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0, duration: 0.85, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 80%', once: true },
      }
    )
  }, [])

  return (
    <section id="contact" ref={ref}
      className="relative bg-ink py-32 px-6 sm:px-12 lg:px-24 overflow-hidden"
    >
      {/* Section index */}
      <span className="absolute top-12 right-8 font-display text-[clamp(6rem,18vw,14rem)]
                       text-ghost leading-none select-none pointer-events-none">
        04
      </span>

      <div className="relative z-10 max-w-5xl mx-auto flex flex-col gap-12">

        {/* Headline */}
        <div className="flex flex-col gap-5">
          <span className="reveal font-mono text-xs tracking-[0.25em] uppercase text-glow" style={{ opacity: 0 }}>
            What's Next
          </span>
          <h2 className="reveal font-display text-[clamp(2.8rem,7vw,5.5rem)] leading-[0.92] text-snow"
            style={{ opacity: 0 }}>
            THE NEXT<br /><span className="text-accent">CHAPTER</span>
          </h2>
          <span className="reveal hr-accent" style={{ opacity: 0 }} />
        </div>

        {/* Text */}
        <div className="flex flex-col gap-6 max-w-2xl">
          <p className="reveal font-body font-light text-pale text-[1.05rem] leading-[1.9]" style={{ opacity: 0 }}>
            Heading to the University of Toronto to push further into computer graphics,
            technical art, and the science of visual storytelling. Looking for research
            collaborators, studios, and fellow builders.
          </p>
          <p className="reveal font-body font-light text-mist text-[0.95rem] leading-[1.9]" style={{ opacity: 0 }}>
            If you're working on something at the edge of art and technology — let's talk.
          </p>
        </div>

        {/* Links */}
        <div className="reveal flex flex-wrap gap-4" style={{ opacity: 0 }}>
          {LINKS.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor
              className="group inline-flex items-center gap-2.5
                         font-mono text-xs tracking-[0.18em] uppercase
                         border border-dim text-mist
                         px-5 py-3
                         hover:border-glow hover:text-accent
                         transition-all duration-300"
            >
              {label}
              <svg className="w-2.5 h-2.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                viewBox="0 0 10 10" fill="none">
                <path d="M1 9L9 1M9 1H3M9 1v6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
              </svg>
            </a>
          ))}
        </div>

        {/* Footer bar */}
        <div className="reveal border-t border-ghost pt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4" style={{ opacity: 0 }}>
          <span className="font-display text-2xl text-ghost">RUNNP</span>
          <div className="flex items-center gap-4">
            <span className="font-mono text-[0.6rem] tracking-widest uppercase text-dim">
              Nurmuhammad Mirzaahmadov
            </span>
            <span className="w-1 h-1 rounded-full bg-dim block" />
            <span className="font-mono text-[0.6rem] tracking-widest uppercase text-dim">
              runnp.art © 2025
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
