import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import { getUserFromLocalStorage } from './auth/userManager'
import { patchUser } from './auth/userManager'
import { getUser } from './auth/userManager'

import './App.css'

import Login from './components/Login'
import Register from './components/Register'
import AppViews from './components/AppViews'
import NavBar from './components/NavBar'

class App extends Component {
  state = {
    user: getUserFromLocalStorage()
  }

  patchUserPomo = (newObj, userId) => {
    let keepId = userId
    patchUser(newObj, userId)
      .then(() => getUser(keepId))
      .then(user => {
        this.setState({ user: user })
      })
      .then(() => this.props.history.push('/timer'))
  }

  // patchCategory = (taskObj, taskId) => {
  //   let goto = taskObj.category
  //   TaskManager.patchTask(taskObj, taskId)
  //     .then(() => TaskManager.getAll())
  //     .then(tasks => {
  //       this.setState({ tasks: tasks })
  //     })
  //     .then(() => this.props.history.push(`/tasks/${goto}`))
  // }

  logout = () => {
    localStorage.removeItem('user');
    this.setState({ user: "" })
  }

  render() {
    return (
      <div className="App">
        <Router>
          <Route path="/login" render={(props) => <Login {...props} onLogin={(user) => this.setState({ user: user })} />} />
          <Route path="/register" render={(props) => <Register {...props} onRegister={(user) => this.setState({ user: user })} />} />
          <Route path="/" render={(props) => {
            return this.state.user ? (
              <>
                <NavBar {...props} user={this.state.user} onLogout={this.logout} />
                <AppViews {...props} user={this.state.user} patchUserPomo={this.patchUserPomo} />
              </>
            ) : (
                <Redirect to="/login" />
              )
          }} />
        </Router>
      </div>
    );
  }
}

export default App;
