import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import TaskNav from './Tasks/TaskNav'
import TasksToDo from './Tasks/TasksToDo'
import TasksInProgress from './Tasks/TasksInProgress'
import TasksDone from './Tasks/TasksDone'

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
        <Route path="/tasks" render={(props) => {
          return (
            <>
              <TaskNav />
            </>
          )
        }} />
        <Route exact path="/timer" render={(props) => {
          return <Timer {...props} user={this.props.user} timer={this.state.timer} />
        }} />
        <Route exact path="/profile" render={(props) => {
          return <Profile {...props} user={this.props.user} />
        }} />
        < Route path="/tasks/todo" render={(props) => {
          return (
            <>
              <TasksToDo {...props} />
            </>
          )
        }} />
        < Route path="tasks/inprogress" render={(props) => {
          return (
            <>
              <TasksInProgress {...props} />
            </>
          )
        }} />
        < Route path="tasks/done" render={(props) => {
          return (
            <>
              <TasksDone {...props} />
            </>
          )
        }} />
      </>
    )
  }
}

export default AppViews