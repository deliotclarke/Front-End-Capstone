import React, { Component } from 'react'
import { ButtonGroup, Button, Container } from 'reactstrap'

export default class TasksDone extends Component {

  state = {
    tasks: this.props.tasks,
    user: this.props.user
  }

  render() {

    return (
      <>
        <h1>Tasks Done</h1>
      </>
    )
  }
}