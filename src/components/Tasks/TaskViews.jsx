import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import TasksToDo from './TasksToDo'
import TasksInProgress from './TasksInProgress'
import TasksDone from './TasksDone'

export default class TaskViews extends Component {


  render() {

    return (
      <>
        < Route path="/tasks/todo" render={(props) => {

          let toDoTasks = this.props.tasks.filter(task => {
            return task.category === "todo"
          })
          return (
            <>
              <TasksToDo {...this.props} {...props} tasks={toDoTasks} patchTask={this.props.patchTask} />
            </>
          )
        }} />
        < Route path="/tasks/inprogress" render={(props) => {

          let inProgressTasks = this.props.tasks.filter(task => {
            return task.category === "inprogress"
          })
          return (
            <>
              <TasksInProgress {...this.props} {...props} tasks={inProgressTasks} patchTask={this.props.patchTask} />
            </>
          )
        }} />
        < Route path="/tasks/done" render={(props) => {

          let doneTasks = this.props.tasks.filter(task => {
            return task.category === "done"
          })
          return (
            <>
              <TasksDone {...this.props} {...props} tasks={doneTasks} patchTask={this.props.patchTask} />
            </>
          )
        }} />
      </>
    )
  }
}