import React from 'react'
import {fetchCompetitor, fetchScores, fetchWorkouts, updateCompetitor} from '../utils/dataHelpers'
import {getWorkoutNamesForScores} from '../utils/helpers'
import Page from '../components/Page'
import Table from '../components/Table'
import Button from '../components/Button'
import CompetitorForm from '../components/CompetitorForm'
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
    isEditing: false,
  }

  componentDidMount() {
    this.fetchData()
  }

  fetchData = async () => {
    this.setState({isLoading: true})
    const {gender, competitorId} = this.props
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

  toggleEdit = () => {
    this.setState(({isEditing}) => ({isEditing: !isEditing}))
  }

  onSubmit = async competitor => {
    await updateCompetitor(this.props.uri, competitor)
    this.toggleEdit()
    this.fetchData()
  }

  render() {
    const {scores, isLoading, error, isEditing, ...competitor} = this.state
    return isLoading ? (
      <h1>Loading...</h1>
    ) : error ? (
      <h1>Error fetching data</h1>
    ) : (
      <Page header={`${competitor.firstName} ${competitor.lastName}`} link="/competitors">
        <div className="columns">
          <div className="column has-text-centered">
            {isEditing ? (
              <CompetitorForm
                firstName={competitor.firstName}
                lastName={competitor.lastName}
                division={competitor.division}
                gender={this.props.gender}
                affiliate={competitor.affiliate}
                onSubmit={this.onSubmit}
                enableGender={false}
              />
            ) : (
              <>
                <Button color="light" small onClick={this.toggleEdit}>
                  Edit
                </Button>
                <div className="columns">
                  <div className="column has-text-centered">
                    <h1 className="subtitle">Affiliate:</h1>
                    <h1 className="title">{competitor.affiliate}</h1>
                  </div>
                  <div className="column has-text-centered">
                    <h1 className="subtitle">Division:</h1>
                    <h1 className="title">{competitor.division}</h1>
                  </div>
                  <div className="column has-text-centered">
                    <h1 className="subtitle">Scores:</h1>
                    <ErrorBoundary>
                      <Table className="table">
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
                      </Table>
                    </ErrorBoundary>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </Page>
    )
  }
}

export default CompetitorDetail
