import React, { Component } from 'react'
import { Card, CardTitle, CardText, CardBody, UncontrolledCollapse, Label, Button, ButtonGroup, FormGroup, Input } from 'reactstrap'


export default class TaskCard extends Component {

  state = {
    selected: false,
    cardCategory: this.props.task.category
  }

  toggle = (task) => {
    this.setState({
      selected: !this.state.selected
    })

    let newTaskValue = {
      selected: !this.state.selected
    }

    this.props.patchTask(newTaskValue, task.id)
  }

  handlePatch = (newCategory, task) => {

    let newCategoryObj = {
      category: newCategory
    }

    let taskId = task.id

    this.props.patchCategory(newCategoryObj, taskId)
  }

  buttonFunction = (taskObj) => {
    let categoryArray = ["todo", "inprogress", "done"]

    let buttonArray = categoryArray.filter(category => {
      return category !== taskObj.category
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
          <Button key={`${buttonValue}_Button_${this.props.task.id}`} size="sm" value={buttonValue} onClick={() => this.handlePatch(buttonValue, this.props.task)}>{buttonLabel}</Button>
        </>
      )
    })
    return myButtons
  }

  render() {

    const strikeThrough = this.state.selected ? "line-through" : ""
    const textColor = this.state.selected ? "#BF4D43" : "#212529"
    return (
      <>
        <Card body>
          <CardTitle><FormGroup check inline>
            <Label check>
              <Input type="checkbox"
                checked={this.state.selected}
                onChange={() => { this.toggle(this.props.task) }}
              />
              <h4
                style={{ display: "inline-block", textDecoration: `${strikeThrough}`, color: `${textColor}` }}>
                {this.props.task.title}</h4>
            </Label>
          </FormGroup>
          </CardTitle>
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
                  {this.buttonFunction(this.props.task)}
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