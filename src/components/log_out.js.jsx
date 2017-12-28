import React, {Component} from 'react';
import {Redirect} from 'react-router-dom'

class LogOut extends Component{
  constructor(props){
    super(props)
    this.state = {
      redirect: false
    }
  }

  handleLogout = () => {
    window.localStorage.clear();
    this.setState({redirect: true})
  }

  render(){

    if(this.state.redirect){
      return <Redirect to='/' />
    }else{
      return <button onClick={this.handleLogout} className="btn" >Log Out</button>
    }

  }
}

export default LogOut
