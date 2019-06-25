import * as firebase from 'firebase/app'
import 'firebase/auth'


const url = 'http://localhost:8088/users'

export const getUser = (userId) => {
  return fetch(`${url}/${userId}`)
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
  return fetch(`${url}/${userId}`, {
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
      return saveUserToJson(user);
    })
    .then(newUserFromJson => {
      setUserInLocalStorage(newUserFromJson);
      return newUserFromJson;
    })
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
  return fetch(`${url}`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(user)
  })
    .then(res => res.json())
    .then(newUser => {
      setUserInLocalStorage(newUser)

      //gives the user object back in order to set the user in local storage
      return newUser;
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

const setUserInLocalStorage = (user) => {
  localStorage.setItem('user', JSON.stringify(user));
}

export const errorDict = {
  "auth/user-not-found": "sorry! looks like you don't exist, let's get you registered.",
  "auth/wrong-password": "your password doesn't match our records, did you try that other one yet?",
  "auth/email-already-in-use": "sorry! that email address is already registered, maybe you meant to login.",
  "auth/weak-password": "weeeeeaaaak! your password is weak, dawg. we need at least 6 characters"
}