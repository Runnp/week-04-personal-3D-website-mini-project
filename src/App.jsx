import { useEffect, useRef, useState } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import SectionMe from './components/SectionMe'
import SectionAnimation from './components/SectionAnimation'
import SectionResearch from './components/SectionResearch'
import SectionContact from './components/SectionContact'

gsap.registerPlugin(ScrollTrigger)

const SECTIONS = ['hero', 'me', 'animation', 'research', 'contact']

export default function App() {
  const cursorRef  = useRef(null)
  const ringRef    = useRef(null)
  const [activeSection, setActiveSection] = useState('hero')

  // Smooth scroll with Lenis
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.25,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    // Tie Lenis to GSAP ticker so ScrollTrigger stays in sync
    gsap.ticker.add((time) => lenis.raf(time * 1000))
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
      gsap.ticker.remove((time) => lenis.raf(time * 1000))
    }
  }, [])

  // Active section via IntersectionObserver
  useEffect(() => {
    const observers = SECTIONS.map((id) => {
      const el = document.getElementById(id)
      if (!el) return null
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id) },
        { threshold: 0.4 }
      )
      obs.observe(el)
      return obs
    }).filter(Boolean)

    return () => observers.forEach(o => o.disconnect())
  }, [])

  // Custom cursor
  useEffect(() => {
    const cursor = cursorRef.current
    const ring   = ringRef.current
    if (!cursor || !ring) return

    let raf, rx = window.innerWidth / 2, ry = window.innerHeight / 2, tx = rx, ty = ry

    const onMove = (e) => { tx = e.clientX; ty = e.clientY }

    const loop = () => {
      cursor.style.left = tx + 'px'
      cursor.style.top  = ty + 'px'
      rx += (tx - rx) * 0.12
      ry += (ty - ry) * 0.12
      ring.style.left = rx + 'px'
      ring.style.top  = ry + 'px'
      raf = requestAnimationFrame(loop)
    }

    const onEnter = () => { cursor.classList.add('hover'); ring.classList.add('hover') }
    const onLeave = () => { cursor.classList.remove('hover'); ring.classList.remove('hover') }

    const attachHover = () => {
      document.querySelectorAll('a, button, [data-cursor]').forEach(el => {
        el.addEventListener('mouseenter', onEnter)
        el.addEventListener('mouseleave', onLeave)
      })
    }

    window.addEventListener('mousemove', onMove)
    raf = requestAnimationFrame(loop)
    attachHover()

    // Re-attach when DOM changes (new sections mount)
    const mo = new MutationObserver(attachHover)
    mo.observe(document.body, { childList: true, subtree: true })

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
      mo.disconnect()
    }
  }, [])

  return (
    <>
      <div className="cursor"    ref={cursorRef} />
      <div className="cursor-ring" ref={ringRef} />
      <div className="grain" aria-hidden="true" />

      <Navbar activeSection={activeSection} />

      <main>
        <Hero />
        <SectionMe />
        <SectionAnimation />
        <SectionResearch />
        <SectionContact />
      </main>
    </>
  )
}
