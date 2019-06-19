import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import { getUserFromLocalStorage } from './auth/userManager'
import { patchUserPomo } from './auth/userManager'

import './App.css'

import Login from './components/Login'
import Register from './components/Register'
import AppViews from './components/AppViews'
import NavBar from './components/NavBar'

class App extends Component {
  state = {
    user: getUserFromLocalStorage()
  }

  logout = () => {
    let clearPomoCount = { pomoCounter: 0 }
    patchUserPomo(clearPomoCount, this.state.user.id)
      .then(() => {
        localStorage.removeItem('user');
        this.setState({ user: "" })
      })
  }

  refreshUserImage = (newUrl) => {
    let currentUser = { ...this.state.user }
    currentUser.userImage = newUrl
    this.setState({ user: currentUser })
  }

  refreshUserPomo = (newCount) => {
    let currentUser = { ...this.state.user }
    currentUser.pomoCounter = newCount
    this.setState({ user: currentUser })
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
