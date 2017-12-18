import React, { Component } from 'react';
// import logo from './logo.svg';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import HomePage  from './components/home_page.js.jsx'
import SignIn from './components/sign_in.js.jsx'

// import IdeasComponent from './components/ideas_component.js.jsx'

class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <Switch>
        <Route path= '/sign' component = {SignIn}/>
        <Route path= '/' component = {HomePage} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
