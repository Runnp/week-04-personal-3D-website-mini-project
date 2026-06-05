import { useEffect, useRef } from 'react'
import Hero from './components/Hero'

export default function App() {
  const cursorRef = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    const cursor = cursorRef.current
    const ring = ringRef.current
    if (!cursor || !ring) return

    let raf
    let rx = window.innerWidth / 2
    let ry = window.innerHeight / 2
    let tx = rx
    let ty = ry

    const onMove = (e) => {
      tx = e.clientX
      ty = e.clientY
    }

    const loop = () => {
      // Cursor dot snaps instantly
      cursor.style.left = tx + 'px'
      cursor.style.top  = ty + 'px'

      // Ring follows with lag
      rx += (tx - rx) * 0.12
      ry += (ty - ry) * 0.12
      ring.style.left = rx + 'px'
      ring.style.top  = ry + 'px'

      raf = requestAnimationFrame(loop)
    }

    const onEnter = () => {
      cursor.classList.add('hover')
      ring.classList.add('hover')
    }
    const onLeave = () => {
      cursor.classList.remove('hover')
      ring.classList.remove('hover')
    }

    window.addEventListener('mousemove', onMove)
    document.querySelectorAll('a, button, [data-cursor]').forEach(el => {
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
    })

    raf = requestAnimationFrame(loop)
    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      {/* Custom cursor */}
      <div className="cursor" ref={cursorRef} />
      <div className="cursor-ring" ref={ringRef} />

      {/* Film grain */}
      <div className="grain" aria-hidden="true" />

      {/* Page */}
      <Hero />
    </>
  )
}
