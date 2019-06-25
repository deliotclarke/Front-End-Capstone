import React, { Component } from 'react'
import { Route, withRouter } from 'react-router-dom'
import { base } from '../index'

import TaskManager from '../modules/TaskManager'
import TaskAdd from './Tasks/TaskAddButton'
import TaskViews from './Tasks/TaskViews'
import TaskNav from './Tasks/TaskNav'

import Timer from './Pomo/Timer'
import Profile from './Profile/UserProfile'
import LandingScreen from './Landing/LandingScreen'

class AppViews extends Component {


  state = {
    tasks: [],
    user: this.props.user
  }


  addTask = (taskObj) => {
    let goto = taskObj.category
    TaskManager.addTask(taskObj)
      .then(() => TaskManager.getAll())
      .then(tasks => {
        this.setState({ tasks: tasks })
      })
      .then(() => this.props.history.push(`/tasks/${goto}`))
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

  patchCategory = (taskObj, taskId) => {
    let goto = taskObj.category
    TaskManager.patchTask(taskObj, taskId)
      .then(() => TaskManager.getAll())
      .then(tasks => {
        this.setState({ tasks: tasks })
      })
      .then(() => this.props.history.push(`/tasks/${goto}`))
  }

  editPatch = (taskObj, taskId) => {
    let goto = taskObj.category
    TaskManager.patchTask(taskObj, taskId)
      .then(() => TaskManager.getAll())
      .then(tasks => {
        this.setState({ tasks: tasks })
      })
      .then(() => this.props.history.push(`/tasks/${goto}`))
  }

  patchTask = (task, taskId) => {
    TaskManager.patchTask(task, taskId)
      .then(() => TaskManager.getAll())
      .then(tasks => {
        this.setState({ tasks: tasks })
      })
    // .then(() => this.props.history.push(`/tasks/${task.category}`))
  }

  componentWillMount() {
    this.tasksRef = base.syncState('tasks', {
      context: this,
      state: 'tasks'
    })
  }

  componentDidMount() {
    const newState = {}

    TaskManager.getAll()
      .then(tasks => {
      newState.tasks = tasks
      })
      .then(() => this.setState(newState))
  }

  componentWillUnmount() {
    base.removeBinding(this.tasksRef)
  }

  render() {

    return (
      <>
        <Route exact path="/" render={(props) => {
          return <LandingScreen {...props} user={this.props.user} />
        }} />
        <Route path="/tasks" render={(props) => {

          let currentUserTasks = this.state.tasks.filter(task => {
            return task.userId === this.props.user.id
          })
          return (
            <>
              <TaskAdd {...props} user={this.props.user} addTask={this.addTask} handleDelete={this.handleDelete} tasks={currentUserTasks} />
              <TaskViews {...props} user={this.props.user} tasks={currentUserTasks} patchCategory={this.patchCategory} editPatch={this.editPatch} patchTask={this.patchTask} />
              <TaskNav />
            </>
          )
        }} />
        <Route exact path="/timer" render={(props) => {

          let currentUserTasks = this.state.tasks.filter(task => {
            return task.userId === this.props.user.id
          })
          return <Timer {...props} {...this.props} user={this.props.user} tasks={currentUserTasks} patchTask={this.patchTask} />
        }} />
        <Route exact path="/profile" render={(props) => {
          return <Profile {...props} {...this.props} user={this.props.user} />
        }} />

      </>
    )
  }
}

export default withRouter(AppViews)