import React from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"

import SignUpForm from "./signUpForm"
import LogInForm from "./logInForm"
import "../index.scss"

class App extends React.Component {

  render() {
    return (
        <div>
          <Router>
            <SignUpForm />
          </Router>
        </div>
    )
  }

}

export default App
