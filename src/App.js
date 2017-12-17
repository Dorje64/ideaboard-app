import React, { Component } from 'react';
// import logo from './logo.svg';
import './style/App.css';
import './style/ideaform.css'
import './style/ideas.css'

import IdeasComponent from './components/ideas_component.js.jsx'

class App extends Component {

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">IdeaBroad</h1>
          <h1 className="App-sub-title">Write your idea on IdeaBroad</h1>
        </header>

       <IdeasComponent key = {IdeasComponent.id}/>
      </div>
    );
  }
}

export default App;
