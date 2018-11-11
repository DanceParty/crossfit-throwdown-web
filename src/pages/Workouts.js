import React from 'react'
import styled from 'styled-components'
import {navigate} from '@reach/router'
import {fetchWorkouts} from '../utils/dataHelpers'
import Page from '../components/Page'
import Table from '../components/Table'

const TableRow = styled.tr`
  cursor: pointer;
  &:hover {
    background-color: hsl(0, 0%, 96%);
  }
  &:active {
    background-color: hsl(0, 0%, 91%);
  }
`

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
    const {error, data: workouts} = await fetchWorkouts()
    this.setState({
      workouts: workouts,
      isLoading: false,
      error: error,
    })
  }

  onNavigate = workoutId => {
    navigate(`/workouts/${workoutId}`)
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
            <Table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Type</th>
                </tr>
              </thead>
              <tbody>
                {workouts.map(workout => (
                  <TableRow key={workout.id} onClick={() => this.onNavigate(workout.id)}>
                    <td>{workout.name}</td>
                    <td>{workout.type}</td>
                  </TableRow>
                ))}
              </tbody>
            </Table>
          </div>
          <div className="column" />
        </div>
      </Page>
    )
  }
}

export default Workouts
