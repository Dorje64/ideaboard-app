import React, { Component } from 'react';
import Axios from 'axios';
import IdeaComponent from './idea_component.js.jsx';
import IdeaFormComponent from './idea_form_component.js.jsx';
import Search from './search.js.jsx';
import {Container, Row, Col, Button} from 'reactstrap';
import 'rc-pagination/assets/index.css';
import Pagination from 'rc-pagination';

//connect redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ideaAction from '../actions/ideaActionCreator';

class IdeasComponent extends Component{
  constructor(props){
    super(props)
  }

  fetchData(page = 0){
    this.props.fetchIdea(page);
  }

  totalCount = _ => {
    this.props.totalCount();
  }

  componentDidMount(){
    this.totalCount();
    this.fetchData();
  }

  newIdea = () => {
    this.props.newIdea();
  }

  deleteIdea = (id) => {
    this.props.deleteIdea(id);
  }

  updateIdeas = (id, idea) => {
    this.props.updateIdea(id, idea)
  }

  handleSearch = (keyword) => {
    this.props.search(keyword)
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
              <Pagination onChange={this.onChange} total={this.props.idea.totalCount} pageSize={6} />
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
