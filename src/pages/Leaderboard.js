import React from 'react'
import {
  fetchScores,
  fetchCompetitors,
  fetchWorkouts,
} from '../utils/dataHelpers'
import {splitByDivision} from '../utils/helpers'
import {calculateTotalScore} from '../utils/scoring'
import Page from '../components/Page'
import ErrorBoundary from '../components/ErrorBoundary'

class Leaderboard extends React.Component {
  state = {
    allScores: null,
    rxMen: null,
    scaledMen: [],
    rxWomen: [],
    scaledWomen: [],
    workouts: [],
  }

  componentDidMount() {
    this.fetchData()
  }

  fetchData = async () => {
    const allScores = await fetchScores()
    const workouts = await fetchWorkouts()
    const men = await fetchCompetitors('Male')
    const women = await fetchCompetitors('Female')
    const menDivisions = splitByDivision(men)
    const womenDivisions = splitByDivision(women)
    this.setState({
      allScores,
      workouts,
      rxMen: menDivisions.rx,
      scaledMen: menDivisions.scaled,
      rxWomen: womenDivisions.rx,
      scaledWomen: womenDivisions.scaled,
    })
  }

  render() {
    const {
      allScores,
      rxMen,
      rxWomen,
      scaledMen,
      scaledWomen,
      workouts,
    } = this.state
    const ready =
      allScores && rxMen && rxWomen && scaledMen && scaledWomen && workouts
    if (ready) {
      const getTotalScores = calculateTotalScore(workouts, allScores)
      const rxMenTotalScores = getTotalScores(rxMen)
      const rxWomenTotalScores = getTotalScores(rxWomen)
      const scaledMenTotalScores = getTotalScores(scaledMen)
      const scaledWomenTotalScores = getTotalScores(scaledWomen)
      return (
        <Page header="Leaderboard" link="/">
          <div className="columns">
            <div className="column has-text-centered">
              <h1 className="title">RX Men</h1>
              <ErrorBoundary>
                <table className="table" style={{width: '100%'}}>
                  <thead>
                    <tr>
                      <th>Rank</th>
                      <th>Name</th>
                      <th>Points</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rxMenTotalScores.map((man, index) => (
                      <tr key={man.id}>
                        <td>{index + 1}</td>
                        <td>
                          {man.firstName} {man.lastName}
                        </td>
                        <td>{man.totalScore}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </ErrorBoundary>
            </div>
            <div className="column has-text-centered">
              <h1 className="title">RX Women</h1>
              <ErrorBoundary>
                <table className="table" style={{width: '100%'}}>
                  <thead>
                    <tr>
                      <th>Rank</th>
                      <th>Name</th>
                      <th>Points</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rxWomenTotalScores.map((women, index) => (
                      <tr key={women.id}>
                        <td>{index + 1}</td>
                        <td>
                          {women.firstName} {women.lastName}
                        </td>
                        <td>{women.totalScore}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </ErrorBoundary>
            </div>
            <div className="column has-text-centered">
              <h1 className="title">Scaled Men</h1>
              <ErrorBoundary>
                <table className="table" style={{width: '100%'}}>
                  <thead>
                    <tr>
                      <th>Rank</th>
                      <th>Name</th>
                      <th>Points</th>
                    </tr>
                  </thead>
                  <tbody>
                    {scaledMenTotalScores.map((man, index) => (
                      <tr key={man.id}>
                        <td>{index + 1}</td>
                        <td>
                          {man.firstName} {man.lastName}
                        </td>
                        <td>{man.totalScore}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </ErrorBoundary>
            </div>
            <div className="column has-text-centered">
              <h1 className="title">Scaled Women</h1>
              <ErrorBoundary>
                <table className="table" style={{width: '100%'}}>
                  <thead>
                    <tr>
                      <th>Rank</th>
                      <th>Name</th>
                      <th>Points</th>
                    </tr>
                  </thead>
                  <tbody>
                    {scaledWomenTotalScores.map((women, index) => (
                      <tr key={women.id}>
                        <td>{index + 1}</td>
                        <td>
                          {women.firstName} {women.lastName}
                        </td>
                        <td>{women.totalScore}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </ErrorBoundary>
            </div>
          </div>
        </Page>
      )
    } else {
      return <h1 className="title">Loading...</h1>
    }
  }
}

export default Leaderboard
