import React, {Component} from 'react'
import Axios from 'axios'
import {reactLocalStorage as LocalStorage} from 'reactjs-localstorage';
import { MessageList,Input } from 'react-chat-elements';
import 'react-chat-elements/dist/main.css';

const MESSAGESERVER = 'http://localhost:3001/api/v1/messages'

export default class Conversation extends Component{
  constructor(props){
    super(props)
    this.state = {
      messages: [],
      isTyping: false,
      textToSent: ''
    };
    this.currentUid = LocalStorage.getObject('tokens').uid;
    this.currentUserId = LocalStorage.getObject('data').id;
  }

  handleInput = (e) =>{
    this.setState({[e.target.name]: e.target.value})
  }

  renderMessages = (conversation_id) => {

    Axios.get(MESSAGESERVER,
        {params: { conversation_id: conversation_id, uid: this.currentUid }}
      )
    .then( response => {
      console.log(response.data)
      this.setState({messages: response.data})
    })
  }

  componentDidMount(){
    const {id} = this.props
    setInterval( () => {this.renderMessages(id)} , 1000)
  }

  // componentWillReceiveProps(nextProps){
  //   const {id} = nextProps
  //   this.renderMessages(id)
  // }

  sendMessage = (e) =>{
    e.preventDefault();
    const {textToSent} = this.state;
    const {id} = this.props
    Axios.post(MESSAGESERVER,
        { uid: this.currentUid,
          body: textToSent,
          conversation_id: id
        }
    )
    .then( response => {
      let {messages} = this.state
      messages.push(response.data)
      this.setState({messages: messages, textToSent:''})
    })
    .catch( error => { console.log(error) } )
  }

  render(){
    const currentUserId = this.currentUserId;
    return(
      <div> <h1> Converstation </h1>
            <MessageList
                className='messageContainer message-list'
                lockable= {true}
                toBottomHeight={'100%'}
                dataSource={
                      this.state.messages.map( message =>(
                        {
                            position: currentUserId === message.sender_id ? 'right' : 'left',
                            type: 'text',
                            text: message.body,
                            date: new Date(message.created_at)
                        })
                      )
                    }
          />
      <form onSubmit={this.sendMessage}>
        <input name="textToSent" value = {this.state.textToSent} onChange = {this.handleInput} className= "form-control ib-auth-field" />
      </form>
    </div>
  )
  }
}
