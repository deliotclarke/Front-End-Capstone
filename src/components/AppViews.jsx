import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { Route } from 'react-router-dom'

import TaskList from './Tasks/TaskList'
import Timer from './Pomo/Timer'
import Profile from './Profile/UserProfile'


class AppViews extends Component {

  state = {
    tasks: "",
    timer: "",
    user: this.props.user
  }

  render() {

    return (
      <>
        <Route exact path="/" render={(props) => {
          return <h1>Welcome, {this.props.user.name}</h1>
        }} />
        <Route exact path="/tasks" render={(props) => {
          return <TaskList {...props} user={this.props.user} tasks={this.state.tasks} deleteTask={this.deleteTask} />
        }} />
        <Route exact path="/timer" render={(props) => {
          return <Timer {...props} user={this.props.user} timer={this.state.timer} />
        }} />
        <Route exact path="/profile" render={(props) => {
          return <Profile {...props} user={this.props.user} />
        }} />
      </>
    )
  }
}

export default withRouter(AppViews)