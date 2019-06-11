import React, { Component } from 'react'
import { Card, CardTitle, CardText, CardBody, UncontrolledCollapse, Label, Button, ButtonGroup } from 'reactstrap'


export default class TaskCard extends Component {

  buttonFunction = (taskCategory) => {
    let categoryArray = ["todo", "inprogress", "done"]

    let buttonArray = categoryArray.filter(category => {
      return category !== taskCategory
    })

    let myButtons = buttonArray.map(buttonValue => {
      let buttonLabel = ""
      switch (buttonValue) {
        case "done":
          buttonLabel = "Done"
          break;
        case "inprogress":
          buttonLabel = "In Progress"
          break;
        default:
          buttonLabel = "To Do"
      }

      return (
        <>
          <Button size="sm" value={buttonValue} onClick={(e) => { console.log(e.target.value) }}>{buttonLabel}</Button>
        </>
      )
    })
    return myButtons
  }

  render() {

    return (
      <>
        <Card body>
          <CardTitle><h4>{this.props.task.title}</h4></CardTitle>
          <div>
            <Button id={`toggler${this.props.task.id}`} size="sm" style={{ marginBottom: '1rem', backgroundColor: "#3F7255", border: "none" }}>
              See more
    </Button>
            <UncontrolledCollapse toggler={`#toggler${this.props.task.id}`}>
              <Card>
                <CardBody>
                  {this.props.task.notes}
                </CardBody>
                <ButtonGroup className="w-75 mx-auto">
                  {this.buttonFunction(this.props.task.category)}
                  <Button size="sm">Cancel</Button>
                </ButtonGroup>
              </Card>
            </UncontrolledCollapse>
          </div>
        </Card >
      </>
    )
  }
}