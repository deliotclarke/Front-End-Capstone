import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { login, loginWithGithub } from '../auth/userManager'
import { errorDict } from '../auth/userManager'

import { Container, Form, FormGroup, Label, Input, Jumbotron, Button, FormFeedback, Toast, ToastHeader, ToastBody } from 'reactstrap'

import { FaGithub } from 'react-icons/fa';
import MountainLogo from './green-mountains.png'

export default class Register extends Component {

  state = {
    email: '',
    password: '',
    validate: {
      email: ''
    },
    disableSubmit: true,
    showError: false,
    errorMessage: ""
  }

  submit = () => {
    login(this.state.email, this.state.password)
      .then(user => {
        this.props.onLogin(user);
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

  handleGithub = () => {
    loginWithGithub()
      .then()
  }

  handleError = (errorString) => {
    this.setState({
      errorMessage: errorString,
      showError: !this.state.showError
    })

  }

  closeError = () => {
    this.setState({
      showError: !this.state.showError
    });
  }



  render() {
    const colorFlip = !this.state.disableSubmit ? "#488C66" : "#C27D78"
    return (

      <Jumbotron className="mx-auto" style={{ backgroundColor: "white" }} fluid>
        <Container fluid>
          <h3 className="display-4 text-right" style={{ color: "#488C66" }}><img src={MountainLogo} alt="green logo" style={{ height: "3rem", width: "auto", display: "inline-block", paddingBottom: ".5rem" }} />Resolute.</h3>
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
              style={{ backgroundColor: `${colorFlip}`, borderColor: `${colorFlip}` }}
              onClick={() => this.submit()}
              disabled={this.state.disableSubmit}
            >Login</Button>
            <Button
              style={{ display: "inline-block", float: "right" }}
              onClick={() => this.handleGithub()}
            >Sign in with Github <FaGithub /></Button>
          </Form>
          <p className="lead text-right mt-1">Not a user?
            <Link to="/register"> Register here</Link>
          </p>
          <Toast isOpen={this.state.showError} style={{ marginTop: "1rem" }}>
            <ToastHeader toggle={this.closeError} style={{ color: "#BF4D43" }} >Uh ohhhhhhh!</ToastHeader>
            <ToastBody>
              {this.state.errorMessage}
            </ToastBody>
          </Toast>
        </Container>
      </Jumbotron >
    )
  }
}