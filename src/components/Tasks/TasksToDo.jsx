import React, { Component } from 'react'
import TaskCard from './TaskCard'


export default class TasksToDo extends Component {

  state = {
    tasks: this.props.tasks,
    user: this.props.user
  }

  render() {

    return (
      <>
        <TaskCard />
      </>
    )
  }
}