import { getProject, types } from '@theatre/core'
import savedState from './theatre-sequence.state.json'

export const THEATRE_SAMPLE = {
  projectId: 'Dev Lab Theatre',
  sheetId: 'Sequence Playground',
  objectKey: 'Sequence Card',
  statePath: 'src/scenes/dev/theatre-sequence.state.json',
  sequenceLength: 4,
}

export function getTheatreSampleSheet() {
  return getProject(THEATRE_SAMPLE.projectId, { state: savedState }).sheet(
    THEATRE_SAMPLE.sheetId
  )
}

export function createTheatreSampleObject(sheet) {
  return sheet.object(
    THEATRE_SAMPLE.objectKey,
    {
      rotate: types.number(0, { range: [-180, 180] }),
      lift: types.number(0, { range: [-64, 64] }),
      scale: types.number(1, { range: [0.8, 1.2] }),
      glow: types.number(0, { range: [0, 1] }),
    },
    { reconfigure: true }
  )
}

export function valuesFromPlayhead(position) {
  const progress = (position % THEATRE_SAMPLE.sequenceLength) / THEATRE_SAMPLE.sequenceLength
  const radians = progress * Math.PI * 2

  return {
    rotate: progress * 360,
    lift: Math.sin(radians) * 24,
    scale: 1 + Math.cos(radians) * 0.08,
    glow: (Math.sin(radians) + 1) / 2,
  }
}
