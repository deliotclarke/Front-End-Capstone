import React, { Component } from 'react'
import { Container, Card, CardBody, UncontrolledCollapse, FormText, Button } from 'reactstrap'

import { FaPlusSquare, FaTimes, FaEllipsisH } from 'react-icons/fa';
// import './LandingScreen.css'

export default class LandingScreen extends Component {

  render() {
    return (
      <>
        <div className="main-body">
          <Container>
            <h2 style={{ textAlign: "center", paddingTop: "1rem", color: "#89AB92", borderBottom: "1px solid #89AB92" }}>Welcome, {this.props.user.username}!</h2>
            <br />
            <div>
              <p className="lead">This is <span style={{ color: "#3F7255", fontWeight: "700" }}>Resolute.</span> <br /><br />We're here to help you <br /><strong>get organized</strong>, <strong>get to work</strong> and <br /><strong>reach your goals</strong>.<br /><br />We utilize a mini <span style={{ color: "#3F7255", fontWeight: "600" }}>Kanban Board</span> and the <span style={{ fontWeight: "600", color: "#BF4D43" }}>Pomodoro Technique</span> to help you get on track and stay there.<br /><br />If this is your first introduction to the <span style={{ fontWeight: "600", color: "#BF4D43" }}>Pomodoro Technique</span> or your first time here, click the button below to see suggestion for utilizing our app.</p>
            </div>
            <Button id="toggler" style={{ marginBottom: "1rem", marginTop: "1rem", backgroundColor: "#3F7255", border: "none" }}>
              How To
        </Button>
            <UncontrolledCollapse toggler="#toggler">
              <Card className="mb-4">
                <CardBody>
                  First, the <span style={{ fontWeight: "600", color: "#BF4D43" }}>Pomodoro Technique</span>, this technique is used by many to encourage consistent workflow. Here's one approach:
                <ol>
                    <li>Decide on the task, or tasks, to be done.</li>
                    <li>Set the pomodoro timer (traditionally to 25 minutes).</li>
                    <li>Work on the task/tasks.</li>
                    <li>When the timer ends, put a checkmark on a piece of paper (we keep track of this for you with your Pomo Counter).</li>
                    <li>If you have fewer than four checkmarks, take a short break (3–5 minutes), then go to step 2.</li>
                    <li>After four pomodoros, take a longer break (15–30 minutes), then go to step 1.</li>
                  </ol>
                  <FormText>Note: On logout, your Pomo Count will reset.</FormText><br />
                  Next, our miniature version of the <span style={{ color: "#3F7255", fontWeight: "600" }}>Kanban Board</span>. You'll have three sections/boards. To Do, In Progress, Done. Here's some suggestions for use:
                <ul>
                    <li>Create tasks using the <FaPlusSquare /> button. The form allows you to title the task, add notes and place the task on whatever board you choose.</li>
                    <li>Whichever tasks you place into In Progress, will appear on your timer screen for ease of use.</li>
                    <li>At anytime you can move your tasks or edit them by pressing the <FaEllipsisH /> button on each tasks card.</li>
                    <li>If you decide you'd like to remove a task entirely, just click the title of as many as you'd like to delete and press the <FaTimes /> button. Any task that has turned red and striked out will be removed permanently, so feel free to track finished tasks by leaving them on your Done board.</li>
                  </ul>

                  <h6 className="mt-5" style={{ color: "#C27D78" }}>“Divide each difficulty into as many parts as is feasible and necessary to resolve it.” </h6>
                  <h6 style={{ float: "right", color: "#89AB92" }}>― René Descartes</h6>
                </CardBody>
              </Card>
            </UncontrolledCollapse>
          </Container>
        </div>
      </>
    )
  }
}