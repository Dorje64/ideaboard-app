import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import IdeasContainer from './components/IdeasContainer.js.jsx'
import Axios from 'axios'

class App extends Component {
  newIdea = () =>{
    Axios.post('http://localhost:3001/api/v1/ideas',
    {idea:
      {
        title: '',
        body: ''
      }
    })
    .then(response =>
      {
        console.log(response)
      }
    ).catch( error =>
      {
        console.log(error)
      }
    )

  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">IdeaBroad</h1>
          <h1 className="App-sub-title">Write your idea on IdeaBroad</h1>
        </header>
        <div className="blue-subheader">
          <button className="newIdeaButton" onClick={this.newIdea}> New Idea </button>
        </div>
       <IdeasContainer />
      </div>
    );
  }
}

export default App;
