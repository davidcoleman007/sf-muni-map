import React, { Component } from 'react';
import logo from './logo.svg';

import './App.scss';
import { SFMap } from './components/SFMap';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div className="App-intro">
          <SFMap height={768} width={1024}/>
        </div>
      </div>
    );
  }
}

export default App;
