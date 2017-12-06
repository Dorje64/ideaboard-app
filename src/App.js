import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import IdeasContainer from './components/IdeasContainer.js.jsx'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">IdeaBroad</h1>
          <h1 className="App-sub-title">Write your idea on IdeaBroad</h1>
        </header>
        <div className="blue-subheader"></div>
       <IdeasContainer />
      </div>
    );
  }
}

export default App;
