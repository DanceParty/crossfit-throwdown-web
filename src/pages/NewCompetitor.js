import React from 'react'
import {postCompetitor} from '../utils/dataHelpers'
import Page from '../components/Page'
import Input from '../components/Input'
import Button from '../components/Button'
import Select from '../components/Select'
import Notification from '../components/Notification'

class NewCompetitor extends React.Component {
  state = {
    firstName: '',
    lastName: '',
    affiliate: '',
    gender: '',
    division: '',
    isSuccessMessageOpen: false,
    isErrorMessageOpen: false,
  }

  defaultState = {
    firstName: '',
    lastName: '',
    affiliate: '',
    gender: '',
    division: '',
  }

  onChange = event => {
    const {name, value} = event.target
    this.setState({[name]: value})
  }

  onSubmit = async () => {
    const {firstName, lastName, division, gender, affiliate} = this.state
    if (firstName && lastName && division && gender) {
      const competitor = {firstName, lastName, division, affiliate}
      const genderArg = gender === 'Male' ? 'men' : 'women'
      await postCompetitor(competitor, genderArg)
      this.handleOpenSuccess()
      this.resetState()
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
    const {
      firstName,
      lastName,
      affiliate,
      gender,
      division,
      isSuccessMessageOpen,
      isErrorMessageOpen,
    } = this.state
    return (
      <Page header="Add Competitor" link="/">
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
              <div className="column has-text-left">
                <Select
                  label="Gender*"
                  name="gender"
                  value={gender}
                  options={['Male', 'Female']}
                  onChange={this.onChange}
                />
              </div>
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
        {isSuccessMessageOpen && (
          <Notification color="is-success" onClick={this.onClose}>
            Competitor added!
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

export default NewCompetitor
