import React, { Component } from 'react'
import { Button, Container, Toast, ToastHeader, Spinner, ToastBody } from 'reactstrap'

import { patchUserPomo } from '../../auth/userManager'

import TimerTasks from './TimerTasks'


export default class Timer extends Component {

  state = {
    minutes: "25",
    seconds: "00",
    counting: false,
    showShort: false,
    showLong: false
  }

  toggleShort = () => {
    this.setState({
      showShort: !this.state.showShort
    });
  }

  toggleLong = () => {
    this.setState({
      showLong: !this.state.showLong
    });
  }

  handleBreaks = (pomoCount) => {
    if (pomoCount % 4 === 0) {
      this.toggleLong()
    } else {
      this.toggleShort()
    }
  }

  handleStart = () => {

    this.setState({
      counting: !this.state.counting
    })

    const interval = setInterval(() => {
      if (this.state.counting) {

        let minutesLeft = this.state.minutes;
        let secondsLeft = this.state.seconds;

        secondsLeft--;

        if (this.state.minutes === "00" && this.state.seconds === "00") {
          const bing = new Audio(require("./sound_ex_machina_Action_Pop+Up.mp3"))

          let keepPomoCount = this.props.user.pomoCounter;
          keepPomoCount++;

          patchUserPomo({
            pomoCounter: keepPomoCount
          }, this.props.user.id)
            .then(() => {
              this.props.refreshUserPomo(keepPomoCount)
              this.props.history.push('/timer')
            })

          this.setState({
            minutes: "25",
            seconds: "00",
            counting: !this.state.counting,
          })

          clearInterval(interval);
          bing.play();
          this.handleBreaks(keepPomoCount);

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
          minutes: "25",
          seconds: "00"
        })

      }
    }, 1000)

  }


  render() {

    let inProgressTasks = this.props.tasks.filter(task => {
      return task.category === "inprogress"
    })
    const startResetColor = !this.state.counting ? "#89AB92" : "#C27D78"

    return (
      <>
        <Container style={{ textAlign: "center" }}>
          <h1 style={{ fontSize: "6rem" }}>[{this.state.minutes}:{this.state.seconds}]</h1>
          <h6>Pomo Counter: {this.props.user.pomoCounter}</h6>
          <Button value="start" style={{
            boxShadow: "none",
            backgroundColor: `${startResetColor}`,
            border: "none"
          }}
            onClick={() => this.handleStart()}
          >Start/Reset</Button>
          <div>
            <Toast isOpen={this.state.showLong} style={{ marginTop: "1rem" }}>
              <ToastHeader toggle={this.toggleLong} icon={<Spinner size="sm" />}>Long Break!</ToastHeader>
              <ToastBody>
                Take A Longer Break! You Deserve It! (15 - 30 minutes)
              </ToastBody>
            </Toast>
          </div>
          <div>
            <Toast isOpen={this.state.showShort} style={{ marginTop: "1rem" }}>
              <ToastHeader toggle={this.toggleShort} icon={<Spinner size="sm" />}>Short Break!</ToastHeader>
              <ToastBody>
                Take A Short Break! (3 - 5 minutes)
              </ToastBody>
            </Toast>
          </div>
        </Container>
        <TimerTasks {...this.props} tasks={inProgressTasks} patchTask={this.props.patchTask} />
      </>
    );
  }
}
