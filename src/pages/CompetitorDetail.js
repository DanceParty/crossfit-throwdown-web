import React from 'react'
import {fetchCompetitor, fetchScores, fetchWorkouts} from '../utils/dataHelpers'
import {getWorkoutNamesForScores} from '../utils/helpers'
import Page from '../components/Page'
import ErrorBoundary from '../components/ErrorBoundary'

class CompetitorDetail extends React.Component {
  state = {
    firstName: '',
    lastName: '',
    division: '',
    affiliate: '',
    scores: [],
    isLoading: true,
    error: null,
  }

  componentDidMount() {
    this.fetchData()
  }

  fetchData = async () => {
    const {gender, competitorId} = this.props
    this.setState({isLoading: true})
    const {error: competitorErr, data: competitor} = await fetchCompetitor(gender, competitorId)
    const {error: scoresErr, data: scores} = await fetchScores(competitorId)
    const {error: workoutsErr, data: workouts} = await fetchWorkouts()

    const collectedErrors =
      competitorErr || scoresErr || workoutsErr
        ? {errors: {competitorErr, scoresErr, workoutsErr}}
        : null

    this.setState({
      firstName: competitor.firstName,
      lastName: competitor.lastName,
      division: competitor.division,
      affiliate: competitor.affiliate,
      scores: getWorkoutNamesForScores(scores, workouts),
      isLoading: false,
      error: collectedErrors,
    })
  }

  render() {
    const {scores, isLoading, error, ...competitor} = this.state
    return isLoading ? (
      <h1>Loading...</h1>
    ) : error ? (
      <h1>Error fetching data</h1>
    ) : (
      <Page header={`${competitor.firstName} ${competitor.lastName}`} link="/competitors">
        <div className="columns">
          <div className="column">
            <h1 className="subtitle">Affiliate:</h1>
            <h1 className="title">{competitor.affiliate}</h1>
          </div>
          <div className="column">
            <h1 className="subtitle">Division:</h1>
            <h1 className="title">{competitor.division}</h1>
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
                  {scores.map(score => (
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
    )
  }
}

export default CompetitorDetail
