import React from 'react'
import {
  fetchCompetitor,
  fetchScores,
  fetchWorkouts,
} from '../utils/dataHelpers'
import Page from '../components/Page'
import ErrorBoundary from '../components/ErrorBoundary'

class CompetitorDetail extends React.Component {
  state = {
    firstName: null,
    lastName: null,
    division: null,
    affiliate: null,
    scores: null,
    workouts: null,
  }

  componentDidMount() {
    this.fetchData()
  }

  fetchData = async () => {
    const { firstName, lastName, division, affiliate } = await fetchCompetitor(
      this.props.gender,
      this.props.competitorId
    )
    const scores = await fetchScores(this.props.competitorId)
    const workouts = await fetchWorkouts()
    this.setState({
      firstName,
      lastName,
      division,
      affiliate,
      scores,
      workouts,
    })
  }

  matchScoreWithWorkout = (scores, workouts) => {
    const scoresWithWorkoutNames = scores.map(score => {
      const result = workouts.find(workout => {
        return workout.id === score.workoutId
      })
      return result ? { ...score, workoutName: result.name } : { ...score }
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

  render() {
    const {
      firstName,
      lastName,
      division,
      affiliate,
      scores,
      workouts,
    } = this.state
    return scores &&
      workouts &&
      firstName &&
      lastName &&
      division &&
      affiliate ? (
      <Page header={`${firstName} ${lastName}`} link="/competitors">
        <div className="columns">
          <div className="column">
            <h1 className="subtitle">Affiliate:</h1>
            <h1 className="title">{affiliate}</h1>
          </div>
          <div className="column">
            <h1 className="subtitle">Division:</h1>
            <h1 className="title">{division}</h1>
          </div>
        </div>
        <div className="columns">
          <div className="column">
            <h1 className="subtitle">Scores:</h1>
            <ErrorBoundary>
              <table className="table">
                <thead>
                  <tr>
                    <th>Workout</th>
                    <th>Score</th>
                  </tr>
                </thead>
                <tbody>
                  {this.matchScoreWithWorkout(scores, workouts).map(score => (
                    <tr key={score.id}>
                      <td>{score.workoutName}</td>
                      <td>{score.score}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </ErrorBoundary>
          </div>
        </div>
      </Page>
    ) : (
      <h1>Loading...</h1>
    )
  }
}

export default CompetitorDetail
