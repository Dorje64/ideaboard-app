import React, {Component} from 'react';
import Axios from 'axios';
import {reactLocalStorage as LocalStorage} from 'reactjs-localstorage';
import { MessageList } from 'react-chat-elements';
import 'react-chat-elements/dist/main.css';
import Cable from 'actioncable'

//connect redux
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as conversationAction from '../actions/conversationActionCreator'

const MESSAGE_SERVER = process.env.REACT_APP_HOST_API + '/api/v1/messages';
const SOCKET = process.env.REACT_APP_SOCKET_API;
class Conversation extends Component{
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
    // this.props.fetchMessage(conversation_id);
    Axios.get(MESSAGE_SERVER,
        {params: { conversation_id: conversation_id, uid: this.currentUid }}
      )
    .then( response => {
      console.log(response.data)
      this.setState({messages: response.data})
    })
  }

  createSocket(){
    let cable = Cable.createConsumer(SOCKET + '/cable');
    this.chats = cable.subscriptions.create({
          channel: 'ChatChannel'
            },
         {
          connected: () => { console.log('hello world'); },
          received: (data) => {
              let {messages} = this.state
              const {id} = this.props
              if(data.message.conversation_id === id){
                messages.push(data.message)
                this.setState({messages: messages, textToSent:''})
              }
          },
          render: function() {
            // this.perform('render');
          }
        }
    );
  }

  componentWillMount(){
    this.createSocket();
  }

  componentDidMount(){
    const {id} = this.props;
    this.renderMessages(id);
    // clearInterval(this.state.update)
    // const mountSetInterval = setInterval( () => {this.renderMessages(id)} , 1000)
    // this.setState({mount: mountSetInterval})
  }

  componentWillReceiveProps(nextProps){
    const {id} = nextProps
    // clearInterval(this.state.mount)
    // clearInterval(this.state.update)
    // const update = setInterval( () => {this.renderMessages(id)} , 1000)
    // this.setState({update: update})
    this.renderMessages(id)
  }

  sendMessage = (e) =>{
    e.preventDefault();
    const {textToSent} = this.state;
    const {id} = this.props
    Axios.post(MESSAGE_SERVER,
        { uid: this.currentUid,
          body: textToSent,
          conversation_id: id
        }
    )
    .then( response => {
      this.chats.render();
    })
    .catch( error => { console.log(error) } )
  }

  render(){
    const currentUserId = this.currentUserId;

    return(
      <div>
        <h1> Converstation {this.props.id} </h1>
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

const mapStateToProps = state => {
  return {
    idea : state.idea
  }
}

const mapDispatchToProps = (dispatch) => {
  const boundActionCreators = bindActionCreators(conversationAction, dispatch)
  const allActionProps = {...boundActionCreators, dispatch}
  return allActionProps
}

export default connect(mapStateToProps, mapDispatchToProps)(Conversation)
