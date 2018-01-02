import React, { Component } from 'react';
// import logo from './logo.svg';
import { BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom'
import HomePage  from './components/home_page.js.jsx'
import SignIn from './components/sign_in.js.jsx'
import SignUp from './components/sign_up.js.jsx'
import {reactLocalStorage as LocalStorage} from 'reactjs-localstorage';

// import IdeasComponent from './components/ideas_component.js.jsx'
//conmponent for 404 error
const PageNotFound = ({location}) =>
  <div>
    <h1>Page not Found (404) {location.pathname} {location.search}  </h1>
  </div>

function CheckAuth() {
  const tokens = LocalStorage.getObject('tokens')
  const timeNow = new Date();
  if(tokens && tokens.expiry > timeNow.getTime()/1000 ){
      return true;
  }else{
    return false
  }
}

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
      CheckAuth() ? (
        <Component {...props}/>
      ) : (
        <Redirect to={{
          pathname: '/sign_in',
          state: { from: props.location }
        }}/>
      )
    )}/>
  )

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path = '/sign_in' component = {SignIn}/>
          <PrivateRoute exact path = '/' component = {HomePage} />
          <Route exaxt path ='/sign_up' component = {SignUp}/>
          <Route component={PageNotFound}/>
        </Switch>
      </Router>
    );
  }
}

export default App;
