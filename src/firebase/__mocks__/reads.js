import * as data from '../../testData'

const {competitors, workouts, scores} = data

export const allCompetitors = jest.fn(() => {
  return competitors
})

export const allScores = jest.fn(() => {
  return scores
})

export const allWorkouts = jest.fn(() => {
  return workouts
})

export const competitor = jest.fn(competitorId => {
  return competitors[competitorId]
})

export const workout = jest.fn(workoutId => {
  return workouts[workoutId]
})

export const allScoresForCompetitor = jest.fn(competitorId => {
  const scoresArr = Object.keys(scores).map(scoreId => scores[scoreId])
  return scoresArr.filter(score => score.competitorId === competitorId)
})

export const allScoresForWorkout = jest.fn(workoutId => {
  const scoresArr = Object.keys(scores).map(scoreId => scores[scoreId])
  return scoresArr.filter(score => score.workoutId === workoutId)
})

export const login = jest.fn((email, password) => {
  if (email.length > 0 && password.length > 0) {
    return [null, {email}]
  } else {
    return ['Invalid email and password']
  }
})

export const currentUser = jest.fn(() => true)
