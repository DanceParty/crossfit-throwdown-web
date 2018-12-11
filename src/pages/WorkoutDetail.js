import React from 'react'
import {
  fetchWorkout,
  fetchScores,
  fetchCompetitors,
  postScores,
  updateWorkout,
} from '../utils/api'
import Page from '../components/Page'
import ScoreTable from '../components/ScoreTable'
import Button from '../components/Button'
import WorkoutForm from '../components/WorkoutForm'

export default class WorkoutDetail extends React.Component {
  state = {
    workout: [],
    scores: [],
    competitors: {},
    isEditingScores: false,
    isEditingWorkout: false,
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

  onSubmitScores = () => {
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
    this.setState({isEditingScores: false})
  }

  onChangeScore = event => {
    const {scores} = this.state
    const {name, value} = event.target
    const updatedScores = scores.map(
      scoreObj => (scoreObj.id === name ? {...scoreObj, score: value} : scoreObj),
    )
    this.setState({scores: updatedScores})
  }

  toggleEditScores = () => {
    this.setState(({isEditingScores}) => ({isEditingScores: !isEditingScores}))
  }

  toggleEditWorkout = () => {
    this.setState(({isEditingWorkout}) => ({isEditingWorkout: !isEditingWorkout}))
  }

  onSubmitWorkout = async workout => {
    if (
      workout.name &&
      workout.standards &&
      workout.type &&
      workout.rx.length > 0 &&
      workout.scaled.length > 0
    ) {
      await updateWorkout(this.props.uri, workout)
      this.toggleEditWorkout()
      this.fetchData()
    } else {
      // no -op
    }
  }

  render() {
    const {
      workout,
      scores,
      competitors,
      isEditingScores,
      isEditingWorkout,
      isLoading,
      error,
    } = this.state
    return isLoading ? (
      <h1>Loading...</h1>
    ) : error ? (
      <h1>Error fetching data</h1>
    ) : (
      <Page header={workout.name} link="/workouts">
        <div className="columns">
          <div className="column has-text-centered">
            {isEditingWorkout ? (
              <WorkoutForm
                name={workout.name}
                type={workout.type}
                standards={workout.standards}
                rx={workout.rx.map(({step}) => step)}
                scaled={workout.scaled.map(({step}) => step)}
                onSubmit={this.onSubmitWorkout}
              />
            ) : (
              <>
                <Button color="light" small onClick={this.toggleEditWorkout}>
                  Edit Workout
                </Button>
                <br />
                <br />
                <div className="columns">
                  <div className="column has-text-centered">
                    <h1 className="subtitle is-2">
                      <b>{workout.type}</b>
                    </h1>
                  </div>
                </div>
                <div className="columns">
                  <div className="column has-text-centered">
                    <h1 className="subtitle is-4">Workout Standards</h1>
                    <p>{workout.standards}</p>
                  </div>
                  <div className="column has-text-centered">
                    <h1 className="subtitle is-4">RX</h1>
                    {workout.rx.map(({key, step}) => (
                      <p key={key}>{step}</p>
                    ))}
                  </div>
                  <div className="column has-text-centered">
                    <h1 className="subtitle is-4">Scaled</h1>
                    {workout.scaled.map(({key, step}) => (
                      <p key={key}>{step}</p>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
        <hr />
        <div className="columns">
          <div className="column has-text-centered">
            {isEditingScores ? (
              <>
                <Button color="danger" small onClick={this.toggleEditScores} danger>
                  Cancel
                </Button>
                {` `}
                <Button color="success" small onClick={this.onSubmitScores}>
                  Save{' '}
                </Button>
              </>
            ) : (
              <Button color="light" small onClick={this.toggleEditScores}>
                Edit Scores
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
              isEditing={isEditingScores}
              onChangeScore={this.onChangeScore}
            />
          </div>
          <div className="column has-text-centered">
            <h1 className="subtitle">Men - Scaled</h1>
            <ScoreTable
              competitors={competitors.men.scaled}
              scores={scores}
              workoutType={workout.type}
              isEditing={isEditingScores}
              onChangeScore={this.onChangeScore}
            />
          </div>
          <div className="column has-text-centered">
            <h1 className="subtitle">Women - RX</h1>
            <ScoreTable
              competitors={competitors.women.rx}
              scores={scores}
              workoutType={workout.type}
              isEditing={isEditingScores}
              onChangeScore={this.onChangeScore}
            />
          </div>
          <div className="column has-text-centered">
            <h1 className="subtitle">Women - Scaled</h1>
            <ScoreTable
              competitors={competitors.women.scaled}
              scores={scores}
              workoutType={workout.type}
              isEditing={isEditingScores}
              onChangeScore={this.onChangeScore}
            />
          </div>
        </div>
      </Page>
    )
  }
}
