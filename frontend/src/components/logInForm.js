import React from "react"
import "../index.scss"

class LogInForm extends React.Component {

constructor(props) {
  super(props)
  this.state = {
    username: "",
    password: ""
  }
}

handleUsername = event => {
  this.setState({ username: event.target.value })
}

handlePassword = event => {
  this.setState({ password: event.target.value })
}

handleSubmit = event => {
  event.preventDefault()

  fetch("http://localhost:8080/sessions", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify(this.state)
})
  .then(response => response.json())
  .then(json => {
    // Login was successful.
    localStorage.setItem("token", json.token)
    localStorage.setItem("userId", json.userId)
  })
  .catch(err => {
    console.log("Login failed", err)
  })
}

  render() {
    return (
      <div className="wrapper">
        <h1>Log in</h1>
        <form id="logInForm" className="logInForm" onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={this.handleUsername}
            value={this.state.username}
            required
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={this.handlePassword}
            value={this.state.password}
            required />
          <input
            type="submit"
          />
        </form>
      </div>
    )
  }
}

export default LogInForm
