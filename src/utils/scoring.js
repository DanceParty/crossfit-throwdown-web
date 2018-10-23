import { sortTimedWorkout, sortNormalWorkout } from './helpers'

const sortByTotalScore = competitors => {
  return competitors.sort((a, b) => {
    return a.totalScore - b.totalScore
  })
}

const incrementTotalScore = (fullCompetitors, zeroCompetitors) => {
  return fullCompetitors.map((competitor, index) => {
    if (zeroCompetitors.includes(competitor)) {
      const score = fullCompetitors.length
      return {
        ...competitor,
        totalScore: competitor.totalScore + score,
      }
    }
    const score = index + 1
    return {
      ...competitor,
      totalScore: competitor.totalScore + score,
    }
  })
}

export const calculateTotalScore = (workouts, scores) => competitors => {
  let competitorsWithTotalScore = competitors.map(competitor => ({
    ...competitor,
    totalScore: 0,
  }))

  workouts.forEach(workout => {
    const currentWorkoutScores = scores.filter(score => {
      return score.workoutId === workout.id
    })
    let result = {}
    if (workout.type === 'Timed') {
      result = sortTimedWorkout(competitorsWithTotalScore, currentWorkoutScores)
    } else {
      result = sortNormalWorkout(
        competitorsWithTotalScore,
        currentWorkoutScores
      )
    }
    competitorsWithTotalScore = incrementTotalScore(
      competitorsWithTotalScore,
      result.zeroCompetitors
    )
  })
  return sortByTotalScore(competitorsWithTotalScore)
}
