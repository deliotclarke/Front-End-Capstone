import React, { Component } from 'react'
import { Button, Container } from 'reactstrap'

import { getUserFromLocalStorage } from '../../auth/userManager'




export default class Timer extends Component {
  state = {
    minutes: "00",
    seconds: "03",
    counting: false,
    user: getUserFromLocalStorage(),
    pomoCounter: this.props.user.pomoCounter
  }

  handleStart = (e) => {

    this.setState({
      counting: !this.state.counting
    })

    const interval = setInterval(() => {
      if (this.state.counting) {

        let minutesLeft = this.state.minutes
        let secondsLeft = this.state.seconds


        secondsLeft--;

        if (this.state.minutes === "00" && this.state.seconds === "00") {

          let keepPomoCount = this.state.user.pomoCounter
          keepPomoCount++;

          let newPomoCountObj = {
            pomoCounter: keepPomoCount
          }

          //!look out nowwwww

          this.props.patchUserPomo(newPomoCountObj, this.state.user.id)

          clearInterval(interval)
          this.setState({
            minutes: 0,
            seconds: 10,
            pomoCounter: keepPomoCount
          })
        } else if (this.state.seconds === "00") {
          minutesLeft--;
          secondsLeft = 59
          this.setState({
            minutes: minutesLeft,
            seconds: secondsLeft
          })
          if (minutesLeft < 10) {
            this.setState({
              minutes: "0" + minutesLeft
            })
          }
        } else if (secondsLeft < 10) {
          this.setState({
            seconds: "0" + secondsLeft
          })

        } else {
          this.setState({
            seconds: secondsLeft
          })
        }

      } else if (this.state.counting === false) {

        clearInterval(interval)
        this.setState({
          minutes: 1,
          seconds: 10
        })

      }
    }, 1000)

  }


  render() {
    return (
      <Container style={{ textAlign: "center" }}>
        <h1 style={{ fontSize: "6rem" }}>{this.state.minutes}:{this.state.seconds}</h1>
        <Button value="start" onClick={(e) => { this.handleStart(e) }}>Start/Reset</Button>
        <Button value="pomoTest" onClick={() => { console.log(this.state.pomoCounter) }}>Pomo Test</Button>
      </Container>
    );
  }
}
