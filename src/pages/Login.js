import React from 'react'
import Input from '../components/Input'
import Page from '../components/Page'
import Button from '../components/Button'

class Login extends React.Component {
  state = {
    email: '',
    password: '',
  }

  onChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  onSubmit = () => {
    this.props.login(this.state.email, this.state.password)
  }

  render() {
    return (
      <Page header="Login">
        <div className="columns">
          <div className="column">
            <Input label="Email" value={this.state.email} name="email" onChange={this.onChange} />
          </div>
        </div>
        <div className="columns">
          <div className="column">
            <Input
              label="Password"
              value={this.state.password}
              name="password"
              onChange={this.onChange}
            />
          </div>
        </div>
        <div className="columns">
          <div className="column">
            <Button color="success" onClick={this.onSubmit}>
              Log me in!
            </Button>
            {this.props.error && <p>{this.props.error}</p>}
          </div>
        </div>
      </Page>
    )
  }
}

export default Login
