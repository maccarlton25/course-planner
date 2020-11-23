import React, { Component } from 'react';
import './App.css';
import WeekContainer from './WeekContainer';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <WeekContainer />
      </div>
    );
  }
}

export default App;
