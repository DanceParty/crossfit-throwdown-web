import React from 'react'
import { database } from '../utils/firebase'
import {
  sortNormalWorkout,
  sortTimedWorkout,
  splitByDivision,
} from '../utils/helpers'
import {
  fetchWorkout,
  fetchCompetitors,
  fetchScores,
} from '../utils/dataHelpers'
import Page from '../components/Page'
import Input from '../components/Input'
import Button from '../components/Button'
import ButtonLink from '../components/ButtonLink'

class WorkoutDetail extends React.Component {
  state = {
    workout: null,
    rxMen: [],
    rxWomen: [],
    scaledMen: [],
    scaledWomen: [],
    scores: [],
    rxMenEdit: false,
    scaledMenEdit: false,
    rxWomenEdit: false,
    scaledWomenEdit: false,
  }

  componentDidMount() {
    const { workoutId } = this.props
    this.fetchData(workoutId)
  }

  fetchData = async id => {
    const workout = await fetchWorkout(id)
    const scores = await fetchScores(id)
    const men = await fetchCompetitors('Male')
    const women = await fetchCompetitors('Female')
    const menDivisions = splitByDivision(men)
    const womenDivisions = splitByDivision(women)
    const rx = workout.rx.map((step, i) => ({
      key: i,
      step,
    }))
    const scaled = workout.scaled.map((step, i) => ({
      key: i,
      step,
    }))
    workout.rx = rx
    workout.scaled = scaled
    this.setState(
      {
        workout,
        scores,
        rxMen: menDivisions.rx,
        scaledMen: menDivisions.scaled,
        rxWomen: womenDivisions.rx,
        scaledWomen: womenDivisions.scaled,
      },
      () => {
        console.log(this.state)
      }
    )
  }

  onSubmit = () => {
    const { scores } = this.state
    let updates = {}
    scores.forEach(scoreObj => {
      const { competitorId, workoutId, score } = scoreObj
      updates[`scores/${scoreObj.id}`] = {
        competitorId,
        workoutId,
        score: Number(score),
      }
    })
    database.ref().update(updates)
    this.setState({
      rxMenEdit: false,
      scaledMenEdit: false,
      rxWomenEdit: false,
      scaledWomenEdit: false,
    })
  }

  onToggleEdit = event => {
    const { name } = event.target
    this.setState(prevState => ({
      [name]: !prevState[name],
    }))
  }

  onChangeScore = event => {
    const { name, value } = event.target
    const { scores } = this.state
    const updatedScores = scores.map(scoreObj => {
      if (scoreObj.id === name) {
        return { ...scoreObj, score: value }
      } else {
        return scoreObj
      }
    })

    this.setState({ scores: updatedScores })
  }

  sortCompetitorsByScore = (competitors, scores) => {
    const { workout } = this.state
    let response = {}
    if (workout.type === 'Timed') {
      response = sortTimedWorkout(competitors, scores)
    } else {
      response = sortNormalWorkout(competitors, scores)
    }
    return [...response.sortedCompetitors, ...response.zeroCompetitors]
  }

