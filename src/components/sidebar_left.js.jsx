import React, {Component} from 'react'
import Axios from 'axios'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Row, Col } from 'reactstrap';
import {reactLocalStorage as LocalStorage} from 'reactjs-localstorage';
const CONVERSATION_SERVER = 'http://localhost:3001/api/v1/conversations'

class SidebarLeft extends Component{
  constructor(props){
    super(props)
    this.state = {
      conversations: [],
      modal: false,
      subject: '',
      body: '',
      receiver: ''
     };

     this.toggle = this.toggle.bind(this);
  }

  componentDidMount(){
    const {uid} = LocalStorage.getObject('tokens')
    Axios.get(CONVERSATION_SERVER,
      {params: { uid: uid }}
    )
    .then( response => {
      this.setState({conversations: response.data})
    })
    .catch( error => {console.log(error)})
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    })}

  handleInput = (e) =>{
      this.setState({[e.target.name]: e.target.value})
    }

  createConversation = () => {
    const {subject,body,receiver} = this.state
    const {uid} = LocalStorage.getObject('tokens')
    Axios.post(CONVERSATION_SERVER,
       {
        subject: subject,
        body: body,
        receiver: receiver,
        uid: uid
      }
    )
    .then( responce => {
        let {conversations} = this.state;
        conversations.unshift(responce.data)
        this.setState({conversations: conversations})
        this.toggle()
    })
    .catch( error => {console.log(error)})
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
                <input type="text" name="subject" className= "form-control ib-auth-field" placeholder="Subject" onChange={this.handleInput}/>
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
        <ul className="list-group conversation-list">
          {this.state.conversations.map( conversation =>
            <li key= {conversation.id} className="list-group-item" onClick= {() => {this.props.conversation(conversation.id)}} >
             {conversation.subject}
            </li>
          )}
        </ul>
      </div>
      )
    }
}

export default SidebarLeft
