import React from 'react'
import {Link} from '@reach/router'
import {fetchWorkouts} from '../utils/dataHelpers'
import Page from '../components/Page'

class Workouts extends React.Component {
  state = {
    workouts: [],
    isLoading: false,
    error: null,
  }

  componentDidMount() {
    this.fetchData()
  }

  fetchData = async () => {
    this.setState({isLoading: true})
    const {error, data} = await fetchWorkouts()
    this.setState({
      workouts: data.workouts,
      isLoading: false,
      error: error,
    })
  }

  render() {
    const {workouts, isLoading, error} = this.state
    return isLoading ? (
      <h1>Loading...</h1>
    ) : error ? (
      <h1>Error fetching data</h1>
    ) : (
      <Page header="Workouts" link="/">
        <div className="columns">
          <div className="column" />
          <div className="column">
            <table className="table" style={{width: '100%'}}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Type</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {workouts.map(workout => (
                  <tr key={workout.id}>
                    <td>{workout.name}</td>
                    <td>{workout.type}</td>
                    <td>
                      <Link to={`/workouts/${workout.id}`}>{`>`}</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="column" />
        </div>
      </Page>
    )
  }
}

export default Workouts
