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
  InputGroupText,
  Alert
} from 'reactstrap';

import { FaPlusSquare } from 'react-icons/fa';


class TaskAdd extends Component {

  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      backdrop: true,
      visible: true,
      taskTitle: "",
      taskNotes: "",
      timestamp: "",
      taskCategory: "todo",
      showOnTimer: false,
      completed: false
    };

    this.createTaskObj = this.createTaskObj.bind(this);
    this.toggle = this.toggle.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
  }


  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  onDismiss() {
    this.setState({ visible: false });
  }

  handleFieldChange = evt => {
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
    this.setState(stateToChange);
  }

  handleSelect = e => {
    const stateToChange = {};
    if (e.target.value === "inprogress") {
      this.setState({ showOnTimer: true, completed: false })
    } else if (e.target.value === "done") {
      this.setState({ completed: true, showOnTimer: false })
    } else {
      this.setState({ showOnTimer: false, completed: false })
    }
    stateToChange[e.target.id] = e.target.value;
    this.setState(stateToChange)
  }

  createTaskObj() {
    if (this.state.taskTitle === "" || this.state.taskNotes === "" || this.state.taskCategory === "") {
      return (
        <Alert color="danger" isOpen={this.state.visible} toggle={this.onDismiss}>
          Please complete form!
      </Alert>
      )
    } else {

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

      this.toggle();
      this.props.addTask(newTask);

    }
  }


  render() {

    return (
      <>
        <div className="clear-fix">
          <Button className="float-right mt-4 mr-4" style={{ backgroundColor: "#BF4D43", border: "none", zIndex: "99", position: "sticky", display: "inline" }}
            onClick={this.toggle}><FaPlusSquare /></Button>
        </div>
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
                  <Input type="select" name="category" id="taskCategory" onChange={this.handleSelect}>
                    <option value="todo" defaultValue>To Do</option>
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