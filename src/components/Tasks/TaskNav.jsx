import React, { Component } from 'react'
import { NavLink as RRNavLink } from 'react-router-dom'
import { Button, ButtonGroup, Container } from 'reactstrap';

class TaskNav extends Component {


  render() {

    return (
      <>
        <Container>
          <ButtonGroup className="fixed-bottom mb-4 mx-auto" style={{ width: "80%" }}>
            <Button
              tag={RRNavLink} to="/tasks/todo">
              To Do
              </Button>
            <Button
              tag={RRNavLink} to="/tasks/inprogress">
              In Progress
              </Button>
            <Button
              tag={RRNavLink} to="/tasks/done">
              Done
              </Button>
          </ButtonGroup>
        </Container>
      </>
    )
  }
}

export default TaskNav