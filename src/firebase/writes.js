import {database} from './firebase'

export async function updateScores(scores) {
  try {
    await database.ref().update(scores)
    return [null, true]
  } catch (e) {
    return [e]
  }
}

export async function updateCompetitor(url, competitor) {
  try {
    await database.ref(url).update(competitor)
    return [null, true]
  } catch (e) {
    return [e]
  }
}

export async function updateWorkout(url, workout) {
  try {
    await database.ref(url).update(workout)
    return [null, true]
  } catch (e) {
    return [e]
  }
}

export async function addCompetitor(competitor) {
  try {
    const newCompetitor = await database.ref('competitors').push(competitor)
    await addScoresForCompetitor(newCompetitor.key)
    return [null, newCompetitor]
  } catch (e) {
    return [e]
  }
}

export async function addWorkout(workout) {
  try {
    const newWorkout = await database.ref('workouts').push(workout)
    await addScoresForWorkout(newWorkout.key)
    return [null, newWorkout]
  } catch (e) {
    return [e]
  }
}

async function addScoresForCompetitor(competitorId) {
  try {
    const workouts = await database.ref('workouts').once('value')
    if (workouts.val()) {
      Object.keys(workouts.val()).forEach(workoutId => {
        database.ref('scores').push({competitorId, workoutId, score: 0})
      })
    }
    return [null, true]
  } catch (e) {
    return [e]
  }
}

async function addScoresForWorkout(workoutId) {
  try {
    const competitors = await database.ref('competitors').once('value')
    if (competitors.val()) {
      Object.keys(competitors.val()).forEach(competitorId => {
        database.ref('scores').push({workoutId, competitorId, score: 0})
      })
    }
    return [null, true]
  } catch (e) {
    return [e]
  }
}
