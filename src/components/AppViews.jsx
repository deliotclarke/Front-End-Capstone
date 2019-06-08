import React, { Component } from 'react'

export default class AppViews extends Component {

  render() {

    return (
      <>
        <h1>Welcome, {this.props.user.name}</h1>
      </>
    )
  }
}