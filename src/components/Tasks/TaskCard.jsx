import React, { Component } from 'react'
import { Card, CardTitle, CardText, CardBody, Collapse, Label, Button, ButtonGroup, FormGroup, Input } from 'reactstrap'

import { FaEllipsisH } from 'react-icons/fa';



export default class TaskCard extends Component {

  state = {
    cardCategory: this.props.task.category,
    collapse: false,
    editing: false,
    newNotes: this.props.task.notes,
    newTitle: this.props.task.title
  }

  toggle = (task) => {

    let newTaskValue = {
      selected: !this.props.task.selected
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
      title: this.state.newTitle,
      notes: this.state.newNotes,
      category: task.category,
      timestamp: newTimestamp
    }

    this.props.editPatch(editedTaskObj, task.id)
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

    const strikeThrough = this.props.task.selected ? "line-through" : ""
    const textColor = this.props.task.selected ? "#BF4D43" : "#212529"
    const visible = this.state.editing ? "none" : ""
    const visibleInline = this.state.editing ? "none" : "inline-block"
    const invisible = this.state.editing ? "" : "none"
    return (
      <>
        <Card body>
          <CardTitle><FormGroup check inline>
            <Label check>
              <Input type="checkbox"
                checked={!this.props.task.selected}
                onChange={() => this.toggle(this.props.task)}
                style={{ display: "none" }}
              />
              <h4
                style={{
                  display: `${visibleInline}`,
                  textDecoration: `${strikeThrough}`,
                  color: `${textColor}`,
                  borderBottom: "solid 1px #488C66",
                  // borderLeft: "solid 1px #488C66",
                  paddingLeft: ".2rem"
                }}>
                {this.props.task.title}</h4>
            </Label>
            <Input type="text"
              placeholder={this.props.task.title}
              value={this.state.newTitle || ""}
              name="newTitle"
              id="newTitle"
              onChange={(e) => this.handleFieldChange(e)}
              style={{ display: `${invisible}` }} />
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
                <Input type="textarea"
                  placeholder={this.props.task.notes}
                  value={this.state.newNotes || ""}
                  name="newNotes"
                  id="newNotes"
                  onChange={(e) => this.handleFieldChange(e)} />

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