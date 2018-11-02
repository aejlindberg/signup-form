import React from "react"
import SignUpForm from "./signUpForm"
import LogInForm from "./logInForm"
import "../index.scss"

class App extends React.Component {

  render() {
    return (
      <div>
        <SignUpForm />
        <LogInForm />
      </div>
    )
  }

}

export default App
