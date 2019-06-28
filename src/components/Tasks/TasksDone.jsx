import React, { Component } from 'react'
import { Container, CardColumns, Alert } from 'reactstrap'
import TaskCard from './TaskCard'


export default class TasksDone extends Component {


  render() {

    // need collapse on each card to display info to be able to edit card!

    return (
      <>
        <Container style={{ marginBottom: "5rem" }}>
          <CardColumns>
            <h2 className="mt-4" style={{ color: "#3F7255" }}>Done</h2>
            <div>
              <Alert
                style={{ backgroundColor: "#89AB92", color: "white", border: "none", boxShadow: "none", outline: "none" }}
                isOpen={this.props.confirmTaskAdd}
                toggle={this.props.handleAddConfirm}>
                Task Added!</Alert>
            </div>
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