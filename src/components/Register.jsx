import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { register } from '../auth/userManager'

import { Container, Form, FormGroup, Label, Input, Jumbotron, Button, FormFeedback } from 'reactstrap'

export default class Register extends Component {

  state = {
    name: '',
    username: '',
    email: '',
    password: '',
    userImage: '',
    validate: {
      email: ''
    },
    pomoCounter: 0,
    disableSubmit: true
  }

  submit = () => {
    register(this.state)
      .then(newUser => {
        this.props.onRegister(newUser);
        this.props.history.push('/');
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
                onChange={(e) => { this.setState({ name: e.target.value }) }} />
            </FormGroup>

            <FormGroup>
              <Label for="username">Username</Label>
              <Input
                type="text"
                name="username"
                id="username"
                placeholder="username"
                onChange={(e) => { this.setState({ username: e.target.value }) }} />
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
                  this.setState({ email: e.target.value })
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
                onChange={(e) => { this.setState({ password: e.target.value }) }} />
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
        </Container>
      </Jumbotron >
    )
  }
}