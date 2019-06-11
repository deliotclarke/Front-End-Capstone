import React, { Component } from 'react'
import { NavLink as RRNavLink } from 'react-router-dom'
import { Button, ButtonGroup, Container } from 'reactstrap';

class TaskAdd extends Component {


  render() {

    return (
      <>
        <Container>
          <ButtonGroup className="">
            <Button>Add</Button>
          </ButtonGroup>
        </Container>
      </>
    )
  }
}

export default TaskAdd