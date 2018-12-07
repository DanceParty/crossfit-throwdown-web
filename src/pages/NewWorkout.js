import React from 'react'
import {postWorkout} from '../utils/dataHelpers'
import Notification from '../components/Notification'
import Page from '../components/Page'
import WorkoutForm from '../components/WorkoutForm'

class NewWorkout extends React.Component {
  state = {
    name: '',
    type: '',
    standards: '',
    rx: [],
    scaled: [],
    isSuccessMessageOpen: false,
    isErrorMessageOpen: false,
  }

  defaultState = {
    name: '',
    type: '',
    standards: '',
    rx: [],
    scaled: [],
  }

  onSubmit = async workout => {
    if (
      workout.name &&
      workout.type &&
      workout.standards &&
      workout.rx.length > 0 &&
      workout.scaled.length > 1
    ) {
      await postWorkout(workout)
      this.handleOpenSuccess()
    } else {
      this.handleOpenError()
    }
  }

  onClose = () => {
    this.setState({
      isSuccessMessageOpen: false,
      isErrorMessageOpen: false,
    })
  }

  handleOpenSuccess = () => {
    this.setState({
      isSuccessMessageOpen: true,
      isErrorMessageOpen: false,
    })
  }

  handleOpenError = () => {
    this.setState({
      isSuccessMessageOpen: false,
      isErrorMessageOpen: true,
    })
  }

  resetState = () => {
    this.setState(this.defaultState)
  }

  render() {
    const {isSuccessMessageOpen, isErrorMessageOpen} = this.state
    return (
      <Page header="Add Workout" link="/">
        <WorkoutForm name="" type="" standards="" rx={[]} scaled={[]} onSubmit={this.onSubmit} />
        {isSuccessMessageOpen && (
          <Notification color="is-success" onClick={this.onClose}>
            Workout added!
          </Notification>
        )}
        {isErrorMessageOpen && (
          <Notification color="is-danger" onClick={this.onClose}>
            Please check the fields and try again
          </Notification>
        )}
      </Page>
    )
  }
}

export default NewWorkout
