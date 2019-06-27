import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import { getUserFromLocalStorage, getAllUsers } from './auth/userManager'
import { patchUserPomo } from './auth/userManager'

import './App.css'

import Login from './components/Login'
import Register from './components/Register'
import AppViews from './components/AppViews'
import NavBar from './components/NavBar'

class App extends Component {
  state = {
    user: getUserFromLocalStorage(),
    users: []
  }

  logout = () => {
    let currentCount = this.state.user.pomoCounter
    let permaCount = currentCount + this.state.user.permaPomoCounter
    patchUserPomo({
      pomoCounter: 0,
      permaPomoCounter: permaCount
    }, this.state.user.id)
      .then(() => getAllUsers())
      .then(users => this.setState({ users: users }))
      .then(() => {
        localStorage.removeItem('user');
        this.setState({ user: "" })
      })
  }

  refreshUserImage = (newUrl) => {

    let newState = {}

    let currentUser = { ...this.state.user }
    currentUser.userImage = newUrl
    newState.user = currentUser
    getAllUsers()
      .then(users => newState.users = users)
      .then(() => this.setState(newState))
  }

  refreshUserPomo = (newCount) => {

    let newState = {}

    let currentUser = { ...this.state.user }
    currentUser.pomoCounter = newCount
    newState.user = currentUser
    getAllUsers()
      .then(users => newState.users = users)
      .then(() => this.setState(newState))
  }

  componentDidMount() {
    let newState = {}

    getAllUsers()
      .then(users => newState.users = users)
      .then(() => this.setState(newState))
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
                <AppViews {...props} user={this.state.user} refreshUserImage={this.refreshUserImage} refreshUserPomo={this.refreshUserPomo} />
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
