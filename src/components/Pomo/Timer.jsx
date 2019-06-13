import React, { Component } from 'react'
import { Button, Container } from 'reactstrap'



export default class Timer extends Component {
  state = {
    minutes: '00',
    seconds: 10,
    counting: false
  }



  inASecond = () => {

    if (this.state.counting) {

      let secondsLeft = this.state.seconds
      // if (totalSeconds < 10) {
      //   this.setState({
      //     seconds: "0" + this.state.seconds
      //   })
      // }

      // if (totalSeconds === 0) {
      //   this.setState({
      //     counting: false,
      //     seconds: '10'
      //   })
      // }
      secondsLeft--;

      this.setState({
        seconds: secondsLeft
      })
      console.log(this.state.seconds)
    }
  }

  handleStart = (e) => {
    let totalSeconds = parseInt(this.state.seconds)

    this.setState({
      counting: !this.state.counting
    })

    setInterval(this.inASecond, 1000)
  }

  handleReset = e => {
    console.log(e.target.value)
  }


  render() {
    return (
      <Container style={{ textAlign: "center" }}>
        <h1 style={{ fontSize: "6rem" }}>{this.state.minutes}:{this.state.seconds}</h1>
        <Button value="start" onClick={(e) => { this.handleStart(e) }}>Start/Stop</Button>
        <Button value="reset" onClick={(e) => { this.handleReset(e) }}>Reset</Button>
      </Container>
    );
  }
}
