import React from 'react'
import Input from './Input'
import Button from './Button'
import Select from './Select'
import Textarea from './Textarea'

const removeEmptyArrayItems = array => array.filter(Boolean)

class WorkoutForm extends React.Component {
  state = {
    name: this.props.name,
    type: this.props.type,
    standards: this.props.standards,
    rx: this.props.rx || [],
    scaled: this.props.scaled || [],
  }

  onChange = ({target: {name, value}}) => {
    this.setState({
      [name]: value,
    })
  }

  onSubmit = () => {
    const {name, type, standards, rx, scaled} = this.state
    const workout = {name, type, standards, rx, scaled}
    workout.rx = removeEmptyArrayItems(workout.rx)
    workout.scaled = removeEmptyArrayItems(workout.scaled)
    this.props.onSubmit(workout)
  }

  handleNewStep = (event, i) => {
    const {value, name} = event.target
    const steps = Array.from(this.state[name])
    steps[i] = value
    this.setState({[name]: steps})
  }

  render() {
    return (
      <>
        <div className="columns">
          <div className="column">
            <Input label="Name*" value={this.state.name} onChange={this.onChange} name="name" />
            <Select
              label="Type*"
              name="type"
              value={this.state.type}
              options={['Timed', 'Weight', 'Point']}
              onChange={this.onChange}
            />
          </div>
          <div className="column">
            <Textarea
              label="Standards*"
              value={this.state.standards}
              name="standards"
              onChange={this.onChange}
              data-testid="standards-input"
            />
          </div>
        </div>
        <div className="columns">
          <div className="column">
            <Input
              name="rx"
              label="RX*"
              value={this.state.rx[0] || ''}
              onChange={e => this.handleNewStep(e, 0)}
              testId={`rx-0`}
            />
            {this.state.rx.map((step, i) => (
              <Input
                key={this.state.rx[i]}
                name="rx"
                value={this.state.rx[i + 1] || ''}
                onChange={e => this.handleNewStep(e, i + 1)}
                testId={`rx-${i + 1}`}
              />
            ))}
          </div>
          <div className="column">
            <Input
              name="scaled"
              label="Scaled*"
              value={this.state.scaled[0] || ''}
              onChange={e => this.handleNewStep(e, 0)}
              testId={`scaled-0`}
            />
            {this.state.scaled.map((step, i) => (
              <Input
                key={this.state.scaled[i]}
                name="scaled"
                value={this.state.scaled[i + 1] || ''}
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
      </>
    )
  }
}

export default WorkoutForm