  render() {
    const {
      workout,
      rxMen,
      scaledMen,
      rxWomen,
      scaledWomen,
      scores,
    } = this.state
    const {
      rxMenEdit,
      scaledMenEdit,
      rxWomenEdit,
      scaledWomenEdit,
    } = this.state
    if (workout) {
      const sortedRxMen = this.sortCompetitorsByScore(rxMen, scores)
      const sortedScaledMen = this.sortCompetitorsByScore(scaledMen, scores)
      const sortedRxWomen = this.sortCompetitorsByScore(rxWomen, scores)
      const sortedScaledWomen = this.sortCompetitorsByScore(scaledWomen, scores)

      return (
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
              <h1 className="subtitle">RX</h1>
              {workout.rx.map(({ key, step }) => (
                <p key={key}>{step}</p>
              ))}
            </div>

            <div className="column has-text-centered">
              <h1 className="subtitle">Scaled</h1>
              {workout.scaled.map(({ key, step }) => (
                <p key={key}>{step}</p>
              ))}
            </div>
          </div>
          <hr />
          <div className="columns">
            <div className="column has-text-centered">
              <h1 className="subtitle">RX - Men</h1>
              <ButtonLink name="rxMenEdit" onClick={this.onToggleEdit}>
                {rxMenEdit ? 'close edit mode' : 'edit scores'}
              </ButtonLink>
              <table className="table" style={{ width: '100%' }}>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Score</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedRxMen.map((man, i) => (
                    <tr key={man.id}>
                      <td style={{ width: '55%' }}>
                        <b>{i + 1}</b>
                        {` ${man.firstName} ${man.lastName}`}
                      </td>
                      {scores.map(score => {
                        if (score.competitorId === man.id) {
                          return rxMenEdit ? (
                            <td key={man.id} className="has-text-centered">
                              <Input
                                name={score.id}
                                value={score.score}
                                onChange={this.onChangeScore}
                                small
                              />
                            </td>
                          ) : (
                            <td key={man.id} className="has-text-centered">
                              {score.score}
                            </td>
                          )
                        } else {
                          return null
                        }
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="column has-text-centered">
              <h1 className="subtitle">Scaled - Men</h1>
              <ButtonLink name="scaledMenEdit" onClick={this.onToggleEdit}>
                {scaledMenEdit ? 'close edit mode' : 'edit scores'}
              </ButtonLink>
              <table className="table" style={{ width: '100%' }}>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Score</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedScaledMen.map((man, i) => (
                    <tr key={man.id}>
                      <td style={{ width: '55%' }}>
                        <b>{i + 1}</b>
                        {` ${man.firstName} ${man.lastName}`}
                      </td>
                      {scores.map(score => {
                        if (score.competitorId === man.id) {
                          return scaledMenEdit ? (
                            <td key={man.id} className="has-text-centered">
                              <Input
                                name={score.id}
                                value={score.score}
                                onChange={this.onChangeScore}
                                small
                              />
                            </td>
                          ) : (
                            <td key={man.id} className="has-text-centered">
                              {score.score}
                            </td>
                          )
                        } else {
                          return null
                        }
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="column has-text-centered">
              <h1 className="subtitle">RX - Women</h1>
              <ButtonLink name="rxWomenEdit" onClick={this.onToggleEdit}>
                {rxWomenEdit ? 'close edit mode' : 'edit scores'}
              </ButtonLink>
              <table className="table" style={{ width: '100%' }}>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Score</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedRxWomen.map((woman, i) => (
                    <tr key={woman.id}>
                      <td style={{ width: '55%' }}>
                        <b>{i + 1}</b>
                        {` ${woman.firstName} ${woman.lastName}`}
                      </td>
                      {scores.map(score => {
                        if (score.competitorId === woman.id) {
                          return rxWomenEdit ? (
                            <td key={woman.id} className="has-text-centered">
                              <Input
                                name={score.id}
                                value={score.score}
                                onChange={this.onChangeScore}
                                small
                              />
                            </td>
                          ) : (
                            <td key={woman.id} className="has-text-centered">
                              {score.score}
                            </td>
                          )
                        } else {
                          return null
                        }
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="column has-text-centered">
              <h1 className="subtitle">Scaled - Women</h1>
              <ButtonLink name="scaledWomenEdit" onClick={this.onToggleEdit}>
                {scaledWomenEdit ? 'close edit mode' : 'edit scores'}
              </ButtonLink>
              <table className="table" style={{ width: '100%' }}>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Score</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedScaledWomen.map((woman, i) => (
                    <tr key={woman.id}>
                      <td style={{ width: '55%' }}>
                        <b>{i + 1}</b>
                        {` ${woman.firstName} ${woman.lastName}`}
                      </td>
                      {scores.map(score => {
                        if (score.competitorId === woman.id) {
                          return scaledWomenEdit ? (
                            <td key={woman.id} className="has-text-centered">
                              <Input
                                name={score.id}
                                value={score.score}
                                onChange={this.onChangeScore}
                                small
                              />
                            </td>
                          ) : (
                            <td key={woman.id} className="has-text-centered">
                              {score.score}
                            </td>
                          )
                        } else {
                          return null
                        }
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="columns">
            <div className="column has-text-centered">
              <Button width="100%" color="success" onClick={this.onSubmit}>
                Submit Scores
              </Button>
            </div>
          </div>
        </Page>
      )
    } else {
      return <h1>Loading...</h1>
    }
  }
}

export default WorkoutDetail
