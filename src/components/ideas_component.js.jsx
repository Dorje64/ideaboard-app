import React, { Component } from 'react'
import Axios from 'axios'
import IdeaComponent from './idea_component.js.jsx'
import IdeaFormComponent from './idea_form_component.js.jsx'
import Search from './search.js.jsx'
import {Container, Row, Col, Button} from 'reactstrap'
import 'rc-pagination/assets/index.css';
import Pagination from 'rc-pagination';

//connect redux
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as ideaAction from '../actions/ideaActionCreator'

const IDEA_SERVER = 'http://localhost:3001/api/v1/ideas'

class IdeasComponent extends Component{
  constructor(props){
    super(props)
    this.state ={
      ideas: [],
      editingIdea: null,
      current: 1
    }
  }

  fetchData(page = 0){
    this.props.fetchIdea(page);
    // const promise = new Promise((resolve, reject) => {
    //                                   const store = this.props.fetchIdea(page: page);
    //                                   resolve(store);
    //                                 });

    // promise.then( (res) => {this.setState({ideas: res.value.data})})
  }

  totalCount = _ => {
    Axios.get(IDEA_SERVER  + '/total_ideas')
    .then( response =>
      {this.setState({totalIdeas: Number.parseInt(response.data)})}
    )
    .catch(error => {console.log(error)})
  }

  componentDidMount(){
    this.totalCount();
    this.fetchData();
  }

  newIdea = () =>{
    this.props.newIdea();

    // const promise = new Promise((resolve, reject) => {
    //   resolve(this.props.newIdea())
    // });
    //
    // promise.then( (res) => {
    //               const updatedIdeas = [res.value.data, ...this.state.ideas];
    //               this.setState({ideas: updatedIdeas, editingIdea: res.value.data.id})
    //               })
  }

  deleteIdea = (id) => {
    this.props.deleteIdea(id);
    // Axios.delete(IDEA_SERVER + '/'+ String(id))
    // .then(response => {
    //   let ideaIndex = this.state.ideas.findIndex(x => x.id === id)
    //   let idea = this.state.ideas
    //   idea.splice(ideaIndex,1)
    //   this.setState(idea: idea)
    // })
    // .catch(error => console.log(error))
  }

  updateIdeas = (id, idea) => {
    this.props.updateIdea(id, idea)
    // let ideaIndex = this.state.ideas.findIndex(x => x.id === idea.id)
    // let ideas = this.state.ideas
    // ideas[ideaIndex] = idea
    // this.setState({ideas: ideas , editingIdea: null})
  }

  handleSearch = (foundItem) => {
    this.setState( {ideas: foundItem} )
  }

  enableEdit = (id) => {
    this.props.enableEdit(id);
  }

  onChange = (page) => {
    this.fetchData(page);
    }

  render(){
    return(
        <Container>
          <Row className="idea-menu">
            <Col md={4} xs={4}>
              <Button className="idea-button" onClick={this.newIdea} > New Idea </Button>
            </Col>
            <Col md={4}>
              <Pagination onChange={this.onChange} total={this.state.totalIdeas} pageSize={6} />
            </Col>
            <Col md={4}>
              <Search searchIdea = {this.handleSearch}/>
            </Col>
          </Row>

          <Row>
              { this.props.idea.ideas.map( (idea) => {
                if (this.props.idea.editingIdea === idea.id) {
                  return(
                    <Col md={4} key={idea.id} >
                      <IdeaFormComponent idea={idea} updateIdeas= {this.updateIdeas} />
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

const mapStateToProps = state => {
  return {
    idea : state.idea
  }
}

const mapDispatchToProps = (dispatch) => {
  const boundActionCreators = bindActionCreators(ideaAction, dispatch)
  const allActionProps = {...boundActionCreators, dispatch}
  return allActionProps
}

export default connect(mapStateToProps, mapDispatchToProps)(IdeasComponent)
