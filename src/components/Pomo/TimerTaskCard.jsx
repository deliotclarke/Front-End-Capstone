import React, { Component } from 'react'
import { Card, CardTitle, CardText, CardBody, Collapse, Label, Button, FormGroup, Input } from 'reactstrap'

import { FaEllipsisH } from 'react-icons/fa';



export default class TaskCard extends Component {

  state = {
    collapse: false,
  }

  toggleSelected = (task) => {

    let newTaskValue = {
      selected: !this.props.task.selected
    }

    this.props.patchTask(newTaskValue, task.id)
  }

  toggleCollapse = () => {
    this.setState({
      collapse: !this.state.collapse
    })
  }

  render() {

    const strikeThrough = this.props.task.selected ? "line-through" : ""
    const textColor = this.props.task.selected ? "#BF4D43" : "#212529"

    return (
      <>
        <Card body style={{ boxShadow: "" }}>
          <CardTitle><FormGroup check inline>
            <Label check>
              <Input type="checkbox"
                checked={!this.props.task.selected}
                onChange={() => this.toggleSelected(this.props.task)}
                style={{ display: "none" }}
              />
              <h5
                style={{ display: "inline-block", textDecoration: `${strikeThrough}`, color: `${textColor}` }}>
                {this.props.task.title}</h5>
            </Label>
          </FormGroup>
          </CardTitle>
          <div>
            <Button
              id={`toggleCollapse_${this.props.task.id}`}
              size="sm"
              style={{ backgroundColor: "#3F7255", border: "none", float: "right", display: "inline-block" }}
              onClick={this.toggleCollapse}>
              <FaEllipsisH />
            </Button>
            <Collapse
              id={`#toggler${this.props.task.id}`}
              isOpen={this.state.collapse}>
              <CardBody className="mt-4">
                <CardText>{this.props.task.notes}</CardText>
              </CardBody>
            </Collapse>
          </div>
        </Card >
      </>
    )
  }
}