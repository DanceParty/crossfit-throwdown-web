import {database} from './firebase'
import {normalizeDataIntoArray, sortObjectsByKey} from './helpers'

export const fetchCompetitors = async () => {
  const response = {
    data: null,
    error: null,
  }
  try {
    const menObj = await database.ref(`competitors/men`).once('value')
    const womenObj = await database.ref(`competitors/women`).once('value')

    const men = normalizeDataIntoArray(menObj.val())
    const women = normalizeDataIntoArray(womenObj.val())
    response.data = {
      men: men.sort((a, b) => sortObjectsByKey(a, b, 'lastName')),
      women: men.sort((a, b) => sortObjectsByKey(a, b, 'lastName')),
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
    response.data = {
      workouts: workouts.sort((a, b) => sortObjectsByKey(a, b, 'name')),
    }
  } catch (e) {
    response.error = e
  }
  return response
}

export const fetchScores = async competitorId => {
  const response = {
    data: null,
    error: null,
  }
  try {
    const scoresObj = await database
      .ref('scores')
      .orderByChild('competitorId')
      .equalTo(competitorId)
      .once('value')
    response.data = {
      scores: normalizeDataIntoArray(scoresObj),
    }
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
    const competitorObj = await database
      .ref(`competitors/${gender}/${id}`)
      .once('value')
    response.data = {
      competitor: competitorObj.val(),
    }
  } catch (e) {
    response.error = e
  }
  return response
}

export const fetchWorkout = async id => {
  try {
    const workout = await database.ref(`workouts/${id}`).once('value')
    return workout.val() ? workout.val() : null
  } catch (e) {
    console.log(e)
  }
}

// export const fetchScores = async (competitorId = null, workoutId = null) => {
//   try {
//     let data
//     if (competitorId) {

//     } else if (workoutId) {
//       data = await database
//         .ref('scores')
//         .orderByChild('workoutId')
//         .equalTo(workoutId)
//         .once('value')
//     } else {
//       data = await database.ref('scores').once('value')
//     }
//     return data.val() ? normalizeDataIntoArray(data.val()) : []
//   } catch (e) {
//     console.log(e)
//   }
// }
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
