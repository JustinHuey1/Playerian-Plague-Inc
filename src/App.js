import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Sample from "./components/sample.js"
import Map from "./components/map.js"

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="mapContainer">
          
          <Map center=""/>
          
        </div>
      </div>
    );
  }
}

export default App;
