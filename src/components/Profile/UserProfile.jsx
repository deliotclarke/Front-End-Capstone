import React, { Component } from 'react'
import * as firebase from 'firebase/app';
import 'firebase/storage';
import { savePhoto } from '../../auth/userManager'

import { Jumbotron, Container, Input, Button, FormGroup, FormText } from 'reactstrap';
import { FaPortrait, FaPlusSquare, FaTimesCircle, FaPlusCircle } from 'react-icons/fa';


export default class UserProfile extends Component {

  storageRef = firebase.storage().ref('profiles');

  state = {
    photoToSave: null,
    userImage: this.props.user.userImage
  }

  saveNewPhoto = () => {
    const ref = this.storageRef.child(`profile-photo-${Date.now()}`)

    ref.put(this.state.photoToSave)
      .then(data => data.ref.getDownloadURL())
      .then(url => {
        savePhoto({
          userImage: url
        }, this.props.user.id)
          .then(() => {
            this.props.refreshUserImage(url)
            debugger
            this.props.history.push('/profile')
          })
      })
  }

  deleteUserPhoto = () => {
    savePhoto({
      userImage: ""
    }, this.props.user.id)
      .then(() => {
        this.props.refreshUser("")
        this.props.history.push('/profile')
      })
  }

  render() {

    // !! turns the "variable" into a boolean
    const visible = !!this.props.user.userImage ? "" : "none"
    const invisible = !!this.props.user.userImage ? "none" : ""

    return (
      <>
        <Jumbotron style={{ backgroundColor: "white" }} fluid>
          <Container fluid>
            <div style={{ width: "100%", textAlign: "center" }}>
              <Button
                size="sm"
                style={{
                  border: "none",
                  borderRadius: "50%",
                  backgroundColor: "transparent",
                  color: "#BF4D43",
                  position: "absolute",
                  display: `${visible}`
                }}
                onClick={this.deleteUserPhoto}><FaTimesCircle /></Button>
              <img
                style={{
                  display: `${visible}`,
                  verticalAlign: "center",
                  height: "125px",
                  width: "125px",
                  borderRadius: "50%"
                }} src={this.props.user.userImage} alt="" />
              <FaPortrait
                style={{
                  display: `${invisible}`,
                  verticalAlign: "center",
                  height: "125px",
                  width: "125px",
                  borderRadius: "50%"
                }} />
            </div>
            <div style={{ display: `${invisible}`, textAlign: "center" }}>
              <FormText>No user image exists, upload an image below!</FormText>
              <FormGroup className="mt-4" style={{ display: `${invisible}`, textAlign: "right" }}>
                <div style={{ display: "flex" }}>
                  <Input
                    type="file"
                    label="photo"
                    onChange={(e) => this.setState({ photoToSave: e.target.files[0] })}
                    placeholder="photo" />
                  <Button size="sm" className="btn" style={{ backgroundColor: "#488C66", border: "none" }} onClick={this.saveNewPhoto}><FaPlusCircle /></Button>
                </div>
              </FormGroup>
            </div>

            <h2 className="display-4 mb-4" style={{ textAlign: "center", color: "#488C66" }}>{this.props.user.username}</h2>
            <br />
            <p className="lead" style={{ borderBottom: "solid 1px #488C66", display: "inline-block" }}>Name: {this.props.user.name}</p>
            <p className="lead" style={{ borderBottom: "solid 1px #488C66", display: "inline-block" }}>Email: {this.props.user.email}</p>
            <p className="lead" style={{ borderBottom: "solid 1px #488C66", display: "inline-block" }}>Total Pomodoros: {this.props.user.permaPomoCounter}</p>
          </Container>
        </Jumbotron>
      </>
    )
  }
}