import { useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export function RotateOnScrollDemo() {
  const scopeRef = useRef(null)
  const dialRef = useRef(null)
  const [progress, setProgress] = useState(0)

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const context = gsap.context(() => {
      gsap.to(dialRef.current, {
        rotate: 360,
        ease: 'none',
        scrollTrigger: {
          trigger: scopeRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: true,
          onUpdate: (instance) => {
            setProgress(instance.progress)
          },
        },
      })
    }, scopeRef)

    return () => {
      context.revert()
    }
  }, [])

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-theme-muted">
        <p>Scroll the sample area to scrub rotation.</p>
        <p>Progress: {(progress * 100).toFixed(1)}%</p>
      </div>

      <div
        ref={scopeRef}
        className="relative h-[180vh] rounded-2xl border border-dashed border-theme-border bg-theme-bg"
      >
        <div className="sticky top-6 flex h-[calc(100vh-4rem)] items-center justify-center rounded-2xl border border-theme-border bg-theme-surface">
          <div className="flex flex-col items-center gap-6">
            <div
              ref={dialRef}
              className="grid h-48 w-48 place-items-center rounded-full border border-theme-fg"
            >
              <div className="h-20 w-1 rounded-full bg-theme-fg" />
            </div>
            <p className="max-w-md text-center text-sm leading-6 text-theme-muted">
              This sample isolates scrubbed scroll rotation and cleanup behavior
              before any real production visuals are introduced.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
