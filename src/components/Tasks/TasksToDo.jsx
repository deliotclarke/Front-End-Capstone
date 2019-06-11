import React, { Component } from 'react'


export default class TasksToDo extends Component {

  state = {
    tasks: this.props.tasks,
    user: this.props.user
  }

  render() {

    return (
      <>
        <h1>Tasks To Do</h1>
      </>
    )
  }
}