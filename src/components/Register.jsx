import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { register } from '../auth/userManager'
import { errorDict } from '../auth/userManager'
import { goToAnchor } from 'react-scrollable-anchor'

import { Container, Form, FormGroup, Label, Input, Jumbotron, Button, FormFeedback, Toast, ToastHeader, ToastBody } from 'reactstrap'
import ScrollableAnchor from 'react-scrollable-anchor'

export default class Register extends Component {

  state = {
    user: {
      name: '',
      username: '',
      email: '',
      password: '',
      userImage: '',
      pomoCounter: 0,
      permaPomoCounter: 0,
    },
    validate: {
      email: ''
    },
    disableSubmit: true,
    showError: false,
    errorMessage: ""
  }

  submit = () => {
    register(this.state.user)
      .then(newUser => {
        this.props.onRegister(newUser);
        this.props.history.push('/');
      })
      .catch(error => {
        this.handleError(errorDict[error.code])
      })
  }

  validateEmail = (e) => {
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const { validate } = this.state
    if (emailRegex.test(e.target.value)) {
      validate.email = "isValid"
      this.setState({ disableSubmit: false })
    } else {
      validate.email = "isInvalid"
      this.setState({ disableSubmit: true })
    }
    this.setState({ validate })
  }

  storeUser = (e) => {
    const { user } = this.state
    user[e.target.id] = e.target.value
    this.setState({ user })
  }

  handleError = (errorString) => {
    this.setState({
      errorMessage: errorString,
      showError: !this.state.showError
    })
    goToAnchor("error")
  }

  closeError = () => {
    this.setState({
      showError: !this.state.showError
    });
  }

  render() {

    return (

      <Jumbotron className="mx-auto" style={{ backgroundColor: "white" }} fluid>
        <Container fluid>
          <h3 className="display-4 text-right" style={{ color: "#488C66" }}>Resolute.</h3>
          <p className="lead text-right">Let's get registered and get to work</p>
          <Form className="border rounded border-faded p-2 mx-auto clear-fix">
            <FormGroup>
              <Label for="name">Name</Label>
              <Input
                type="text"
                name="name"
                id="name"
                placeholder="full name"
                onChange={(e) => { this.storeUser(e) }} />
            </FormGroup>

            <FormGroup>
              <Label for="username">Username</Label>
              <Input
                type="text"
                name="username"
                id="username"
                placeholder="username"
                onChange={(e) => { this.storeUser(e) }} />
            </FormGroup>

            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                type="email"
                name="email"
                id="email"
                placeholder="email"
                valid={this.state.validate.email === "isValid"}
                invalid={this.state.validate.email === "isInvalid"}
                onChange={(e) => {
                  this.validateEmail(e)
                  this.storeUser(e)
                }} />
              <FormFeedback valid>
                Perrrrrrfect.
              </FormFeedback>
              <FormFeedback>
                Please enter a valid email address to submit!
              </FormFeedback>
            </FormGroup>


            <FormGroup>
              <Label for="password">Password</Label>
              <Input
                type="password"
                name="password"
                id="password"
                placeholder="password"
                onChange={(e) => { this.storeUser(e) }} />
            </FormGroup>

            <Button
              style={{ backgroundColor: "#488C66", borderColor: "#488C66" }}
              onClick={() => this.submit()}
              disabled={this.state.disableSubmit}
            >Register</Button>
          </Form>
          <p className="lead text-right mt-1">Already a user?
            <Link to="/login"> Login here</Link>
          </p>
          <ScrollableAnchor id={"error"}>
            <div>
              <Toast isOpen={this.state.showError} style={{ marginTop: "1rem" }}>
                <ToastHeader toggle={this.closeError} style={{ color: "#BF4D43" }} >Uh ohhhhhhh!</ToastHeader>
                <ToastBody>
                  {this.state.errorMessage}
                </ToastBody>
              </Toast>
            </div>
          </ScrollableAnchor>
        </Container>
      </Jumbotron >
    )
  }
}