import React, { Component } from 'react'

import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Form,
  InputGroup,
  InputGroupAddon,
  InputGroupText
} from 'reactstrap';

import { FaPlusSquare } from 'react-icons/fa';


class TaskAdd extends Component {

  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      backdrop: true,
      taskTitle: "",
      taskNotes: "",
      timestamp: "",
      taskCategory: "",
      showOnTimer: false,
      completed: false
    };

    this.createTaskObj = this.createTaskObj.bind(this);
    this.toggle = this.toggle.bind(this);
  }


  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }


  handleFieldChange = evt => {
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
    this.setState(stateToChange);
  };

  createTaskObj() {
    if (this.state.taskTitle === "" || this.state.taskNotes === "" || this.state.taskCategory === "") {
      alert("please complete form!")
    } else {
      if (this.state.taskCategory === "inprogress") {
        this.setState({ showOnTimer: true })
      } else {
        this.setState({ showOnTimer: false })
      }

      let date = new Date();
      let newTimestamp = date.getTime();

      const newTask = {
        userId: this.props.user.id,
        title: this.state.taskTitle,
        notes: this.state.taskNotes,
        timestamp: newTimestamp,
        category: this.state.taskCategory,
        showOnTimer: this.state.showOnTimer,
        completed: false
      }

      console.log(newTask)
      this.props.addTask(newTask);

    }
  }


  render() {

    return (
      <>
        <Button className="mt-4 mr-4" style={{ backgroundColor: "#488C66", float: "right", border: "none" }}
          onClick={this.toggle}><FaPlusSquare /></Button>
        <div>
          <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className} backdrop={this.state.backdrop}>
            <ModalHeader toggle={this.toggle}>Add Task</ModalHeader>
            <ModalBody>
              <Form inline onSubmit={(e) => e.preventDefault()}>
                <InputGroup className="mt-2">
                  <Input type="text" name="title" id="taskTitle" onChange={this.handleFieldChange} />
                  <InputGroupAddon addonType="append">
                    <InputGroupText>Title</InputGroupText>
                  </InputGroupAddon>
                </InputGroup>

                <InputGroup className="mt-2">
                  <Input type="text" name="notes" id="taskNotes" onChange={this.handleFieldChange} />
                  <InputGroupAddon addonType="append">
                    <InputGroupText>Notes</InputGroupText>
                  </InputGroupAddon>
                </InputGroup>

                <InputGroup className="mt-2">
                  <Input type="select" name="category" id="taskCategory" onChange={this.handleFieldChange}>
                    <option value="todo">To Do</option>
                    <option value="inprogress">In Progress</option>
                    <option value="done">Done</option>
                  </Input>
                  <InputGroupAddon addonType="append">
                    <InputGroupText>Category</InputGroupText>
                  </InputGroupAddon>
                </InputGroup>
              </Form>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={this.createTaskObj}>Add Task</Button>{' '}
              <Button color="secondary" onClick={() => { console.log(this.props.addTask) }}>Not That</Button>
              <Button color="danger" onClick={this.toggle}>Cancel</Button>
            </ModalFooter>
          </Modal>
        </div>
      </>
    )
  }
}

export default TaskAdd