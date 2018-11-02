import React from "react"
import "../index.scss"

class LogInForm extends React.Component {

  render() {
    return (
      <div className="wrapper">
        <h1>Log in</h1>
        <form id="logInForm" className="logInForm">
          <input
            type="text"
            placeholder="Username"
            name="username"
            required
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
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
