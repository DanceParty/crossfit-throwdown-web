import {database} from './firebase'
import {normalizeDataIntoArray, sortObjectsByKey, splitByDivision} from './helpers'

export const fetchCompetitors = async () => {
  const response = {
    data: null,
    error: null,
  }
  try {
    const menObj = await database.ref(`competitors/men`).once('value')
    const womenObj = await database.ref(`competitors/women`).once('value')
    const men = normalizeDataIntoArray(menObj.val()).sort((a, b) =>
      sortObjectsByKey(a, b, 'lastName'),
    )
    const women = normalizeDataIntoArray(womenObj.val()).sort((a, b) =>
      sortObjectsByKey(a, b, 'lastName'),
    )
    response.data = {
      men: {
        rx: splitByDivision(men).rx,
        scaled: splitByDivision(men).scaled,
      },
      women: {
        rx: splitByDivision(women).rx,
        scaled: splitByDivision(women).scaled,
      },
    }
  } catch (e) {
    response.error = e
  }
  return response
}

export const fetchWorkouts = async () => {
  const response = {
    data: null,
    error: null,
  }
  try {
    const workoutsObj = await database.ref('workouts').once('value')
    const workouts = normalizeDataIntoArray(workoutsObj.val())
    response.data = workouts.sort((a, b) => sortObjectsByKey(a, b, 'name'))
  } catch (e) {
    response.error = e
  }
  return response
}

export const fetchScores = async (competitorId, workoutId) => {
  const response = {
    data: null,
    error: null,
  }
  try {
    let scoresObj
    if (competitorId) {
      scoresObj = await database
        .ref('scores')
        .orderByChild('competitorId')
        .equalTo(competitorId)
        .once('value')
    } else if (workoutId) {
      scoresObj = await database
        .ref('scores')
        .orderByChild('workoutId')
        .equalTo(workoutId)
        .once('value')
    } else {
      scoresObj = await database.ref('scores').once('value')
    }
    response.data = normalizeDataIntoArray(scoresObj.val())
  } catch (e) {
    response.error = e
  }
  return response
}

export const fetchCompetitor = async (gender, id) => {
  const response = {
    data: null,
    error: null,
  }
  try {
    const competitorObj = await database.ref(`competitors/${gender}/${id}`).once('value')
    response.data = competitorObj.val()
  } catch (e) {
    response.error = e
  }
  return response
}

export const fetchWorkout = async id => {
  const response = {
    data: null,
    error: null,
  }
  try {
    const workoutObj = await database.ref(`workouts/${id}`).once('value')
    const workout = workoutObj.val()
    workout.rx = workout.rx.map((step, i) => ({key: i, step}))
    workout.scaled = workout.scaled.map((step, i) => ({key: i, step}))
    response.data = workout
  } catch (e) {
    response.error = e
  }
  return response
}

export const postCompetitor = async (competitor, gender) => {
  try {
    // create competitor
    const newCompetitor = await database.ref(`competitors/${gender}`).push(competitor)

    const competitorId = newCompetitor.key

    // get all workouts
    const workouts = await database.ref('workouts').once('value')

    if (workouts.val()) {
      // for each workout, create a new score for this competitor
      Object.keys(workouts.val()).forEach(key => {
        const workoutId = key
        const score = {
          competitorId,
          workoutId,
          score: 0,
        }
        database.ref('scores').push(score)
      })
    }
  } catch (e) {
    console.log(e)
  }
}

export const postWorkout = async workout => {
  try {
    const newWorkout = await database.ref('workouts').push(workout)

    const workoutId = newWorkout.key

    const men = await database.ref('competitors/men').once('value')

    const women = await database.ref('competitors/women').once('value')

    if (men.val()) {
      Object.keys(men.val()).forEach(key => {
        const score = {
          workoutId,
          competitorId: key,
          score: 0,
        }
        database.ref('scores').push(score)
      })
    }

    if (women.val()) {
      Object.keys(women.val()).forEach(key => {
        const score = {
          workoutId,
          competitorId: key,
          score: 0,
        }
        database.ref('scores').push(score)
      })
    }
  } catch (e) {
    console.log(e)
  }
}

export const postScores = scores => {
  try {
    database.ref().update(scores)
  } catch (e) {
    console.log(e)
  }
}
