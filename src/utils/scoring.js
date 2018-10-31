import {sortTimedWorkout, sortNormalWorkout} from './helpers'

const getSortedCompetitorsAndZeroPointCompetitors = (
  workoutType,
  scores,
  competitors,
) => {
  let sortedCompetitors
  if (workoutType === 'Timed') {
    sortedCompetitors = sortTimedWorkout(competitors, scores)
  } else {
    sortedCompetitors = sortNormalWorkout(competitors, scores)
  }
  return sortedCompetitors
}

export const calculateStandings = (
  workouts,
  scores,
  competitorsWithSameDivision,
) => {
  // add total score object to competitors
  // this will hold the sum of index when sorted
  let competitorsWithTotalScore = competitorsWithSameDivision.map(
    competitor => ({
      ...competitor,
      totalScore: 0,
    }),
  )

  // filter away scores that are not relevant for this set of competitors
  // and workouts
  const scoresForCurrentCompetitors = scores.filter(score => {
    return competitorsWithSameDivision.some(competitor => {
      return competitor.id === score.competitorId
    })
  })

  workouts.forEach(workout => {
    const scoresForCurrentWorkout = scoresForCurrentCompetitors.filter(
      score => {
        return workout.id === score.workoutId
      },
    )

    // get a sorted list of competitors who have a score for the current workout
    // and a list of competitors who did not participate (0 for score)
    const {
      sortedCompetitors,
      zeroCompetitors,
    } = getSortedCompetitorsAndZeroPointCompetitors(
      workout.type,
      scoresForCurrentWorkout,
      competitorsWithTotalScore,
    )

    // figure out total score of participating competitors
    // by adding the index + 1 to the total score
    const sortedCompetitorsWithTotalScore = sortedCompetitors.map(
      (competitor, i) => {
        const score = i + 1
        return {
          ...competitor,
          totalScore: competitor.totalScore + score,
        }
      },
    )

    // total score for non participating competitors is just last place
    // aka the length of the sorted array, because if there are 10 competitors
    // and 2 people didn't participate, they should both be tied for 8th instead
    // of tied for 10th
    const zeroPointCompetitorsWithTotalScore = zeroCompetitors.map(
      competitor => {
        const score = sortedCompetitors.length
        return {
          ...competitor,
          totalScore: competitor.totalScore + score,
        }
      },
    )

    // spread the arrays with updated total points, so they persist across
    // all the workout comparisons
    competitorsWithTotalScore = [
      ...sortedCompetitorsWithTotalScore,
      ...zeroPointCompetitorsWithTotalScore,
    ]
  })
  return competitorsWithTotalScore
}
