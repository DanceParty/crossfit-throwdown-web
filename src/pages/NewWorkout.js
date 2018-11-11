import React from 'react'
import {postWorkout} from '../utils/dataHelpers'
import Page from '../components/Page'
import Input from '../components/Input'
import Select from '../components/Select'
import Textarea from '../components/Textarea'
import Button from '../components/Button'
import Notification from '../components/Notification'

const removeEmptyArrayItems = array => array.filter(Boolean)

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

  onChange = event => {
    const {name, value} = event.target
    this.setState({[name]: value})
  }

  onSubmit = () => {
    const {name, type, standards, rx, scaled} = this.state
    const completeForm = this.checkRequiredFields()
    if (completeForm) {
      const workout = {name, type, standards, rx, scaled}
      workout.rx = removeEmptyArrayItems(workout.rx)
      workout.scaled = removeEmptyArrayItems(workout.scaled)
      postWorkout(workout)
      this.resetState()
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

  handleNewStep = (event, i) => {
    const {value, name} = event.target
    const steps = Array.from(this.state[name])
    steps[i] = value
    this.setState({[name]: steps})
  }

  checkRequiredFields = () => {
    const {name, type, standards, rx, scaled} = this.state
    if (name && type && standards && rx.length > 0 && scaled.length > 0) {
      return true
    }
    return false
  }

  resetState = () => {
    this.setState(this.defaultState)
  }

  render() {
    const {isSuccessMessageOpen, isErrorMessageOpen, ...workout} = this.state
    return (
      <Page header="Add Workout" link="/">
        <div className="columns">
          <div className="column">
            <Input label="Name*" value={workout.name} onChange={this.onChange} name="name" />
            <Select
              label="Type*"
              name="type"
              value={workout.type}
              options={['Timed', 'Weight', 'Point']}
              onChange={this.onChange}
            />
          </div>
          <div className="column">
            <Textarea
              label="Standards*"
              value={workout.standards}
              name="standards"
              onChange={this.onChange}
            />
          </div>
        </div>
        <div className="columns">
          <div className="column">
            <Input
              name="rx"
              label="RX*"
              value={workout.rx[0] || ''}
              onChange={e => this.handleNewStep(e, 0)}
              testId={`rx-0`}
            />
            {workout.rx.map((step, i) => (
              <Input
                key={workout.rx[i]}
                name="rx"
                value={workout.rx[i + 1] || ''}
                onChange={e => this.handleNewStep(e, i + 1)}
                testId={`rx-${i + 1}`}
              />
            ))}
          </div>
          <div className="column">
            <Input
              name="scaled"
              label="Scaled*"
              value={workout.scaled[0] || ''}
              onChange={e => this.handleNewStep(e, 0)}
              testId={`scaled-0`}
            />
            {workout.scaled.map((step, i) => (
              <Input
                key={workout.scaled[i]}
                name="scaled"
                value={workout.scaled[i + 1] || ''}
                onChange={e => this.handleNewStep(e, i + 1)}
                testId={`scaled-${i + 1}`}
              />
            ))}
          </div>
        </div>

        <div className="columns">
          <div className="column is-one-third is-offset-one-third has-text-centered">
            <Button width="100%" color="success" onClick={this.onSubmit}>
              Submit
            </Button>
          </div>
        </div>
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
