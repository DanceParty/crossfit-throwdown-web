import {normalizeDataIntoArray, sortObjectsByKey, splitByDivision} from '../helpers'
import * as data from '../../testData.json'

const {competitors, workouts, scores} = data

export const postCompetitor = jest.fn((competitor, gender) => null)

export const postWorkout = jest.fn(workout => null)

export const postScores = jest.fn(scores => null)

export const updateCompetitor = jest.fn((url, competitor) => null)

export const updateWorkout = jest.fn((url, workout) => null)

export const fetchCompetitors = jest.fn(() => {
  const men = normalizeDataIntoArray(competitors.men).sort((a, b) =>
    sortObjectsByKey(a, b, 'lastName'),
  )
  const women = normalizeDataIntoArray(competitors.women).sort((a, b) =>
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
  const workoutsArr = normalizeDataIntoArray(workouts)
  return {data: workoutsArr.sort((a, b) => sortObjectsByKey(a, b, 'name')), error: null}
})

export const fetchScores = jest.fn((competitorId, workoutId) => {
  let scoresArr = normalizeDataIntoArray(scores)
  return competitorId
    ? {data: scoresArr.filter(score => score.competitorId === competitorId), error: null}
    : workoutId
      ? {data: scoresArr.filter(score => score.workoutId === workoutId), error: null}
      : {data: scoresArr, error: null}
})

export const fetchWorkout = jest.fn(workoutId => {
  const workout = workouts[workoutId]
  workout.rx = workout.rx.map((step, i) => ({key: i, step}))
  workout.scaled = workout.scaled.map((step, i) => ({key: i, step}))
  return {
    data: workout,
    error: null,
  }
})

export const fetchCompetitor = jest.fn((gender, id) => ({
  data: competitors[gender][id],
  error: null,
}))

export const login = jest.fn((email, password) => {
  if (email === 'test@test.com' && password === 'test') {
    return {data: {email: 'test@test.com'}, error: null}
  }
  return {data: null, error: 'invalid email and password'}
})

export const checkCurrentUser = jest.fn(() => true)
