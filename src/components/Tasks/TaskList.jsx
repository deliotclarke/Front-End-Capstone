import React, { Component } from 'react'


export default class TaskList extends Component {

  state = {
    tasks: this.props.tasks,
    user: this.props.user
  }

  render() {

    return (
      <>
        <h1>Tasks for: {this.state.user.name}</h1>
      </>
    )
  }
}