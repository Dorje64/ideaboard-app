import React, { Component } from 'react'
import Axios from 'axios'

export default class SignIn extends Component{
  constructor(props){
    super(props)
    this.state = {
      email: '',
      password: ''
    }
  }

  handleInput = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  handleSubmit = (e) => {
    e.preventDefault();

    Axios.post('http://localhost:3001/auth/sign_in',
      {
          email: this.state.email,
          password: this.state.password
      })
    .then( response => {
      debugger;
    })
    .catch( error =>
    {
      debugger;
    });
  }

  render(){
    return(
      <div>
        <h1> Sign In</h1>
        <form onSubmit= {this.handleSubmit}>
          <input type="text" name="email" placeholder="Email" onChange={this.handleInput}/>
          <input type="password" name="password" placeholder="Password" onChange={this.handleInput}/>
          <input type="submit" value="submit" />
        </form>
      </div>
    )
  }
}
