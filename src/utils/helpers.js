export const normalizeDataIntoArray = objectOfObjects => {
  const arrayOfObjects = Object.keys(objectOfObjects).map(key => {
    return {id: key, ...objectOfObjects[key]}
  })
  return arrayOfObjects
}

export const splitByDivision = people => {
  const rx = people.filter(one => one.division === 'RX')
  const scaled = people.filter(one => one.division === 'Scaled')
  return {rx, scaled}
}

export const getWorkoutNamesForScores = (scores, workouts) => {
  const scoresWithWorkoutNames = scores.map(score => {
    const result = workouts.find(workout => {
      return workout.id === score.workoutId
    })
    return result ? {...score, workoutName: result.name} : {...score}
  })
  return scoresWithWorkoutNames.sort((a, b) => {
    const getNumberFromString = /\d+/g
    const aNum = a.workoutName.match(getNumberFromString)
    const bNum = b.workoutName.match(getNumberFromString)
    if (aNum < bNum) {
      return -1
    } else if (aNum > bNum) {
      return 1
    } else {
      return 0
    }
  })
}
