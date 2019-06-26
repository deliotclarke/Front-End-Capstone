import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'
import * as firebase from 'firebase/app'
import 'firebase/database'

import Rebase from 're-base'
import firebaseConfig from './auth/APIconfig'

import 'bootstrap/dist/css/bootstrap.min.css'


// Initialize Firebase & Rebase
const app = firebase.initializeApp(firebaseConfig);
const base = Rebase.createClass(app.database())

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

export { base }
