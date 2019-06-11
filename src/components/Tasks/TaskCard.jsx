import React, { Component } from 'react'
import { Card, CardTitle, CardText, Button } from 'reactstrap'


export default class TaskCard extends Component {


  render() {

    return (
      <>
        <Card body>
          <CardTitle>{this.props.task.title}</CardTitle>
          <Button>Go somewhere</Button>
        </Card>
      </>
    )
  }
}