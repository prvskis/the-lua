import { useLayoutEffect, useMemo, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

type TextLineRevealProps = {
  text: string
  as?: 'p' | 'div'
  className?: string
  style?: React.CSSProperties
  delay?: number
  lineDelay?: number
  amount?: number
  duration?: number
}

export function TextLineReveal({
  text,
  as = 'p',
  className = '',
  style,
  delay = 0,
  lineDelay = 0.08,
  amount = 0.25,
  duration = 0.65,
}: TextLineRevealProps) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const measureRef = useRef<HTMLDivElement | null>(null)
  const isInView = useInView(containerRef, { once: true, amount })
  const [lines, setLines] = useState<string[]>([text])
  const words = useMemo(() => text.trim().split(/\s+/).filter(Boolean), [text])
  const Tag = as

  useLayoutEffect(() => {
    const measure = () => {
      if (!measureRef.current) return

      const nodes = Array.from(measureRef.current.querySelectorAll<HTMLElement>('[data-word]'))
      if (!nodes.length) {
        setLines([text])
        return
      }

      const nextLines: string[] = []
      let currentTop: number | null = null
      let currentWords: string[] = []

      nodes.forEach((node) => {
        const top = Math.round(node.offsetTop)
        const word = node.dataset.word ?? ''

        if (currentTop === null || Math.abs(top - currentTop) <= 1) {
          currentWords.push(word)
          currentTop = top
          return
        }

        nextLines.push(currentWords.join(' '))
        currentWords = [word]
        currentTop = top
      })

      if (currentWords.length) nextLines.push(currentWords.join(' '))

      setLines(nextLines.length ? nextLines : [text])
    }

    const frame = window.requestAnimationFrame(measure)
    const observer = new ResizeObserver(() => measure())

    if (containerRef.current) observer.observe(containerRef.current)

    if ('fonts' in document) {
      void (document as Document & { fonts?: FontFaceSet }).fonts?.ready.then(measure)
    }

    return () => {
      window.cancelAnimationFrame(frame)
      observer.disconnect()
    }
  }, [className, style, text, words])

  return (
    <div ref={containerRef} className="relative">
      <div ref={measureRef} className="pointer-events-none absolute inset-0 -z-10 invisible" aria-hidden="true">
        <Tag className={className} style={style}>
          {words.map((word, index) => (
            <span key={`${word}-${index}`} data-word={word}>
              {word}
              {index < words.length - 1 ? ' ' : ''}
            </span>
          ))}
        </Tag>
      </div>

      <Tag className={className} style={style}>
        {lines.map((line, index) => (
          <span key={`${line}-${index}`} className="block overflow-hidden">
            <motion.span
              className="block"
              initial={{ clipPath: 'inset(0 100% 0 0)', opacity: 0.2 }}
              animate={isInView ? { clipPath: 'inset(0 0% 0 0)', opacity: 1 } : { clipPath: 'inset(0 100% 0 0)', opacity: 0.2 }}
              transition={{
                duration,
                delay: delay + index * lineDelay,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {line}
            </motion.span>
          </span>
        ))}
      </Tag>
    </div>
  )
}
