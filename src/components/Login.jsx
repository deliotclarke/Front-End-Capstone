import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { login } from '../auth/userManager'

import { Container, Form, FormGroup, Label, Input, Jumbotron, Button } from 'reactstrap'

export default class Register extends Component {

  state = {
    email: '',
    password: ''
  }

  submit = () => {
    login(this.state.email, this.state.password)
      .then(user => {
        this.props.onLogin(user);
        this.props.history.push('/');
      })
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
                onChange={(e) => { this.setState({ email: e.target.value }) }} />

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
            <Button style={{ backgroundColor: "#488C66", borderColor: "#488C66" }} onClick={() => this.submit()}>Login</Button>
          </Form>
          <p className="lead text-right mt-1">Not a user?
            <Link to="/register"> Register here</Link>
          </p>
        </Container>
      </Jumbotron >
    )
  }
}