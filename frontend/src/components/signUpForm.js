import React from "react"

class SignUpForm extends React.Component {

constructor(props) {
  super(props)
  this.state = {
    user: [{
      username: "",
      email: "",
      password: ""
    }
    ]
  }
}

handleUser = event => {
  this.setState({ user: event.target.value })
}

  render() {
    return (
      <div className="wrapper">
        <form id="signUpForm" className="signUpForm" method="post" action="http://localhost:8080/users">
          <input
          type="text"
          placeholder="Username"
          name="username"
          onChange={this.handleUser}
          value={this.state.user.username}
          required
          />
          <input
          type="text"
          placeholder="Enter your email address"
          name="email"
          onChange={this.handleUser}
          value={this.state.user.email}
          required
          />
          <input
          type="text"
          placeholder="Password"
          name="password"
          onChange={this.handleUser}
          value={this.state.user.password}
          required />
          <input
          type="submit"
          />
        </form>
      </div>
    )
  }
}

export default SignUpForm
