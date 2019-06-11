import React, { Component } from 'react'
import { Container, CardColumns } from 'reactstrap'
import TaskCard from './TaskCard'


export default class TasksToDo extends Component {


  render() {

    // need collapse on each card to display info to be able to edit card!

    return (
      <>
        <Container>
          <CardColumns>
            <h2 className="mt-4" style={{ color: "#3F7255" }}>To Do</h2>
            {
              this.props.tasks.map(task =>
                <TaskCard key={task.id} task={task} {...this.props} />
              )
            }
          </CardColumns>
        </Container>
      </>
    )
  }
}