import React from 'react'
import {fetchWorkout, fetchScores, fetchCompetitors, postScores} from '../utils/dataHelpers'
import Page from '../components/Page'
import ScoreTable from '../components/ScoreTable'
import Button from '../components/Button'

export default class WorkoutDetail extends React.Component {
  state = {
    workout: [],
    scores: [],
    competitors: {},
    isEditing: false,
    isLoading: true,
    error: null,
  }

  componentDidMount() {
    this.fetchData()
  }

  fetchData = async () => {
    const {workoutId} = this.props
    this.setState({isLoading: true})
    const {error: workoutErr, data: workout} = await fetchWorkout(workoutId)
    const {error: scoresErr, data: scores} = await fetchScores(null, workoutId)
    const {error: competitorsErr, data: competitors} = await fetchCompetitors()
    const collectedErrors =
      workoutErr || scoresErr || competitorsErr
        ? {errors: {workoutErr, scoresErr, competitorsErr}}
        : null
    this.setState({
      workout,
      scores,
      competitors,
      isLoading: false,
      error: collectedErrors,
    })
  }

  onSubmit = () => {
    const {scores} = this.state
    let newScores = {}
    scores.forEach(scoreObj => {
      const {competitorId, workoutId, score} = scoreObj
      newScores[`scores/${scoreObj.id}`] = {
        competitorId,
        workoutId,
        score: Number(score),
      }
    })
    postScores(newScores)
    this.setState({isEditing: false})
  }

  onChangeScore = event => {
    const {scores} = this.state
    const {name, value} = event.target
    const updatedScores = scores.map(
      scoreObj => (scoreObj.id === name ? {...scoreObj, score: value} : scoreObj),
    )
    this.setState({scores: updatedScores})
  }

  toggleEditMode = () => {
    this.setState(({isEditing}) => ({isEditing: !isEditing}))
  }

  render() {
    const {workout, scores, competitors, isEditing, isLoading, error} = this.state
    return isLoading ? (
      <h1>Loading...</h1>
    ) : error ? (
      <h1>Error fetching data</h1>
    ) : (
      <Page header={workout.name} link="/workouts">
        <div className="columns">
          <div className="column has-text-centered">
            <h1 className="subtitle">
              <b>{workout.type}</b>
            </h1>
          </div>
        </div>
        <div className="columns">
          <div className="column has-text-centered">
            <h1 className="subtitle">Workout Standards</h1>
            <p>{workout.standards}</p>
          </div>
        </div>
        <div className="columns">
          <div className="column has-text-centered">
            <h1 className="subtitle">RX</h1>
            {workout.rx.map(({key, step}) => (
              <p key={key}>{step}</p>
            ))}
          </div>
          <div className="column has-text-centered">
            <h1 className="subtitle">Scaled</h1>
            {workout.scaled.map(({key, step}) => (
              <p key={key}>{step}</p>
            ))}
          </div>
        </div>
        <hr />
        <div className="columns">
          <div className="column has-text-centered">
            {isEditing ? (
              <>
                <Button color="danger" small onClick={this.toggleEditMode} danger>
                  Cancel
                </Button>
                {` `}
                <Button color="success" small onClick={this.onSubmit}>
                  Save{' '}
                </Button>
              </>
            ) : (
              <Button color="light" small onClick={this.toggleEditMode}>
                Edit Mode
              </Button>
            )}
          </div>
        </div>
        <div className="columns">
          <div className="column has-text-centered">
            <h1 className="subtitle">Men - RX</h1>
            <ScoreTable
              competitors={competitors.men.rx}
              scores={scores}
              workoutType={workout.type}
              isEditing={isEditing}
              onChangeScore={this.onChangeScore}
            />
          </div>
          <div className="column has-text-centered">
            <h1 className="subtitle">Men - Scaled</h1>
            <ScoreTable
              competitors={competitors.men.scaled}
              scores={scores}
              workoutType={workout.type}
              isEditing={isEditing}
              onChangeScore={this.onChangeScore}
            />
          </div>
          <div className="column has-text-centered">
            <h1 className="subtitle">Women - RX</h1>
            <ScoreTable
              competitors={competitors.women.rx}
              scores={scores}
              workoutType={workout.type}
              isEditing={isEditing}
              onChangeScore={this.onChangeScore}
            />
          </div>
          <div className="column has-text-centered">
            <h1 className="subtitle">Women - Scaled</h1>
            <ScoreTable
              competitors={competitors.women.scaled}
              scores={scores}
              workoutType={workout.type}
              isEditing={isEditing}
              onChangeScore={this.onChangeScore}
            />
          </div>
        </div>
      </Page>
    )
  }
}
