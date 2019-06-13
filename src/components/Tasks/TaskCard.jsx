import React, { Component } from 'react'
import { Card, CardTitle, CardText, CardBody, Collapse, Label, Button, ButtonGroup, FormGroup, Input } from 'reactstrap'

import { FaEllipsisH } from 'react-icons/fa';



export default class TaskCard extends Component {

  state = {
    selected: false,
    cardCategory: this.props.task.category,
    collapse: false,
    editing: false,
    newNotes: ""
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

  startEdit = (taskObj) => {
    this.setState({
      collapse: !this.state.collapse,
      editing: !this.state.editing
    })


  }

  handleFieldChange = (e) => {
    const stateToChange = {};
    stateToChange[e.target.id] = e.target.value;
    this.setState(stateToChange);
  }

  stopEditAndPatch = (task) => {
    this.setState({
      collapse: !this.state.collapse,
      editing: !this.state.editing
    })

    let date = new Date();
    let newTimestamp = date.getTime()

    let editedTaskObj = {
      notes: this.state.newNotes,
      timestamp: newTimestamp
    }

    this.props.patchTask(editedTaskObj, task.id)
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

      //dynamic button factory makes buttons based on where the task is currently placed
      return (
        <>
          <Button
            key={`${buttonValue}_Button_${this.props.task.id}`}
            size="sm"
            value={buttonValue}
            onClick={() => this.handlePatch(buttonValue, this.props.task)}>{buttonLabel}</Button>
        </>
      )
    })
    return myButtons
  }

  render() {

    const strikeThrough = this.state.selected ? "line-through" : ""
    const textColor = this.state.selected ? "#BF4D43" : "#212529"
    const visible = this.state.editing ? "none" : ""
    return (
      <>
        <Card body>
          <CardTitle><FormGroup check inline>
            <Label check>
              <Input type="checkbox"
                checked={this.state.selected}
                onChange={() => this.toggle(this.props.task)}
                style={{ display: "none" }}
              />
              <h4
                style={{ display: "inline-block", textDecoration: `${strikeThrough}`, color: `${textColor}` }}>
                {this.props.task.title}</h4>
            </Label>
          </FormGroup>
          </CardTitle>
          <div>
            <Button
              id={`toggleCollapse_${this.props.task.id}`}
              size="med"
              style={{ backgroundColor: "#3F7255", border: "none", display: `${visible}`, float: "right" }}
              onClick={() => this.startEdit(this.props.task)}>
              <FaEllipsisH />
            </Button>
            <Collapse
              id={`#toggler${this.props.task.id}`}
              isOpen={this.state.collapse}>
              <Card>
                <Input type="textarea" placeholder={this.props.task.notes} name="newNotes" id="newNotes" onChange={this.handleFieldChange} />
                <ButtonGroup className="w-75 mx-auto">
                  {this.buttonFunction(this.props.task)}
                  <Button
                    size="sm"
                    onClick={() => this.stopEditAndPatch(this.props.task)}
                  >Save</Button>
                </ButtonGroup>
              </Card>
            </Collapse>
          </div>
        </Card >
      </>
    )
  }
}