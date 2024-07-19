import logo from './logo.svg';
import React, { Component } from 'react';
import './App.css';
import './bootstrap.css';
import DestinationApp from './components/DestinatonApp';

class App extends Component {
  render() {
    return (
      <div className="App">
      <DestinationApp/>
      </div>
    );
  }
}

export default App;
