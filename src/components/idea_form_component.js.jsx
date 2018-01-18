import React, { Component } from 'react';
import Axios from 'axios';
import {Card, CardHeader, CardBody, CardFooter} from 'reactstrap';
const IDEA_SERVER = 'http://localhost:3001/api/v1/ideas/';

class IdeaFormComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: this.props.idea.title,
      body: this.props.idea.body
    }
  }

  handleInput = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  SubmitForm = (e) =>{
    e.preventDefault();
    let idea = {
      title: this.state.title,
      body: this.state.body
    }
    Axios.put(IDEA_SERVER + String(this.props.idea.id),
            {idea: idea}
          )
          .then(response => {
            console.log(response)
            this.props.updateIdeas(response.data)
          })
          .catch(error => console.log(error))
  }

  render() {
    return (
      <Card className="card-pull-down">
        <form onSubmit= {this.SubmitForm} >
          <CardHeader className="card-header-fixed">
            <input className='input fc-white' type="text"
            name="title" placeholder='Enter a Title' onChange={this.handleInput} defaultValue = {this.props.idea.title}/> </CardHeader>
          <CardBody className="card-body-fixed-height">
            <textarea className='input' name="body"
            placeholder='Describe your idea' onChange={this.handleInput} defaultValue = {this.props.idea.body}/></CardBody>
          <CardFooter>
            <input type="submit" value="Save" className="btn"/>
          </CardFooter>
        </form>
      </Card>
    );
  }
}

export default IdeaFormComponent
