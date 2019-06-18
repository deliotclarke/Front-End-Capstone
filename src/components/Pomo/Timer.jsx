import React, { Component } from 'react'
import { Button, Container, Toast, ToastHeader, Spinner, ToastBody } from 'reactstrap'

import { patchUserPomo } from '../../auth/userManager'
import TaskManager from '../../modules/TaskManager'

import InProgressTasks from '../Tasks/TasksInProgress'




export default class Timer extends Component {
  state = {
    minutes: "00",
    seconds: "03",
    counting: false,
    pomoCounter: this.props.user.pomoCounter,
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

  patchTask = (task, taskId) => {
    TaskManager.patchTask(task, taskId)
  }

  handleBreaks = (pomoCount) => {
    console.log(pomoCount)
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

          let keepPomoCount = this.state.pomoCounter;
          keepPomoCount++;

          let newPomoCountObj = {
            pomoCounter: keepPomoCount
          }

          patchUserPomo(newPomoCountObj, this.props.user.id)
            .then(() => {
              this.props.history.push('/timer')
            })

          this.setState({
            minutes: "00",
            seconds: "03",
            counting: !this.state.counting,
            pomoCounter: keepPomoCount
          })
          clearInterval(interval)
          this.handleBreaks(keepPomoCount)

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
          minutes: "00",
          seconds: "03"
        })

      }
    }, 1000)

  }


  render() {

    let inProgressTasks = this.props.tasks.filter(task => {
      return task.category === "inprogress"
    })
    return (
      <>
        <Container style={{ textAlign: "center" }}>
          <h1 style={{ fontSize: "6rem" }}>{this.state.minutes}:{this.state.seconds}</h1>
          <h6>Pomo Counter: {this.state.pomoCounter}</h6>
          <Button value="start" style={{ boxShadow: "none" }} onClick={() => this.handleStart()}>Start/Reset</Button>
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
        <InProgressTasks {...this.props} tasks={inProgressTasks} patchTask={this.patchTask} />
      </>
    );
  }
}
