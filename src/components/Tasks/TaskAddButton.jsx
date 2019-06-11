import React, { Component } from 'react'
import { NavLink as RRNavLink } from 'react-router-dom'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label, Form, FormGroup } from 'reactstrap';
import { FaPlusSquare } from 'react-icons/fa';


class TaskAdd extends Component {

  state = {

  }

  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      backdrop: true
    };

    this.toggle = this.toggle.bind(this);
    this.changeBackdrop = this.changeBackdrop.bind(this);
  }


  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  changeCategory(e) {
    let value = e.target.value;
    if (value !== 'static') {
      value = JSON.parse(value);
    }
    this.setState({ backdrop: value });
  }



  render() {

    return (
      <>
        <Button className="mt-4 mr-4" style={{ backgroundColor: "#488C66", float: "right", border: "none" }}
          onClick={this.toggle}><FaPlusSquare /></Button>
        <div>
          <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className} backdrop={this.state.backdrop}>
            <ModalHeader toggle={this.toggle}>Add Task</ModalHeader>
            <Form inline onSubmit={(e) => e.preventDefault()}>
              <FormGroup>
                <Label for="category">Task Destination</Label>{' '}
                <Input type="select" name="category" id="category" onChange={this.changeCategory}>
                  <option value="todo">To Do</option>
                  <option value="inprogress">In Progress</option>
                  <option value="done">Done</option>
                </Input>
              </FormGroup>
              <Button color="danger" onClick={this.toggle}>{this.props.buttonLabel}</Button>
            </Form>
            <ModalFooter>
              <Button color="primary" onClick={this.toggle}>Do Something</Button>{' '}
              <Button color="secondary" onClick={this.toggle}>Cancel</Button>
            </ModalFooter>
          </Modal>
        </div>
      </>
    )
  }
}

export default TaskAdd