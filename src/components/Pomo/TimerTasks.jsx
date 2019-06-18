import React, { Component } from 'react'
import { Container, CardColumns } from 'reactstrap'
import TimerTaskCard from './TimerTaskCard'

export default class TimerTasks extends Component {


  render() {

    // need collapse on each card to display info to be able to edit card!

    return (
      <>
        <Container>
          <CardColumns>
            <h3 className="mt-4" style={{ color: "#3F7255" }}>Current Tasks</h3>
            {
              this.props.tasks.map(task =>
                <TimerTaskCard key={task.id} task={task} {...this.props} />
              )
            }
          </CardColumns>
        </Container>
      </>
    )
  }
}