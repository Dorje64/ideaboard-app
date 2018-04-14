import React, {Component} from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Row, Col } from 'reactstrap';
import Pagination from 'rc-pagination'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ConversationAction from '../actions/conversationActionCreator';

class SidebarLeft extends Component{
  constructor(props){
    super(props)
    this.state = {
      modal: false,
      subject: '',
      body: '',
      receiver: '',
      current: 1
     };

     this.toggle = this.toggle.bind(this);
  }

  fetchData = (page=1) =>{
    this.props.fetchConversation(page);
  }

  totalCount = _ => {
    this.props.totalCount();
  }

  componentDidMount(){
    this.totalCount();
    this.fetchData();
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    })}

  handleInput = (e) =>{
      this.setState({[e.target.name]: e.target.value})
    }

  createConversation = () => {
    const {body,receiver} = this.state;
    let {subject} = this.state;
    subject = subject === '' ? this.props.idea.ideas[0].title : subject
    this.props.createConversation(subject, body, receiver)
    this.toggle()
  }

  onChange = (page) => {
    this.fetchData(page);
    this.setState({current: page})
    }

  render(){
    const modal =
      <div>
        <Button onClick={this.toggle} className ="conversation-item conversation-create-button">#Create #Converstation</Button>
        <form onSubmit={this.createConversation}>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Create Converstation</ModalHeader>
          <ModalBody>
            <Row>
              <Col md={6}>
                <input type="text" name="receiver" className= "form-control ib-auth-field" placeholder="Email" onChange={this.handleInput}/>
              </Col>
              <Col md={6}>
                  <select className ="form-control ib-auth-field custom-select" name = "subject" onChange = { this.handleInput } >
                    { this.props.idea.ideas.map((idea) => {
                      return <option value={idea.title}> {idea.title} </option>
                    })
                  }
                  </select>
              </Col>
               <Col md={12}>
                 <input name="body" onChange = {this.handleInput} className= "form-control ib-auth-field" />
               </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            <Button className="conversation-item conversation-create-button" type="submit" onClick={ () => {this.createConversation()}}>Create</Button>{' '}
            <Button color="secondary" className="conversation-item conversation-create-button" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
        </form>
      </div>

    const conversationMenu =
      <div className="conversation-menu">
        <h3 className="conversation-item"> #conversations </h3>
          {modal}
        <form>
          <input className="form-control search-input conversation-search-input"/>
        </form>
      </div>
    return(
      <div>
        {conversationMenu}
        <Pagination onChange={this.onChange} current={this.state.current} total={this.props.conversation.totalConversations} pageSize={10} />
        <ul className="list-group conversation-list">
          { this.props.conversation.conversations.map( conversation =>
            <li key= {conversation.id} className="list-group-item" onClick= {() => {this.props.conversationSelect(conversation.id)}} >
             {conversation.subject}
            </li>
          )}
        </ul>
      </div>
      )
    }
}

const mapStateToProps = (state) => {
  return {
    conversation: state.conversation,
    idea: state.idea
  }
}

const mapDispatchToProps = (dispatch) => {
  const boundCreators = bindActionCreators(ConversationAction, dispatch);
  const allActionProps = {...boundCreators, dispatch}
  return allActionProps
}

export default connect(mapStateToProps, mapDispatchToProps)(SidebarLeft)
