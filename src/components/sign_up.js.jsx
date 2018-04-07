import React, {Component} from 'react'
import Axios from 'axios'
const HOST_API = process.env.REACT_APP_HOST_API + '/auth';

class SignUp extends Component{
  constructor(props){
    super(props)
    this.state = {
      email: '',
      password: '',
      confirm_password: ''
    }
  }

  handleInput = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  handleSubmit = (e) => {
    e.preventDefault();
    Axios.post(HOST_API,
      {
        email: this.state.email,
        password: this.state.password,
        password_confirmation: this.state.confirm_password
      }
    )
    .then( response => {
    })
    .catch( error => {

    })
  }


  render(){
    return(
      <form onSubmit= {this.handleSubmit}>
      <input type="text" name="email" placeholder="Email" onChange={this.handleInput}/>
      <input type="password" name="password" placeholder="Password" onChange={this.handleInput}/>
      <input type="password" name= "confirm_password" placeholder="password" onChange={this.handleInput} />
      <input type="submit" value="submit" />
      </form>
    )
  }

}

export default SignUp
