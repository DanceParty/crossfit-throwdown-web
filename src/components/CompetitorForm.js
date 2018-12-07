import React from 'react'
import Input from './Input'
import Button from './Button'
import Select from './Select'
import Notification from './Notification'

class CompetitorForm extends React.Component {
  state = {
    firstName: this.props.firstName,
    lastName: this.props.lastName,
    affiliate: this.props.affiliate,
    gender: this.props.gender === 'men' ? 'Male' : this.props.gender === 'women' ? 'Female' : '',
    division: this.props.division,
    isSuccessMessageOpen: false,
    isErrorMessageOpen: false,
  }

  onChange = e => {
    this.setState({[e.target.name]: e.target.value})
  }

  onSubmit = async () => {
    const {firstName, lastName, division, gender, affiliate} = this.state
    const competitor = {firstName, lastName, division, affiliate}
    const genderArg = gender === 'Male' ? 'men' : gender === 'Female' ? 'women' : ''
    await this.props.onSubmit(competitor, genderArg)
  }

  render() {
    const {firstName, lastName, affiliate, gender, division} = this.state
    return (
      <>
        <div className="columns">
          <div className="column is-one-third is-offset-one-third">
            <div className="columns">
              <div className="column">
                <Input
                  label="First name*"
                  name="firstName"
                  value={firstName}
                  onChange={this.onChange}
                />
              </div>
              <div className="column">
                <Input
                  label="Last name*"
                  name="lastName"
                  value={lastName}
                  onChange={this.onChange}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="columns">
          <div className="column is-one-third is-offset-one-third">
            <div className="columns">
              {this.props.enableGender ? (
                <div className="column has-text-left">
                  <Select
                    label="Gender*"
                    name="gender"
                    value={gender}
                    options={['Male', 'Female']}
                    onChange={this.onChange}
                  />
                </div>
              ) : null}
              <div className="column">
                <Select
                  label="Division*"
                  name="division"
                  value={division}
                  options={['RX', 'Scaled']}
                  onChange={this.onChange}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="columns">
          <div className="column is-one-third is-offset-one-third">
            <Input label="Affiliate" value={affiliate} onChange={this.onChange} name="affiliate" />
          </div>
          <div className="column" />
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

export default CompetitorForm
