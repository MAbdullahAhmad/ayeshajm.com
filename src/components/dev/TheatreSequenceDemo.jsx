import { onChange } from '@theatre/core'
import { useEffect, useRef, useState } from 'react'
import {
  THEATRE_SAMPLE,
  createTheatreSampleObject,
  getTheatreSampleSheet,
  valuesFromPlayhead,
} from '@/scenes/dev/theatreSequence.js'

export function TheatreSequenceDemo() {
  const sheetRef = useRef(null)
  const objectRef = useRef(null)
  const frameRef = useRef(null)
  const animationFrameRef = useRef(0)
  const playStartedAtRef = useRef(0)
  const [playing, setPlaying] = useState(false)
  const [position, setPosition] = useState(0)
  const [values, setValues] = useState(valuesFromPlayhead(0))

  function applyPosition(nextPosition) {
    if (!sheetRef.current || !objectRef.current) {
      return
    }

    sheetRef.current.sequence.position = nextPosition
    objectRef.current.initialValue = valuesFromPlayhead(nextPosition)
  }

  useEffect(() => {
    const sheet = getTheatreSampleSheet()
    const object = createTheatreSampleObject(sheet)

    sheetRef.current = sheet
    objectRef.current = object

    const unsubscribePosition = onChange(
      sheet.sequence.pointer.position,
      (nextPosition) => {
        setPosition(nextPosition)
      }
    )

    const unsubscribeValues = object.onValuesChange((nextValues) => {
      setValues(nextValues)
    })

    applyPosition(0)

    return () => {
      unsubscribePosition()
      unsubscribeValues()
      cancelAnimationFrame(animationFrameRef.current)
    }
  }, [])

  useEffect(() => {
    if (!playing) {
      cancelAnimationFrame(animationFrameRef.current)
      return
    }

    playStartedAtRef.current =
      performance.now() -
      (sheetRef.current?.sequence.position ?? 0) * 1000

    const tick = (timestamp) => {
      const nextPosition =
        ((timestamp - playStartedAtRef.current) / 1000) %
        THEATRE_SAMPLE.sequenceLength

      applyPosition(nextPosition)
      animationFrameRef.current = requestAnimationFrame(tick)
    }

    animationFrameRef.current = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(animationFrameRef.current)
    }
  }, [playing])

  useEffect(() => {
    if (!frameRef.current) {
      return
    }

    frameRef.current.style.transform = `translateY(${values.lift}px) rotate(${values.rotate}deg) scale(${values.scale})`
    frameRef.current.style.boxShadow = `0 0 ${12 + values.glow * 38}px rgba(99, 102, 241, ${0.18 + values.glow * 0.35})`
  }, [values])

  function handleSliderChange(event) {
    const nextPosition = Number(event.target.value)
    setPlaying(false)
    applyPosition(nextPosition)
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-3">
        <button
          className="rounded-full border border-theme-fg px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-theme-fg"
          onClick={() => setPlaying((current) => !current)}
          type="button"
        >
          {playing ? 'Pause playhead' : 'Play loop'}
        </button>
        <button
          className="rounded-full border border-theme-border px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-theme-muted"
          onClick={() => {
            setPlaying(false)
            applyPosition(0)
          }}
          type="button"
        >
          Reset
        </button>
      </div>

      <div className="space-y-2">
        <label
          className="text-sm font-medium text-theme-fg"
          htmlFor="theatre-sequence-range"
        >
          Sequence position: {position.toFixed(2)}s / {THEATRE_SAMPLE.sequenceLength}s
        </label>
        <input
          className="w-full accent-theme-accent"
          id="theatre-sequence-range"
          max={THEATRE_SAMPLE.sequenceLength}
          min="0"
          onChange={handleSliderChange}
          step="0.01"
          type="range"
          value={position}
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <div className="grid min-h-[320px] place-items-center rounded-2xl border border-theme-border bg-theme-bg">
          <div
            ref={frameRef}
            className="flex h-44 w-44 items-center justify-center rounded-3xl border border-theme-fg bg-theme-surface text-center text-sm font-medium text-theme-fg"
          >
            Theatre object
          </div>
        </div>

        <div className="space-y-3 rounded-2xl border border-theme-border bg-theme-bg p-4 text-sm leading-6 text-theme-muted">
          <p>
            Saved state file: <code>{THEATRE_SAMPLE.statePath}</code>
          </p>
          <p>
            Current values: rotate {values.rotate.toFixed(1)}, lift{' '}
            {values.lift.toFixed(1)}, scale {values.scale.toFixed(2)}, glow{' '}
            {values.glow.toFixed(2)}
          </p>
          <p>
            This sample keeps Theatre isolated to a dev route while proving
            project, sheet, sequence, and object wiring.
          </p>
        </div>
      </div>
    </div>
  )
}
