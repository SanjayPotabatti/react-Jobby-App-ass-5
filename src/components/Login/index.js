import Cookies from 'js-cookie'
import {Component} from 'react'

import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    usernameErrorMsg: false,
    passwordErrorMsg: false,
    errorMsg: '',
    showErrorMsg: false,
  }

  onBlurUsername = () => {
    this.setState({usernameErrorMsg: true})
  }

  usernameVarifyFun = () => {
    const {username, usernameErrorMsg} = this.state
    if (usernameErrorMsg === true && username === '') {
      return <p className="errorMessage">*Required</p>
    }
    return null
  }

  onBlurPassword = () => {
    this.setState({passwordErrorMsg: true})
  }

  passwordVarifyFun = () => {
    const {password, passwordErrorMsg} = this.state

    if (passwordErrorMsg === true && password === '') {
      return <p className="errorMessage">*Required</p>
    }
    return null
  }

  onchangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onchangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showErrorMsg: true, errorMsg})
  }

  onSubmitForm = async event => {
    event.preventDefault()

    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  renderPasswordField = () => {
    const {password} = this.state

    return (
      <>
        <label className="loginLabel pt-3" htmlFor="password">
          PASSWORD
        </label>
        <input
          id="password"
          type="password"
          className="inputElementStyle"
          placeholder="Password"
          value={password}
          onChange={this.onchangePassword}
          onBlur={this.onBlurPassword}
        />
        {this.passwordVarifyFun()}
      </>
    )
  }

  renderUsernameField = () => {
    const {username} = this.state

    return (
      <>
        <label className="loginLabel pt-3" htmlFor="username">
          USERNAME
        </label>
        <input
          id="username"
          type="text"
          className="inputElementStyle"
          placeholder="Username"
          value={username}
          onChange={this.onchangeUsername}
          onBlur={this.onBlurUsername}
        />
        {this.usernameVarifyFun()}
      </>
    )
  }

  render() {
    const {errorMsg, showErrorMsg} = this.state

    return (
      <div className="loginBgContainer d-flex flex-row justify-content-center align-items-center">
        <form className="loginCardContainer" onSubmit={this.onSubmitForm}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            className="logoImg"
            alt="logoImg"
          />
          <div>{this.renderUsernameField()}</div>
          <div>{this.renderPasswordField()}</div>
          <button type="submit" className="loginButtonStyle mt-4">
            Login
          </button>
          {showErrorMsg && <p className="errorMessage pt-2">*{errorMsg}</p>}
        </form>
      </div>
    )
  }
}

export default Login
