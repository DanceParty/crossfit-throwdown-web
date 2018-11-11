import {
  addTotalScoreToCompetitors,
  addScoresToCompetitors,
  getScoresByWorkoutId,
  getScoresForCompetitors,
  calculateTotalScore,
  sortCompetitorsListByScore,
  calculateTie,
} from './helpers'

export function calculateStandings(workouts, scores) {
  return function(competitors) {
    // add totalScore attribute to competitors
    let competitorsWithTotalScore = addTotalScoreToCompetitors(competitors)
    // // split scores by division
    const scoresForCompetitors = getScoresForCompetitors(scores, competitorsWithTotalScore)
    workouts.forEach(workout => {
      // get scores for workout
      const scoresForCurrentWorkout = getScoresByWorkoutId(scoresForCompetitors, workout.id)
      // sort competitors by score
      const sortedCompetitors = sortCompetitorsListByScore(
        competitorsWithTotalScore,
        scoresForCurrentWorkout,
        workout.type,
      )
      // increment total score (this works for both valid and invalid scores)
      competitorsWithTotalScore = calculateTotalScore(sortedCompetitors)
    })
    // calculate overall ties
    let tieCounter = competitorsWithTotalScore.length
    const competitorsWithStandings = competitorsWithTotalScore.map((competitor, i, origArr) => {
      const isTie = calculateTie(competitor, origArr, i, 'totalScore')
      if (isTie) {
        return {...competitor, standing: tieCounter}
      }
      tieCounter--
      return {...competitor, standing: i + 1}
    })
    return competitorsWithStandings
  }
}

export function sortCompetitorsByNormalWorkout(competitors, scores) {
  const [validScores, validCompetitors, invalidCompetitors] = splitScoresByValidity(
    competitors,
    scores,
  )
  // add scores to competitors
  const validCompetitorsWithScore = addScoresToCompetitors(validCompetitors, validScores)
  const sortedCompetitors = validCompetitorsWithScore.sort((a, b) => {
    return b.score - a.score
  })
  return [...sortedCompetitors, ...invalidCompetitors]
}

export function sortCompetitorsByTimedWorkout(competitors, scores) {
  const [validScores, validCompetitors, invalidCompetitors] = splitScoresByValidity(
    competitors,
    scores,
  )
  // sort the competitors that have a score
  const validCompetitorsWithScore = addScoresToCompetitors(validCompetitors, validScores)
  const sortedCompetitors = validCompetitorsWithScore.sort((a, b) => {
    return a.score - b.score
  })
  // return each group of competitors
  return [...sortedCompetitors, ...invalidCompetitors]
}

function splitScoresByValidity(competitors, scores) {
  // get scores with that are valid (not zero)
  const validScores = scores.filter(score =>
    competitors.some(competitor => competitor.id === score.competitorId && score.score !== 0),
  )

  // get all scores that are non-valid (zero)
  const invalidScores = scores.filter(score =>
    competitors.some(competitor => competitor.id === score.competitorId && score.score === 0),
  )

  // match valid scores to competitors
  const validCompetitors = competitors.filter(competitor =>
    validScores.some(score => competitor.id === score.competitorId),
  )

  // match invalid scores to competitors
  const invalidCompetitors = competitors.filter(competitor =>
    invalidScores.some(score => competitor.id === score.competitorId),
  )

  return [validScores, validCompetitors, invalidCompetitors]
}
