import React from 'react';
import NavBar from './NavBar'
import logo from './logo.svg';
import './App.css';
import Button from './Btn.js'


function App() {
  return (
    <>
      <div className="App">
        <NavBar />
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
        </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
        </a>
        </header>
        <Button />
        <button className="ui button" role="button">Btn with Semantic-UI</button>
      </div>
    </>
  );
}

export default App;
