import React, { Component } from 'react'
import { Route, withRouter } from 'react-router-dom'

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
    confirmTaskAdd: false,
    confirmTaskDelete: false,
    user: this.props.user
  }

  handleAddConfirm = () => {
    this.setState({ confirmTaskAdd: !this.state.confirmTaskAdd },
      () => {
        window.setTimeout(() => {
          this.setState({ confirmTaskAdd: !this.state.confirmTaskAdd })
        }, 2000)
      })
  }

  handleDeleteConfirm = () => {
    this.setState({ confirmTaskDelete: !this.state.confirmTaskDelete },
      () => {
        window.setTimeout(() => {
          this.setState({ confirmTaskDelete: !this.state.confirmTaskDelete })
        }, 2000)
      })
  }

  addTask = (taskObj) => {
    let goto = taskObj.category
    TaskManager.addTask(taskObj)
      .then(() => TaskManager.getAll())
      .then(tasks => {
        this.setState({ tasks: tasks })
      })
      .then(() => {
        this.props.history.push(`/tasks/${goto}`)
        this.handleAddConfirm()
      })
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
          .then(() => {
            this.props.history.push('/tasks/todo')
            this.handleDeleteConfirm()
          })
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
          return <LandingScreen {...props} user={this.props.user} />
        }} />
        <Route path="/tasks" render={(props) => {

          let currentUserTasks = this.state.tasks.filter(task => {
            return task.userId === this.props.user.id
          })
          return (
            <>
              <TaskAdd {...props} user={this.props.user} addTask={this.addTask} handleDelete={this.handleDelete} tasks={currentUserTasks} />
              <TaskViews {...props} user={this.props.user} tasks={currentUserTasks} handleAddConfirm={this.handleAddConfirm} handleDeleteConfirm={this.handleDeleteConfirm} confirmTaskAdd={this.state.confirmTaskAdd} confirmTaskDelete={this.state.confirmTaskDelete} patchCategory={this.patchCategory} editPatch={this.editPatch} patchTask={this.patchTask} />
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