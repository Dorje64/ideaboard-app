import React, { Component } from 'react'
import Axios from 'axios'
import IdeaComponent from './idea_component.js.jsx'
import IdeaFormComponent from './idea_form_component.js.jsx'
import Search from './search.js.jsx'
import {Container, Row, Col, Button} from 'reactstrap'


class IdeasComponent extends Component{
  constructor(props){
    super(props)
    this.state ={
      ideas: [],
      editingIdea: null
    }
  }

  componentDidMount(){
    Axios.get('http://localhost:3001/api/v1/ideas.json')
    .then( (response) => {
      console.log(response)
      this.setState({ideas: response.data})
    })
    .catch(error=>{ console.log(error)})
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

  deleteIdea = (id) => {
    Axios.delete('http://localhost:3001/api/v1/ideas/' + String(id))
    .then(response => {
      let ideaIndex = this.state.ideas.findIndex(x => x.id === id)
      let idea = this.state.ideas
      idea.splice(ideaIndex,1)
      this.setState(idea: idea)
    })
    .catch(error => console.log(error))
  }

  updateIdeas = (idea) => {
    let ideaIndex = this.state.ideas.findIndex(x => x.id === idea.id)
    let ideas = this.state.ideas
    ideas[ideaIndex] = idea
    this.setState({ideas: ideas , editingIdea: null})
  }

  handleSearch = (foundItem) => {
    this.setState( {ideas: foundItem} )
  }

  enableEdit = (id) => {
    this.setState({editingIdea: id})
  }

  render(){
    return(
        <Container>
          <Row className="idea-menu">
            <Col md={8} xs={4}>
              <Button className="idea-button" onClick={this.newIdea} > New Idea </Button>
            </Col>
            <Col md={4}>
              <Search searchIdea = {this.handleSearch}/>
            </Col>
          </Row>

          <Row>
              { this.state.ideas.map( (idea) => {
                if (this.state.editingIdea === idea.id) {
                  return(
                    <Col md={4}>
                      <IdeaFormComponent idea={idea} key={idea.key} updateIdeas= {this.updateIdeas} />
                    </Col> )
                }
                else{
                  return(
                    <Col md={4} key={idea.id}>
                      <IdeaComponent idea={idea} enableEdit={this.enableEdit} deleteIdea={this.deleteIdea} />
                    </Col>
                    )}
                  }
              )}
          </Row>
        </Container>
    )
  }
}

export default IdeasComponent
