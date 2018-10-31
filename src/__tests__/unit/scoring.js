import React from 'react'
import { calculateStandings } from '../../utils/scoring'

const competitors = [
  { id: 1, firstName: 'Keevan', lastName: 'Dance' },
  { id: 2, firstName: 'Jeehyae', lastName: 'Lee' },
  { id: 3, firstName: 'Taylor', lastName: 'Rocks' },
  { id: 4, firstName: 'Nes', lastName: 'Tea' },
]

const workouts = [
  { id: 1, name: 'Wod 1', type: 'Timed' },
  { id: 2, name: 'Wod 2', type: 'Weight' },
  { id: 3, name: 'Wod 3', type: 'Point' },
  { id: 4, name: 'Wod 4', type: 'Timed' },
]

const scores = [
  { id: 1, workoutId: 1, competitorId: 1, score: 100 },
  { id: 1, workoutId: 1, competitorId: 2, score: 500 },
  { id: 1, workoutId: 1, competitorId: 3, score: 300 },
  { id: 1, workoutId: 1, competitorId: 4, score: 200 },
  { id: 1, workoutId: 2, competitorId: 1, score: 500 },
  { id: 1, workoutId: 2, competitorId: 2, score: 200 },
  { id: 1, workoutId: 2, competitorId: 3, score: 100 },
  { id: 1, workoutId: 2, competitorId: 4, score: 150 },
  { id: 1, workoutId: 3, competitorId: 1, score: 150 },
  { id: 1, workoutId: 3, competitorId: 2, score: 250 },
  { id: 1, workoutId: 3, competitorId: 3, score: 300 },
  { id: 1, workoutId: 3, competitorId: 4, score: 500 },
  { id: 1, workoutId: 4, competitorId: 1, score: 100 },
  { id: 1, workoutId: 4, competitorId: 2, score: 200 },
  { id: 1, workoutId: 4, competitorId: 3, score: 300 },
  { id: 1, workoutId: 4, competitorId: 4, score: 400 },
]

const expected = [
  { id: 1, firstName: 'Keevan', lastName: 'Dance', totalScore: 7 },
  { id: 2, firstName: 'Jeehyae', lastName: 'Lee', totalScore: 11 },
  { id: 3, firstName: 'Taylor', lastName: 'Rocks', totalScore: 12 },
  { id: 4, firstName: 'Nes', lastName: 'Tea', totalScore: 10 },
]

test('calculateTotalScore - output an array of competitors with their total score', () => {
  const competitorsWithTotalScore = calculateStandings(
    workouts,
    scores,
    competitors
  )
  expect(competitorsWithTotalScore).toEqual(expected)
})
