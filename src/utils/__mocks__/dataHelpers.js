import {normalizeDataIntoArray, sortObjectsByKey, splitByDivision} from '../helpers'

export const postCompetitor = jest.fn(competitor => null)

export const postWorkout = jest.fn(workout => null)

export const postScores = jest.fn(scores => null)

export const updateCompetitor = jest.fn((url, competitor) => null)

export const updateWorkout = jest.fn((url, workout) => null)

export const fetchCompetitors = jest.fn(() => {
  const menResponse = {
    '1': {
      affiliate: '',
      division: 'RX',
      firstName: 'Marco',
      lastName: 'Polo',
    },
    '2': {
      affiliate: 'Crossfit Yuma',
      division: 'Scaled',
      firstName: 'Colby',
      lastName: 'Carr',
    },
  }
  const womenResponse = {
    '3': {
      affiliate: '',
      division: 'RX',
      firstName: 'Lady',
      lastName: 'Byrnes',
    },
    '4': {
      affiliate: 'Crossfit Sideways',
      division: 'Scaled',
      firstName: 'Julie',
      lastName: 'Dance',
    },
  }
  const men = normalizeDataIntoArray(menResponse).sort((a, b) => sortObjectsByKey(a, b, 'lastName'))
  const women = normalizeDataIntoArray(womenResponse).sort((a, b) =>
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
  const workoutsResponse = {
    '1': {
      name: 'WOD #1A',
      rx: ['500m Row'],
      scaled: ['500m Row'],
      standards:
        'Athletes will have 3 minutes to complete the row. If the athlete does not complete the prescribed work within the 3 minute time cap, their score will be the amount of work completed at the time cap. Athletes will not advance to the next segment until the allotted 3 minutes has expired.',
      type: 'Timed',
    },
    '2': {
      name: 'WOD #1B',
      rx: ['40/30 Calorie Assault Bike', '20 minute Jog'],
      scaled: ['100000 jumping jacks', 'backwards bicycle ride'],
      standards:
        'Athletes will have 3 minutes to complete the bike. If the athlete does not complete the prescribed work within the 3 minute time cap, their score will be the amount of work completed at the time cap. Athletes will not advance to the next segment until the allotted 3 minutes has expired. Men in both divisions will complete 40 calories on the Assault Bike and women will complete 30 calories.',
      type: 'Weight',
    },
  }
  const workouts = normalizeDataIntoArray(workoutsResponse)
  return {data: workouts.sort((a, b) => sortObjectsByKey(a, b, 'name')), error: null}
})

export const fetchScores = jest.fn((competitorId, workoutId) => {
  const scoresResult = {
    '1': {competitorId: '1', workoutId: '1', score: 0},
    '2': {competitorId: '1', workoutId: '2', score: 0},
    '3': {competitorId: '2', workoutId: '1', score: 0},
    '4': {competitorId: '2', workoutId: '2', score: 0},
    '5': {competitorId: '3', workoutId: '1', score: 0},
    '6': {competitorId: '3', workoutId: '2', score: 0},
    '7': {competitorId: '4', workoutId: '1', score: 0},
    '8': {competitorId: '4', workoutId: '2', score: 0},
  }
  let scores = normalizeDataIntoArray(scoresResult)
  return competitorId
    ? {data: scores.filter(score => score.competitorId === competitorId), error: null}
    : workoutId
      ? {data: scores.filter(score => score.workoutId === workoutId), error: null}
      : {data: scores, error: null}
})

export const fetchWorkout = jest.fn(workoutId => {
  const workoutResult = {
    name: 'WOD #1A',
    rx: ['500m Row'],
    scaled: ['500m Row'],
    standards:
      'Athletes will have 3 minutes to complete the row. If the athlete does not complete the prescribed work within the 3 minute time cap, their score will be the amount of work completed at the time cap. Athletes will not advance to the next segment until the allotted 3 minutes has expired.',
    type: 'Timed',
  }
  const workout = workoutResult
  workout.rx = workout.rx.map((step, i) => ({key: i, step}))
  workout.scaled = workout.scaled.map((step, i) => ({key: i, step}))
  return {
    data: workout,
    error: null,
  }
})

export const fetchCompetitor = jest.fn((gender, id) => {
  const competitorResult = {
    affiliate: 'Crossfit Yuma',
    division: 'Scaled',
    firstName: 'Colby',
    lastName: 'Carr',
  }
  return {data: competitorResult, error: null}
})

export const login = jest.fn((email, password) => {
  if (email === 'test@test.com' && password === 'test') {
    return {data: {email: 'test@test.com'}, error: null}
  }
  return {data: null, error: 'invalid email and password'}
})

export const checkCurrentUser = jest.fn(() => true)
