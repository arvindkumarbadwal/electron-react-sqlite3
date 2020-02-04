import React from 'react';
import logo from './logo.svg';
import './App.css';
//import { ipcRenderer } from 'electron';
const { ipcRenderer } = window.require("electron")


function App() {
  function sayHello() {
    alert('Sending :: How Are You ?')
    ipcRenderer.send('message-from-react', 'How Are You?');
  }
  
  ipcRenderer.on('message-from-electron', (event, arg) => {
    alert('Receive :: ' + arg);
  });

  return (
    <div className="App">
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
        <button onClick={sayHello}> Click Here To Add User !!!</button>
      </header>
    </div>
  );
}

export default App;
