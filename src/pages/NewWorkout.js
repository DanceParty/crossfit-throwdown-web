import React from 'react'
import { postWorkout } from '../utils/dataHelpers'
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
    const { name, value } = event.target
    this.setState({ [name]: value })
  }

  onSubmit = () => {
    const completeForm = this.checkRequiredFields()
    if (completeForm) {
      const workout = {
        name: this.state.name,
        type: this.state.type,
        standards: this.state.standards,
        rx: this.state.rx,
        scaled: this.state.scaled,
      }
      workout.rx = removeEmptyArrayItems(workout.rx)
      workout.scaled = removeEmptyArrayItems(workout.scaled)
      postWorkout(workout)
      this.resetState()
      this.openSuccessCloseError()
    } else {
      this.openErrorCloseSuccess()
    }
  }

  addStep = (event, i) => {
    const { value, name } = event.target
    const steps = Array.from(this.state[name])
    steps[i] = value
    this.setState({ [name]: steps })
  }

  openSuccessCloseError = () => {
    this.setState({
      isSuccessMessageOpen: true,
      isErrorMessageOpen: false,
    })
  }

  openErrorCloseSuccess = () => {
    this.setState({
      isSuccessMessageOpen: false,
      isErrorMessageOpen: true,
    })
  }

  checkRequiredFields = () => {
    const { name, type, standards, rx, scaled } = this.state
    if (name && type && standards && rx.length > 0 && scaled.length > 0) {
      return true
    }
    return false
  }

  onClose = () => {
    this.setState({
      isSuccessMessageOpen: false,
      isErrorMessageOpen: false,
    })
  }

  resetState = () => {
    this.setState(this.defaultState)
  }

  render() {
    const {
      name,
      type,
      standards,
      rx,
      scaled,
      isSuccessMessageOpen,
      isErrorMessageOpen,
    } = this.state
    return (
      <Page header="Add Workout" link="/">
        <div className="columns">
          <div className="column" />
          <div className="column">
            <Input
              label="Name*"
              value={name}
              onChange={this.onChange}
              name="name"
            />
            <Select
              label="Type*"
              name="type"
              value={type}
              options={['Timed', 'Weight', 'Point']}
              onChange={this.onChange}
            />
          </div>
          <div className="column" />
        </div>

        <div className="columns">
          <div className="column" />
          <div className="column">
            <Textarea
              label="Standards*"
              value={standards}
              name="standards"
              onChange={this.onChange}
            />
          </div>
          <div className="column" />
        </div>
        <div className="columns">
          <div className="column">
            <Input
              name="rx"
              label="RX*"
              value={rx[0] || ''}
              onChange={e => this.addStep(e, 0)}
              testId={`rx-0`}
            />
            {rx.map((step, i) => (
              <Input
                key={rx[i]}
                name="rx"
                value={rx[i + 1] || ''}
                onChange={e => this.addStep(e, i + 1)}
                testId={`rx-${i + 1}`}
              />
            ))}
          </div>
          <div className="column">
            <Input
              name="scaled"
              label="Scaled*"
              value={scaled[0] || ''}
              onChange={e => this.addStep(e, 0)}
              testId={`scaled-0`}
            />
            {scaled.map((step, i) => (
              <Input
                key={scaled[i]}
                name="scaled"
                value={scaled[i + 1] || ''}
                onChange={e => this.addStep(e, i + 1)}
                testId={`scaled-${i + 1}`}
              />
            ))}
          </div>
        </div>

        <div className="columns">
          <div className="column" />
          <div className="column">
            <Button width="100%" color="success" onClick={this.onSubmit}>
              Submit
            </Button>
          </div>
          <div className="column" />
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
