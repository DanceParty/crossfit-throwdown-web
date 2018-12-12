import {firebase, database} from '../utils/firebase'

export async function login(email, password) {
  try {
    await firebase.auth().signInWithEmailAndPassword(email, password)
    const user = firebase.auth().currentUser
    return [null, user]
  } catch (e) {
    return [e]
  }
}

export async function currentUser() {
  return firebase.auth().currentUser
}

export async function allCompetitors() {
  try {
    const data = await database.ref('competitors').once('value')
    return [null, data.val()]
  } catch (e) {
    return [e]
  }
}

export async function allWorkouts() {
  try {
    const data = await database.ref('workouts').once('value')
    return [null, data.val()]
  } catch (e) {
    return [e]
  }
}

export async function allScores() {
  try {
    const data = await database.ref('scores').once('value')
    return [null, data.val()]
  } catch (e) {
    return [e]
  }
}

export async function allScoresByCompetitor(competitorId) {
  try {
    const data = await database
      .ref('scores')
      .orderByChild('competitorId')
      .equalTo(competitorId)
      .once('value')
    return [null, data.val()]
  } catch (e) {
    return [e]
  }
}

export async function allScoresByWorkout(workoutId) {
  try {
    const data = await database
      .ref('scores')
      .orderByChild('workoutId')
      .equalTo(workoutId)
      .once('value')
    return [null, data.val()]
  } catch (e) {
    return [e]
  }
}

export async function competitor(id) {
  try {
    const data = await database.ref(`competitors/${id}`).once('value')
    return [null, data.val()]
  } catch (e) {
    return [e]
  }
}

export async function workout(id) {
  try {
    const data = await database.ref(`workouts/${id}`).once('value')
    return [null, data.val()]
  } catch (e) {
    return [e]
  }
}
