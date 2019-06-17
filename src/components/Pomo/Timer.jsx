import React, { Component } from 'react'
import { Button, Container } from 'reactstrap'

import { patchUserPomo } from '../../auth/userManager'
import TaskManager from '../../modules/TaskManager'

import InProgressTasks from '../Tasks/TasksInProgress'




export default class Timer extends Component {
  state = {
    minutes: "00",
    seconds: "03",
    counting: false,
    pomoCounter: this.props.user.pomoCounter
  }

  patchTask = (task, taskId) => {
    TaskManager.patchTask(task, taskId)
  }

  handleBreaks = (pomoCount) => {
    console.log(pomoCount)
    if (pomoCount % 4 === 0) {
      alert("take a long break! 15-30 min!")
    } else {
      alert("take a short break! 3-5 min!")
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
        </Container>
        <InProgressTasks {...this.props} tasks={inProgressTasks} patchTask={this.patchTask} />
      </>
    );
  }
}
