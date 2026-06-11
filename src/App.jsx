import { useEffect, useRef, useState } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Loader from './components/Loader'
import Navbar from './components/Navbar'
import ScrollProgress from './components/ScrollProgress'
import Hero from './components/Hero'
import SectionMe from './components/SectionMe'
import SectionAnimation from './components/SectionAnimation'
import SectionResearch from './components/SectionResearch'
import SectionContact from './components/SectionContact'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  const cursorRef = useRef(null)
  const ringRef   = useRef(null)
  const [loaded, setLoaded] = useState(false)

  // Lenis smooth scroll
  useEffect(() => {
    if (!loaded) return
    const lenis = new Lenis({ duration: 1.1, smoothWheel: true })
    gsap.ticker.add((time) => lenis.raf(time * 1000))
    gsap.ticker.lagSmoothing(0)
    return () => { lenis.destroy() }
  }, [loaded])

  // Custom cursor
  useEffect(() => {
    const cursor = cursorRef.current
    const ring   = ringRef.current
    if (!cursor || !ring) return
    let raf, rx = window.innerWidth/2, ry = window.innerHeight/2, tx = rx, ty = ry
    const onMove = (e) => { tx = e.clientX; ty = e.clientY }
    const loop = () => {
      cursor.style.left = tx+'px'; cursor.style.top = ty+'px'
      rx += (tx-rx)*.12; ry += (ty-ry)*.12
      ring.style.left = rx+'px'; ring.style.top = ry+'px'
      raf = requestAnimationFrame(loop)
    }
    const on  = () => { cursor.classList.add('hover'); ring.classList.add('hover') }
    const off = () => { cursor.classList.remove('hover'); ring.classList.remove('hover') }
    const attach = () => {
      document.querySelectorAll('a,button,[data-cursor]').forEach(el => {
        el.removeEventListener('mouseenter', on)
        el.removeEventListener('mouseleave', off)
        el.addEventListener('mouseenter', on)
        el.addEventListener('mouseleave', off)
      })
    }
    window.addEventListener('mousemove', onMove)
    raf = requestAnimationFrame(loop)
    attach()
    const mo = new MutationObserver(attach)
    mo.observe(document.body, { childList: true, subtree: true })
    return () => { window.removeEventListener('mousemove', onMove); cancelAnimationFrame(raf); mo.disconnect() }
  }, [])

  return (
    <>
      <div className="cursor"      ref={cursorRef} />
      <div className="cursor-ring" ref={ringRef} />

      {!loaded && <Loader onComplete={() => setLoaded(true)} />}

      <div style={{ visibility: loaded ? 'visible' : 'hidden' }}>
        <ScrollProgress />
        <Navbar />
        <main>
          <Hero />
          <SectionMe />
          <SectionAnimation />
          <SectionResearch />
          <SectionContact />
        </main>
      </div>
    </>
  )
}
