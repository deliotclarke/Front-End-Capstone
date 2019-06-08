import * as firebase from 'firebase/app'
import 'firebase/auth'


const url = 'http://localhost:8088/users'

export const getUser = (userId) => {
  return fetch(`${url}/${userId}`)
    .then(res => res.json())
}

//user will have name, username, email and password
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
    .catch(error => {
      console.log(error);
      alert('oh noooooo');
    })
}

export const login = (email, password) => {
  return loginWithFirebase(email, password)
    .then(firebaseId => {
      return getUser(firebaseId);
    })
    .then(userFromJson => {
      console.log(userFromJson)
      setUserInLocalStorage(userFromJson);
      return userFromJson;
    })
    .catch(error => {
      console.log(error);
      //error + error message sent to user alert
      alert(`something went terribly wrong...${error.message}`);
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

export const logout = () => {
  localStorage.removeItem('user');
}