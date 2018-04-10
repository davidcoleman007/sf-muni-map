import React, { Component } from 'react';
import logo from './logo.svg';

import './App.scss';
import { Map } from './components/common/Map';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div className="App-intro">
          <Map size={[500,500]}/>
        </div>
      </div>
    );
  }
}

export default App;
