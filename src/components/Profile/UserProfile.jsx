import React, { Component } from 'react'
import * as firebase from 'firebase/app';
import 'firebase/storage';
import { savePhoto } from '../../auth/userManager'

import { Jumbotron, Container, Input, Button, FormGroup, FormText } from 'reactstrap';
import { FaPortrait } from 'react-icons/fa';

import './UserProfile.css'


export default class UserProfile extends Component {

  storageRef = firebase.storage().ref('profiles');

  state = {
    photoToSave: null,
  }

  saveNewPhoto = () => {
    const ref = this.storageRef.child(`profile-photo-${Date.now()}`)

    ref.put(this.state.photoToSave)
      .then(data => data.ref.getDownloadURL())
      .then(url => {
        savePhoto({
          userImage: url
        }, this.props.user.id)
      })
      .then(() => {
        this.props.history.push('/profile')
      })
  }


  render() {
    let visible = ""
    let invisible = "none"
    if (this.props.user.userImage === "") {
      invisible = ""
      visible = "none"
    }
    return (
      <>
        <Jumbotron style={{ backgroundColor: "white" }} fluid>
          <Container fluid>
            <div style={{ width: "100%", textAlign: "center" }}>
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
              <FormGroup className="mt-4" style={{ display: `${invisible}`, textAlign: "center" }}>
                <div className="upload-btn-wrapper">
                  <Button size="sm" className="btn" onClick={this.saveNewPhoto}>Upload Photo</Button>
                  <Input
                    type="file"
                    label="photo"
                    onChange={(e) => this.setState({ photoToSave: e.target.files[0] })}
                    placeholder="photo" />
                </div>
              </FormGroup>
            </div>

            <h1 className="display-4 mb-4" style={{ textAlign: "center" }}>{this.props.user.username}</h1>
            <br />
            <p className="lead" style={{ borderBottom: "solid 1px #488C66", display: "inline-block" }}>Name: {this.props.user.name}</p>
            <p className="lead" style={{ borderBottom: "solid 1px #488C66", display: "inline-block" }}>Email: {this.props.user.email}</p>
            <p className="lead" style={{ borderBottom: "solid 1px #488C66", display: "inline-block" }}>Total Pomodoros:</p>
          </Container>
        </Jumbotron>
      </>
    )
  }
}