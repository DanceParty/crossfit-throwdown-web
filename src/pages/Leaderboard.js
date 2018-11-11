import React from 'react'
import {fetchScores, fetchCompetitors, fetchWorkouts} from '../utils/dataHelpers'
import {calculateStandings} from '../utils/scoring'
import Page from '../components/Page'
import Table from '../components/Table'

class Leaderboard extends React.Component {
  state = {
    scores: null,
    workouts: null,
    competitors: null,
    isLoading: true,
    error: null,
  }

  componentDidMount() {
    this.fetchData()
  }

  fetchData = async () => {
    const {error: scoresErr, data: scores} = await fetchScores()
    const {error: workoutsErr, data: workouts} = await fetchWorkouts()
    const {error: competitorsErr, data: competitors} = await fetchCompetitors()
    const collectedErrors =
      scoresErr || workoutsErr || competitorsErr
        ? {errors: {scoresErr, workoutsErr, competitorsErr}}
        : null

    this.setState({
      scores,
      workouts,
      competitors,
      error: collectedErrors,
      isLoading: false,
    })
  }

  render() {
    if (this.state.isLoading) {
      return <h1>Loading...</h1>
    } else if (this.state.error) {
      return <h1>Error fetching data</h1>
    }
    const standings = calculateStandings(this.state.workouts, this.state.scores)
    const {men, women} = this.state.competitors
    return (
      <Page header="Leaderboard" link="/">
        <div className="columns">
          <div className="column has-text-centered">
            <h1 className="title">RX Men</h1>
            <Table className="table">
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Name</th>
                  <th>Score</th>
                </tr>
              </thead>
              <tbody>
                {standings(men.rx).map((man, i) => (
                  <tr key={man.id}>
                    <td>{man.standing}</td>
                    <td>
                      {man.firstName} {man.lastName}
                    </td>
                    <td>{man.totalScore}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
          <div className="column has-text-centered">
            <h1 className="title">RX Women</h1>
            <Table className="table">
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Name</th>
                  <th>Score</th>
                </tr>
              </thead>
              <tbody>
                {standings(women.rx).map((woman, i) => (
                  <tr key={woman.id}>
                    <td>{woman.standing}</td>
                    <td>
                      {woman.firstName} {woman.lastName}
                    </td>
                    <td>{woman.totalScore}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
          <div className="column has-text-centered">
            <h1 className="title">Scaled Men</h1>
            <Table className="table">
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Name</th>
                  <th>Points</th>
                </tr>
              </thead>
              <tbody>
                {standings(men.scaled).map((man, i) => (
                  <tr key={man.id}>
                    <td>{man.standing}</td>
                    <td>
                      {man.firstName} {man.lastName}
                    </td>
                    <td>{man.totalScore}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
          <div className="column has-text-centered">
            <h1 className="title">Scaled Women</h1>
            <Table className="table">
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Name</th>
                  <th>Points</th>
                </tr>
              </thead>
              <tbody>
                {standings(women.scaled).map((woman, i) => (
                  <tr key={woman.id}>
                    <td>{woman.standing}</td>
                    <td>
                      {woman.firstName} {woman.lastName}
                    </td>
                    <td>{woman.totalScore}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      </Page>
    )
  }
}

export default Leaderboard
