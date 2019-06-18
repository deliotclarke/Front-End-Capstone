import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { login } from '../auth/userManager'

import { Container, Form, FormGroup, Label, Input, Jumbotron, Button, FormFeedback } from 'reactstrap'

export default class Register extends Component {

  state = {
    email: '',
    password: '',
    validate: {
      email: ''
    },
    disableSubmit: true
  }

  submit = () => {
    login(this.state.email, this.state.password)
      .then(user => {
        this.props.onLogin(user);
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
          <p className="lead text-right">Let's get on track</p>
          <Form className="border rounded border-faded p-2 mx-auto clear-fix">
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
              disable={this.state.disableSubmit}
            >Login</Button>
          </Form>
          <p className="lead text-right mt-1">Not a user?
            <Link to="/register"> Register here</Link>
          </p>
        </Container>
      </Jumbotron >
    )
  }
}