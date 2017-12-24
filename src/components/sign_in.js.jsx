import React, { Component } from 'react'
import {Container, Row, Col, Card, CardHeader, CardText,CardBody} from 'reactstrap'
import Axios from 'axios'
import Localstorage from 'reactjs-localstorage'

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
      Localstorage.setItem('token', response.headers)
    })
    .catch( error => console.log('invalid email or password'));
  }

  render(){
    return(
      <Container>
        <Row>
          <Col md={{size: 4, offset: 4}}>
            <Card className="ib-auth-container">
              <CardHeader className="card-header-fixed">
                <CardText tag="h3"> Login </CardText>
              </CardHeader>
              <form onSubmit= {this.handleSubmit}>
                <Row>
                  <Col md={{size:10, offset:1}}>
                    <CardBody>
                      <input type="text" name="email" className= "form-control ib-auth-field" placeholder="Email" onChange={this.handleInput}/>
                      <input type="password" name="password" className = "form-control ib-auth-field" placeholder="Password" onChange={this.handleInput}/>
                      <input type="submit" className="btn idea-button ib-auth" value="Login" />
                    </CardBody>
                  </Col>
                </Row>
              </form>
            </Card>
          </Col>
        </Row>
      </Container>
    )
  }
}
