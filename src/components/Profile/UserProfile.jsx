import React, { Component } from 'react'
import * as firebase from 'firebase/app';
import 'firebase/storage';
import { savePhoto } from '../../auth/userManager'

import { Jumbotron, Container, Input, Button, FormGroup } from 'reactstrap';
import { FaPortrait } from 'react-icons/fa';


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
      })
      .then(() => {
        this.props.history.push('/profile')
      })
  }


  render() {

    let showOrHide = "none"
    if (this.state.userImage === "") {
      showOrHide = ""
    }
    return (
      <>
        <Jumbotron style={{ backgroundColor: "white" }} fluid>
          <Container fluid>
            <div style={{ width: "100%", textAlign: "center" }}>
              <img
                style={{
                  verticalAlign: "center",
                  height: "125px",
                  width: "125px",
                  borderRadius: "50%"
                }} src={this.props.user.userImage} alt="" />
            </div>
            <FormGroup style={{ display: `${showOrHide} ` }}>
              <Input
                type="file"
                label="photo"
                onChange={(e) => this.setState({ photoToSave: e.target.files[0] })}
                placeholder="photo" />
              <Button size="sm" style={{ float: "right" }} onClick={this.saveNewPhoto}>Save Photo</Button>
            </FormGroup>

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