import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Container } from '@/components/layout/Container'
import { TextRotate } from '@/components/ui/TextRotate'

const ROTATING_WORDS = [
  'Creative 3D',
  '3D Modeling',
  '3D Rendering',
  'Amazon Listing',
  'Product Visualization',
]

const ARTIST_CHARS = 'Artist'.split('')

function getHeroFade(mouseY, heroEl) {
  if (!heroEl) return 1
  const r = heroEl.getBoundingClientRect()
  const zone = 80
  if (mouseY < r.top) return Math.max(0, 1 - (r.top - mouseY) / zone)
  if (mouseY > r.bottom) return Math.max(0, 1 - (mouseY - r.bottom) / zone)
  return 1
}

function drawArrow(ctx, mouse, buttonRef, heroRef) {
  if (!mouse.x || !mouse.y || !buttonRef.current) return

  const fade = getHeroFade(mouse.y, heroRef.current)
  if (fade <= 0) return

  const rect = buttonRef.current.getBoundingClientRect()
  const cx = rect.left + rect.width / 2
  const cy = rect.top + rect.height / 2

  const x0 = mouse.x
  const y0 = mouse.y

  const angle = Math.atan2(cy - y0, cx - x0)
  const x1 = cx - Math.cos(angle) * (rect.width / 2 + 14)
  const y1 = cy - Math.sin(angle) * (rect.height / 2 + 14)

  const dist = Math.hypot(x1 - x0, y1 - y0)
  const rawOpacity = Math.min(0.75, (dist - Math.max(rect.width, rect.height) / 2) / 500)
  const opacity = rawOpacity * fade
  if (opacity <= 0) return

  const midX = (x0 + x1) / 2
  const midY = (y0 + y1) / 2
  const offset = Math.min(160, dist * 0.45)
  const t = Math.max(-1, Math.min(1, (y0 - y1) / 200))
  const ctrlX = midX
  const ctrlY = midY + offset * t

  const isDark = document.documentElement.classList.contains('dark')
  const stroke = isDark ? `rgba(255,255,255,${opacity})` : `rgba(0,0,0,${opacity})`

  ctx.strokeStyle = stroke
  ctx.lineWidth = 1.5

  ctx.save()
  ctx.beginPath()
  ctx.moveTo(x0, y0)
  ctx.quadraticCurveTo(ctrlX, ctrlY, x1, y1)
  ctx.setLineDash([8, 5])
  ctx.stroke()
  ctx.restore()

  const headAngle = Math.atan2(y1 - ctrlY, x1 - ctrlX)
  const hl = 10
  ctx.beginPath()
  ctx.setLineDash([])
  ctx.strokeStyle = stroke
  ctx.moveTo(x1, y1)
  ctx.lineTo(
    x1 - hl * Math.cos(headAngle - Math.PI / 6),
    y1 - hl * Math.sin(headAngle - Math.PI / 6)
  )
  ctx.moveTo(x1, y1)
  ctx.lineTo(
    x1 - hl * Math.cos(headAngle + Math.PI / 6),
    y1 - hl * Math.sin(headAngle + Math.PI / 6)
  )
  ctx.stroke()
}

export function HeroSection() {
  const sectionRef = useRef(null)
  const buttonRef = useRef(null)
  const canvasRef = useRef(null)
  const ctxRef = useRef(null)
  const canvasMouseRef = useRef({ x: null, y: null })
  const canvasRafRef = useRef(null)

  const [buttonDrift, setButtonDrift] = useState({ x: 0, y: 0 })
  const [buttonProximity, setButtonProximity] = useState(999)

  // Canvas dotted arrow
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    ctxRef.current = canvas.getContext('2d')

    function updateSize() {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    function onMouseMove(e) {
      canvasMouseRef.current = { x: e.clientX, y: e.clientY }
    }
    function onMouseLeave() {
      canvasMouseRef.current = { x: null, y: null }
    }

    window.addEventListener('resize', updateSize)
    window.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseleave', onMouseLeave)
    updateSize()

    function loop() {
      const ctx = ctxRef.current
      if (ctx && canvas) {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        drawArrow(ctx, canvasMouseRef.current, buttonRef, sectionRef)
      }
      canvasRafRef.current = requestAnimationFrame(loop)
    }
    canvasRafRef.current = requestAnimationFrame(loop)

    return () => {
      window.removeEventListener('resize', updateSize)
      window.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseleave', onMouseLeave)
      cancelAnimationFrame(canvasRafRef.current)
    }
  }, [])

  // Gravity pull + proximity tracking
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

      setButtonProximity(dist)

      if (dist < 160) {
        const pull = 1 - dist / 160
        const maxDrift = 14
        setButtonDrift({
          x: Math.min(Math.max(dx * pull * 0.25, -maxDrift), maxDrift),
          y: Math.min(Math.max(dy * pull * 0.25, -maxDrift), maxDrift),
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

  const proxFraction = Math.max(0, 1 - buttonProximity / 160)
  const shadowOpacity = (proxFraction * 0.3).toFixed(3)
  const shadowBlur = Math.round(proxFraction * 30)
  const shadowY = Math.round(proxFraction * 8)
  const buttonShadow =
    proxFraction > 0.02
      ? `0 ${shadowY}px ${shadowBlur}px rgba(0,0,0,${shadowOpacity})`
      : undefined

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white dark:bg-black"
    >
      <Container className="relative z-10">
        <div className="flex flex-col items-center text-center py-28 space-y-8">
          {/* Heading */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-display text-gray-900 dark:text-white leading-tight">
            <span className="inline-flex flex-wrap items-baseline justify-center gap-x-3">
              <TextRotate words={ROTATING_WORDS} />
              <span className="inline-flex">
                {ARTIST_CHARS.map((char, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.15 + i * 0.04,
                      type: 'spring',
                      stiffness: 300,
                      damping: 20,
                    }}
                    className="inline-block"
                  >
                    {char}
                  </motion.span>
                ))}
              </span>
            </span>
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
            className="mt-2 px-12 py-5 rounded-none border-2 border-gray-900 dark:border-white text-gray-900 dark:text-white text-xl sm:text-2xl font-body font-medium hover:bg-gray-900 hover:text-white dark:hover:bg-white dark:hover:text-black cursor-pointer"
            style={{
              transform: `translate(${buttonDrift.x}px, ${buttonDrift.y}px)`,
              transition:
                'transform 0.35s cubic-bezier(0.23,1,0.32,1), background-color 0.25s, color 0.25s, box-shadow 0.3s ease',
              boxShadow: buttonShadow,
            }}
          >
            View Work
          </button>
        </div>
      </Container>

      {/* Canvas for dotted cursor arrow */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: 50 }}
      />
    </section>
  )
}
