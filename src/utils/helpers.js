import {sortCompetitorsByNormalWorkout, sortCompetitorsByTimedWorkout} from './scoring'

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

export const sortCompetitorsListByScore = (competitors, scores, workoutType) => {
  return workoutType === 'Timed'
    ? sortCompetitorsByTimedWorkout(competitors, scores)
    : sortCompetitorsByNormalWorkout(competitors, scores)
}

export const sortObjectsByKey = (a, b, key) => {
  if (a[key] > b[key]) {
    return 1
  } else if (a[key] < b[key]) {
    return -1
  }
  return 0
}

export const addTotalScoreToCompetitors = competitors => {
  const totalScoreCompetitors = competitors.map(competitor => ({
    ...competitor,
    totalScore: 0,
  }))
  return totalScoreCompetitors
}

export const addScoresToCompetitors = (competitors, scores) => {
  const competitorsWithScore = competitors.map(competitor => {
    const scoreObj = scores.find(score => score.competitorId === competitor.id)
    return {...competitor, score: scoreObj.score}
  })
  return competitorsWithScore
}

export const getScoresByWorkoutId = (allScores, workoutId) => {
  const filteredScores = allScores.filter(score => workoutId === score.workoutId)
  return filteredScores
}

export const getScoresForCompetitors = (allScores, competitors) => {
  const filteredScores = allScores.filter(({competitorId}) =>
    competitors.some(competitor => competitor.id === competitorId),
  )
  return filteredScores
}

export const calculateTotalScore = competitors => {
  let tieCounter = competitors.length
  const updatedCompetitors = competitors.map((competitorWithScore, index, originalArr) => {
    const {score, ...competitor} = competitorWithScore
    // check if competitor has a valid score associated
    if (score) {
      const isTie = calculateTie(competitorWithScore, originalArr, index, 'score')
      if (!isTie) {
        tieCounter--
        return {...competitor, totalScore: competitor.totalScore + (index + 1)}
      }
      return {...competitor, totalScore: competitor.totalScore + tieCounter}
    }
    // not valid score, add to bottom
    return {...competitor, totalScore: competitor.totalScore + competitors.length}
  })
  return updatedCompetitors
}

export const calculateTie = (currCompetitor, array, currIndex, key) => {
  if (array[currIndex - 1] && currCompetitor[key] === array[currIndex - 1][key]) {
    return true
  }
  if (array[currIndex + 1] && currCompetitor[key] === array[currIndex + 1][key]) {
    return true
  }
  return false
}
