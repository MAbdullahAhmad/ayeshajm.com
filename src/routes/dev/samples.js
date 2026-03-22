export const devSamples = [
  {
    slug: 'rotate-on-scroll',
    title: 'Rotate On Scroll',
    summary:
      'A GSAP ScrollTrigger sandbox for scrubbed scroll rotation and cleanup behavior.',
    goal: 'Validate scroll-linked rotation before building production interactions.',
    notes: [
      'Registers and tears down ScrollTrigger cleanly on route mount and unmount.',
      'Uses a sticky viewport and long scroll range so scrub behavior is obvious.',
      'Surfaces live progress so thresholds and timing can be inspected quickly.',
    ],
    lazy: () => import('@/pages/dev/rotate-on-scroll/route.jsx'),
  },
  {
    slug: 'theatre-sequence',
    title: 'Theatre Sequence',
    summary:
      'A TheatreJS playground for sequence position, object values, and saved state wiring.',
    goal: 'Validate Theatre project, sheet, and object plumbing in isolation.',
    notes: [
      'Loads a saved on-disk Theatre project state from src/scenes/dev.',
      'Drives a Theatre object from the sequence playhead so DOM motion can be inspected quickly.',
      'Keeps the sample route dev-only while reusing the existing dev studio initialization.',
    ],
    lazy: () => import('@/pages/dev/theatre-sequence/route.jsx'),
  },
  {
    slug: 'r3f-basics',
    title: 'R3F Basics',
    summary:
      'A minimal React Three Fiber route that proves the canvas shell, lights, and controls.',
    goal: 'Validate the baseline Three and R3F route setup before real assets.',
    notes: [
      'Mounts a standalone Canvas route without affecting guest pages.',
      'Uses only primitive geometry, lights, and OrbitControls.',
      'Acts as the lowest-risk place to test future scene helpers and camera setup.',
    ],
    lazy: () => import('@/pages/dev/r3f-basics/route.jsx'),
  },
]

export function getDevSample(slug) {
  return devSamples.find((sample) => sample.slug === slug)
}

export function getAdjacentDevSamples(slug) {
  const index = devSamples.findIndex((sample) => sample.slug === slug)

  return {
    previous: index > 0 ? devSamples[index - 1] : null,
    next: index >= 0 && index < devSamples.length - 1 ? devSamples[index + 1] : null,
  }
}
