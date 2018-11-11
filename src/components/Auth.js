import React from 'react'
import Login from '../pages/Login'
import {login, checkCurrentUser} from '../utils/dataHelpers'

class Auth extends React.Component {
  state = {
    user: null,
    isAuthenticated: false,
    isLoading: true,
    errorMessage: null,
  }

  componentDidMount() {
    this.checkForUser()
  }

  checkForUser = () => {
    const user = checkCurrentUser()
    this.setState({
      user,
      isAuthenticated: user ? true : false,
      isLoading: false,
    })
  }

  loginUser = async (email, password) => {
    const {data: user, error} = await login(email, password)
    this.setState({
      user,
      isAuthenticated: user ? true : false,
      error: error,
    })
  }

  render() {
    return this.state.isLoading ? (
      <p>Loading...</p>
    ) : this.state.isAuthenticated ? (
      this.props.children
    ) : (
      <Login login={this.loginUser} error={this.state.errorMessage} />
    )
  }
}

export default Auth
