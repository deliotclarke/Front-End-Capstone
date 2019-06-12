import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import TaskManager from '../modules/TaskManager'
import TaskAdd from './Tasks/TaskAddButton'
import TaskViews from './Tasks/TaskViews'
import TaskNav from './Tasks/TaskNav'

import Timer from './Pomo/Timer'
import Profile from './Profile/UserProfile'


class AppViews extends Component {


  state = {
    tasks: [],
    timer: [],
    user: this.props.user
  }


  addTask = (taskObj) => {
    TaskManager.addTask(taskObj)
      .then(() => TaskManager.getAll())
      .then(tasks => {
        this.setState({ tasks: tasks })
      })
      .then(() => this.props.history.push('/tasks/todo'))
  }

  //handles batched deletion of selected tasks
  handleDelete = () => {
    TaskManager.getAll()
      .then(tasks => {
        let toDelete = tasks.filter(task => { return task.selected === true })
        let promisedDeletes = toDelete.map(task => { return TaskManager.deleteTask(task.id) })
        Promise.all(promisedDeletes)
          .then(() => TaskManager.getAll())
          .then(tasks => {
            this.setState({ tasks: tasks })
          })
          .then(() => this.props.history.push('/tasks/todo'))
      })
  }


  componentDidMount() {
    const newState = {}

    TaskManager.getAll()
      .then(tasks => newState.tasks = tasks)
      .then(() => this.setState(newState))
  }

  render() {

    return (
      <>
        <Route exact path="/" render={(props) => {
          return <h1>Welcome, {this.props.user.name}</h1>
        }} />
        <Route path="/tasks" render={(props) => {

          let currentUserTasks = this.state.tasks.filter(task => {
            return task.userId === this.props.user.id
          })
          return (
            <>
              <TaskAdd {...props} user={this.props.user} addTask={this.addTask} handleDelete={this.handleDelete} tasks={currentUserTasks} />
              <TaskViews {...props} user={this.props.user} tasks={currentUserTasks} />
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

      </>
    )
  }
}

export default AppViews