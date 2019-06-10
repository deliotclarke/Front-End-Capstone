import React, { Component } from 'react'

export default class UserProfile extends Component {

  state = {
    tasks: this.props.tasks,
    user: this.props.user
  }

  render() {

    return (
      <>
        <h1>Profile for: {this.state.user.name}</h1>
      </>
    )
  }
}