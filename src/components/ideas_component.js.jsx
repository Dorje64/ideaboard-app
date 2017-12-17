import React, { Component } from 'react'
import Axios from 'axios'
import IdeaComponent from './idea_component.js.jsx'
import IdeaFormComponent from './idea_form_component.js.jsx'

class IdeasComponent extends Component{
  constructor(props){
    super(props)
    this.state ={
      ideas: [],
      editingIdea: null
    }
  }

  newIdea = () =>{
    Axios.post('http://localhost:3001/api/v1/ideas',
    {idea:
      {
        title: '',
        body: ''
      }
    })
    .then(response => {
        console.log(response)
        let Ideas = this.state.ideas
        Ideas.unshift(response.data)
        this.setState({ideas: Ideas, editingIdea: response.data.id})
      }
    ).catch( error => {
        console.log(error)
      }
    )
  }

  updateIdeas = (idea) => {
    let ideaIndex = this.state.ideas.findIndex(x => x.id === idea.id)
    let ideas = this.state.ideas
    ideas[ideaIndex] = idea
    this.setState({ideas: ideas , editingIdea: null})
  }

  componentWillMount(){
    Axios.get('http://localhost:3001/api/v1/ideas.json')
    .then( (response) => {
      console.log(response)
      this.setState({ideas: response.data})
    })
    .catch(error=>{ console.log(error)})
  }

  enableEdit = (id) => {
    this.setState({editingIdea: id})
  }

  render(){
    return(
        <div>
        <div className="blue-subheader">
          <button className="newIdeaButton" onClick={this.newIdea} > New Idea </button>
        </div>
          { this.state.ideas.map( (idea) => {
            if (this.state.editingIdea === idea.id) {
              return( <IdeaFormComponent idea={idea} key={idea.key} updateIdeas= {this.updateIdeas} /> )
            }
            else{
              return( <IdeaComponent idea={idea} key={idea.id} enableEdit={this.enableEdit}/> )
            }
          }
          )}
        </div>
    )
  }
}

export default IdeasComponent
