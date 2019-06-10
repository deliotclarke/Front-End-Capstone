import React, { Component } from 'react'

export default class Timer extends Component {

  state = {
    tasks: this.props.tasks,
    user: this.props.user
  }

  render() {

    return (
      <>
        <h1>Timer for: {this.state.user.name}</h1>
      </>
    )
  }
}