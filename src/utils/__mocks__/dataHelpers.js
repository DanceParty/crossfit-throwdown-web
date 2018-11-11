import * as data from '../../../seedData.json'
import {normalizeDataIntoArray, sortObjectsByKey, splitByDivision} from '../helpers'

export const postCompetitor = jest.fn(competitor => null)
export const postWorkout = jest.fn(workout => null)
export const postScores = jest.fn(scores => null)
export const fetchCompetitors = jest.fn(() => {
  const men = normalizeDataIntoArray(data.competitors.men).sort((a, b) =>
    sortObjectsByKey(a, b, 'lastName'),
  )
  const women = normalizeDataIntoArray(data.competitors.women).sort((a, b) =>
    sortObjectsByKey(a, b, 'lastName'),
  )
  return {
    data: {
      men: {rx: splitByDivision(men).rx, scaled: splitByDivision(men).scaled},
      women: {rx: splitByDivision(women).rx, scaled: splitByDivision(women).scaled},
    },
    error: null,
  }
})
export const fetchWorkouts = jest.fn(() => {
  const workouts = normalizeDataIntoArray(data.workouts)
  return {data: workouts.sort((a, b) => sortObjectsByKey(a, b, 'name')), error: null}
})
export const fetchScores = jest.fn((competitorId, workoutId) => {
  let scores = normalizeDataIntoArray(data.scores)
  return competitorId
    ? {data: scores.filter(score => score.competitorId === competitorId), error: null}
    : workoutId
      ? {data: scores.filter(score => score.workoutId === workoutId), error: null}
      : {data: scores, error: null}
})
export const fetchWorkout = jest.fn(workoutId => {
  const workout = data.workouts[workoutId]
  workout.rx = workout.rx.map((step, i) => ({key: i, step}))
  workout.scaled = workout.scaled.map((step, i) => ({key: i, step}))
  return {
    data: workout,
    error: null,
  }
})
