import React, { Component } from 'react'
import Axios from 'axios'

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
    Axios.put('http://localhost:3001/api/v1/ideas/'+String(this.props.idea.id),
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
      <div className="tile">
        <form onSubmit= {this.SubmitForm} >
          <input className='input' type="text"
            name="title" placeholder='Enter a Title' onChange={this.handleInput} />
          <textarea className='input' name="body"
            placeholder='Describe your idea' onChange={this.handleInput} ></textarea>
            <input type="submit" value="Submit"/>
        </form>
      </div>
    );
  }
}

export default IdeaFormComponent
