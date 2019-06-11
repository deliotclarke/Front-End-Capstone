import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import TasksToDo from './TasksToDo'
import TasksInProgress from './TasksInProgress'
import TasksDone from './TasksDone'

export default class TaskViews extends Component {

  state = {
    tasks: this.props.tasks,
    user: this.props.user
  }

  render() {

    return (
      <>
        < Route path="/tasks/todo" render={(props) => {

          // let toDoTasks = this.props.task.find(task =>
          //   task.category === "todo")
          //  toDoTasks={toDoTasks}

          return (
            <>
              <TasksToDo {...props} />
            </>
          )
        }} />
        < Route path="/tasks/inprogress" render={(props) => {
          return (
            <>
              <TasksInProgress {...props} />
            </>
          )
        }} />
        < Route path="/tasks/done" render={(props) => {
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