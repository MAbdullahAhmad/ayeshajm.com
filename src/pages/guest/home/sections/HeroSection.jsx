import { useEffect, useRef, useState } from 'react'
import { Container } from '@/components/layout/Container'
import { TextRotate } from '@/components/ui/TextRotate'

const ROTATING_WORDS = [
  'Creative 3D',
  '3D Modeling',
  '3D Rendering',
  'Amazon Listing',
  'Product Visualization',
]

export function HeroSection() {
  const sectionRef = useRef(null)
  const buttonRef = useRef(null)
  const [spotlightPos, setSpotlightPos] = useState({ x: -9999, y: -9999 })
  const [buttonDrift, setButtonDrift] = useState({ x: 0, y: 0 })
  const targetRef = useRef({ x: 0, y: 0 })
  const currentRef = useRef({ x: 0, y: 0 })
  const rafRef = useRef(null)

  // Spotlight lerp animation
  useEffect(() => {
    function onMouseMove(e) {
      targetRef.current = { x: e.clientX, y: e.clientY }
    }

    function lerp(a, b, t) {
      return a + (b - a) * t
    }

    function tick() {
      currentRef.current.x = lerp(currentRef.current.x, targetRef.current.x, 0.08)
      currentRef.current.y = lerp(currentRef.current.y, targetRef.current.y, 0.08)
      setSpotlightPos({ x: currentRef.current.x, y: currentRef.current.y })
      rafRef.current = requestAnimationFrame(tick)
    }

    window.addEventListener('mousemove', onMouseMove)
    rafRef.current = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  // Gravity pull on button
  useEffect(() => {
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0
    if (isTouch) return

    function onMouseMove(e) {
      if (!buttonRef.current) return
      const rect = buttonRef.current.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = e.clientX - cx
      const dy = e.clientY - cy
      const dist = Math.sqrt(dx * dx + dy * dy)
      if (dist < 150) {
        const maxDrift = 12
        setButtonDrift({
          x: Math.min(Math.max(dx * 0.2, -maxDrift), maxDrift),
          y: Math.min(Math.max(dy * 0.2, -maxDrift), maxDrift),
        })
      } else {
        setButtonDrift({ x: 0, y: 0 })
      }
    }

    window.addEventListener('mousemove', onMouseMove)
    return () => window.removeEventListener('mousemove', onMouseMove)
  }, [])

  function handleCTAClick() {
    document.getElementById('featured-projects')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white dark:bg-gray-950"
    >
      {/* Spotlight — light mode */}
      <div
        className="absolute inset-0 pointer-events-none dark:hidden"
        style={{
          background: `radial-gradient(900px circle at ${spotlightPos.x}px ${spotlightPos.y}px, rgba(0,0,0,0.05), transparent 70%)`,
        }}
      />
      {/* Spotlight — dark mode */}
      <div
        className="absolute inset-0 pointer-events-none hidden dark:block"
        style={{
          background: `radial-gradient(900px circle at ${spotlightPos.x}px ${spotlightPos.y}px, rgba(255,255,255,0.04), transparent 70%)`,
        }}
      />

      <Container className="relative z-10">
        <div className="flex flex-col items-center text-center py-24 space-y-8">
          {/* Heading */}
          <h1
            className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-display text-gray-900 dark:text-white leading-tight"
          >
            <TextRotate words={ROTATING_WORDS} className="mr-2" />
            {' '}Artist
          </h1>

          {/* Paragraph */}
          <p className="max-w-2xl text-gray-500 dark:text-gray-400 text-lg sm:text-xl font-body leading-relaxed">
            If you are looking for stunning 3D models, product renders, or Amazon
            listing visuals that stop the scroll — you are in the right place. From
            concept to final output, every detail is crafted with precision and a
            designer's eye.
          </p>

          {/* CTA */}
          <button
            ref={buttonRef}
            onClick={handleCTAClick}
            className="mt-2 px-10 py-4 rounded-full border-2 border-gray-900 dark:border-white text-gray-900 dark:text-white text-base sm:text-lg font-body font-medium hover:bg-gray-900 hover:text-white dark:hover:bg-white dark:hover:text-gray-900 transition-colors duration-300"
            style={{
              transform: `translate(${buttonDrift.x}px, ${buttonDrift.y}px)`,
              transition: 'transform 0.4s ease, background-color 0.3s, color 0.3s',
            }}
          >
            View Work
          </button>
        </div>
      </Container>
    </section>
  )
}
