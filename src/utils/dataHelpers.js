import { database } from './firebase'
import { normalizeDataIntoArray, sort } from './helpers'

export const fetchCompetitor = async (gender, id) => {
  try {
    const data = await database.ref(`competitors/${gender}/${id}`).once('value')
    return data.val() ? data.val() : null
  } catch (e) {
    console.log(e)
  }
}

export const fetchWorkout = async id => {
  try {
    const workout = await database.ref(`workouts/${id}`).once('value')
    return workout.val() ? workout.val() : null
  } catch (e) {
    console.log(e)
  }
}

export const fetchScores = async (competitorId = null, workoutId = null) => {
  try {
    let data
    if (competitorId) {
      data = await database
        .ref('scores')
        .orderByChild('competitorId')
        .equalTo(competitorId)
        .once('value')
    } else if (workoutId) {
      data = await database
        .ref('scores')
        .orderByChild('workoutId')
        .equalTo(workoutId)
        .once('value')
    } else {
      data = await database.ref('scores').once('value')
    }
    return data.val() ? normalizeDataIntoArray(data.val()) : []
  } catch (e) {
    console.log(e)
  }
}

export const fetchWorkouts = async () => {
  try {
    const data = await database.ref('workouts').once('value')
    return data.val()
      ? normalizeDataIntoArray(data.val()).sort((a, b) => sort(a, b, 'name'))
      : []
  } catch (e) {
    console.log(e)
  }
}

export const fetchCompetitors = async (gender = '') => {
  try {
    const data = await database.ref(`competitors/${gender}`).once('value')

    if (data.val()) {
      const competitors = normalizeDataIntoArray(data.val())
      return competitors.sort((a, b) => sort(a, b, 'lastName'))
    }
  } catch (e) {
    console.log(e)
  }
}

export const postCompetitor = async (competitor, gender) => {
  try {
    // create competitor
    const newCompetitor = await database
      .ref(`competitors/${gender}`)
      .push(competitor)

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

    const men = await database.ref('competitors/Male').once('value')

    const women = await database.ref('competitors/Female').once('value')

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
