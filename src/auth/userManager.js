import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import { base } from '..';


const url = 'https://fecapstone-eliot.firebaseio.com/users'

export const provider = new firebase.auth.GithubAuthProvider();

export const getUser = (userId) => {
  return fetch(`${url}/${userId}.json`)
    .then(res => res.json())
}

export const getAllUsers = () => {
  return fetch(`${url}.json`)
    .then(res => res.json())
}

export const savePhoto = (photoObj, userId) => {
  return patchUser(photoObj, userId)
    .then(currentUser => {
      setUserInLocalStorage(currentUser);
      return currentUser;
    })
}

export const patchUser = (userObj, userId) => {
  return fetch(`${url}/${userId}.json`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(userObj)
  }).then(res => res.json())
}

export const patchUserPomo = (userObj, userId) => {
  return patchUser(userObj, userId)
    .then(currentUser => {
      setUserInLocalStorage(currentUser);
      return currentUser;
    })
}

//this is the mother function
export const register = (user) => {
  //using returns keeps the promise rolling through

  return registerWithFirebase(user.email, user.password)
    .then(firebaseId => {
      user.id = firebaseId;
      user.password = '';
    })
    .then(() => saveUserToJson(user))
}

export const login = (email, password) => {
  return loginWithFirebase(email, password)
    .then(firebaseId => {
      return getUser(firebaseId);
    })
    .then(userFromJson => {
      setUserInLocalStorage(userFromJson);
      return userFromJson;
    })
}

export const saveUserToJson = (user) => {
  return base.post(`users/${user.id}`, {
    data: user
  })
    .then(() => {
      setUserInLocalStorage(user)

      //gives the user object back in order to set the user in local storage
      return user;
    })
}

export const getUserFromLocalStorage = () => {
  const user = localStorage.getItem('user');

  if (!user) return null;

  return JSON.parse(user)
}

export const registerWithFirebase = (email, password) => {
  return firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(data => {
      return data.user.uid;
    })
}

export const loginWithFirebase = (email, password) => {
  return firebase.auth().signInWithEmailAndPassword(email, password)
    .then(data => {
      return data.user.uid;
    })
}

export const loginWithGithub = () => {
  firebase.auth().signInWithPopup(provider).then(function (result) {
    // This gives you a GitHub Access Token. You can use it to access the GitHub API.
    var token = result.credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    // ...
  }).catch(function (error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });
}

const setUserInLocalStorage = (user) => {
  localStorage.setItem('user', JSON.stringify(user));
}

export const errorDict = {
  "auth/user-not-found": "sorry! looks like you don't exist, let's get you registered.",
  "auth/wrong-password": "your password doesn't match our records, did you try that other one yet?",
  "auth/email-already-in-use": "sorry! that email address is already registered, maybe you meant to login.",
  "auth/weak-password": "weeeeeaaaak! your password is weak, dawg. we need at least 6 characters"
}