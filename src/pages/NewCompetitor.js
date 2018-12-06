import React from 'react'
import {postCompetitor} from '../utils/dataHelpers'
import Page from '../components/Page'
import CompetitorForm from '../components/CompetitorForm'
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

  onSubmit = async (competitor, gender) => {
    if (competitor.firstName && competitor.lastName && competitor.division && gender) {
      await postCompetitor(competitor, gender)
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
      <Page header="Add Competitor" link="/">
        <CompetitorForm
          firstName=""
          lastName=""
          affiliate=""
          gender=""
          division=""
          onSubmit={this.onSubmit}
          enableGender
        />
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
