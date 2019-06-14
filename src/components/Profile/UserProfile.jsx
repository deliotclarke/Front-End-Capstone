import React, { Component } from 'react'
import { Jumbotron, Container } from 'reactstrap';


export default class UserProfile extends Component {

  render() {

    return (
      <>
        <Jumbotron style={{ backgroundColor: "white" }} fluid>
          <Container fluid>
            <div style={{ textAlign: "center" }}>image container</div>
            <h1 className="display-4 mb-4" style={{ textAlign: "center" }}>{this.props.user.username}</h1>
            <br />
            <p className="lead ">Name: {this.props.user.name}</p>
            <p className="lead">Email: {this.props.user.email}</p>
            <p className="lead">Total Pomodoros:</p>
          </Container>
        </Jumbotron>
      </>
    )
  }
}