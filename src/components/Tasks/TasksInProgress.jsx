import React, { Component } from 'react'

export default class TasksInProgress extends Component {

  state = {
    tasks: this.props.tasks,
    user: this.props.user
  }

  render() {

    return (
      <>
        <h1>Tasks In Progress Hopefully</h1>
      </>
    )
  }
}