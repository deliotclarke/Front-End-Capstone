import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import { getUserFromLocalStorage, logout } from './auth/userManager'
import './App.css'

import Login from './components/Login'
import Register from './components/Register'
import AppViews from './components/AppViews'
import NavBar from './components/NavBar'

class App extends Component {
  state = {
    user: getUserFromLocalStorage()
  }

  render() {
    return (
      <div className="App">
        <Router>
          <Route path="/login" render={(props) => <Login {...props} onLogin={(user) => this.setState({ user: user })} />} />
          <Route path="/register" render={(props) => <Register {...props} onRegister={(user) => this.setState({ user: user })} />} />
          <Route exact path="/" render={(props) => {
            return this.state.user ? (
              <>
                <NavBar {...props} user={this.state.user} onLogout={logout} />
                <AppViews {...props} user={this.state.user} />
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
