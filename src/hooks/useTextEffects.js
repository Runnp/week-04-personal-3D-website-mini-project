import { useEffect, useRef, useState } from 'react'

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%'

/**
 * useScramble(target, options)
 * Returns { text, trigger }
 * - text: current display string
 * - trigger: call to restart the effect
 */
export function useScramble(target, { delay = 0, speed = 40, scrambleCycles = 2 } = {}) {
  const [text, setText] = useState(target)
  const frameRef = useRef(null)

  const trigger = () => {
    let iteration   = 0
    const total     = target.length * scrambleCycles
    clearInterval(frameRef.current)

    frameRef.current = setInterval(() => {
      setText(
        target
          .split('')
          .map((char, idx) => {
            if (char === ' ') return ' '
            if (idx < iteration / scrambleCycles) return char
            return CHARS[Math.floor(Math.random() * CHARS.length)]
          })
          .join('')
      )
      iteration++
      if (iteration >= total) {
        clearInterval(frameRef.current)
        setText(target)
      }
    }, speed)
  }

  useEffect(() => {
    const t = setTimeout(trigger, delay)
    return () => {
      clearTimeout(t)
      clearInterval(frameRef.current)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target])

  return { text, trigger }
}

/**
 * useTypewriter(lines, options)
 * Returns the currently typed string.
 * Cycles through lines array one after another.
 */
export function useTypewriter(line, { delay = 0, speed = 45 } = {}) {
  const [displayed, setDisplayed] = useState('')
  const [started, setStarted]     = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), delay)
    return () => clearTimeout(t)
  }, [delay])

  useEffect(() => {
    if (!started) return
    setDisplayed('')
    let i = 0
    const id = setInterval(() => {
      setDisplayed(line.slice(0, i + 1))
      i++
      if (i >= line.length) clearInterval(id)
    }, speed)
    return () => clearInterval(id)
  }, [started, line, speed])

  return displayed
}
