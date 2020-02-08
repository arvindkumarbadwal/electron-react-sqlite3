import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
//import { ipcRenderer } from 'electron';
const { ipcRenderer } = window.require("electron")


function App() {
  const [name, setName] = useState('');

  ipcRenderer.removeAllListeners('message-from-electron')


  function sayHello() {
    ipcRenderer.send('message-from-react', name);
  }
  
  ipcRenderer.on('message-from-electron', (event, arg) => {
    alert(arg);
    setName('');
  });

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div>
          <label>Send You Name To Moon Mission 2020</label>
        </div>
        <div>
          <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <button onClick={sayHello}> Click Here To Add User !!!</button>
      </header>
    </div>
  );
}

export default App;
