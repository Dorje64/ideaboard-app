import React, {Component} from 'react'
import Axios from 'axios'
import {reactLocalStorage as LocalStorage} from 'reactjs-localstorage';

export default class Conversation extends Component{
  constructor(props){
    super(props)
    this.state = {
      messages: [],
      isTyping: false,
      textToSent: ''
    }
  }

  handleInput = (e) =>{
    this.setState({[e.target.name]: e.target.value})
  }

  renderMessages = (conversation_id) => {
    const {uid} = LocalStorage.getObject('tokens')
    Axios.get('http://localhost:3001/api/v1/messages',
        {params: { conversation_id: conversation_id, uid: uid }}
      )
    .then( response => {
      console.log(response.data)
      this.setState({messages: response.data})
    })
  }

  componentDidMount(){
    const {id} = this.props
    this.renderMessages(id)
  }

  componentWillReceiveProps(nextProps){
    const {id} = nextProps
    this.renderMessages(id)
  }

  sendMessage = (e) =>{
    e.preventDefault();
    const {textToSent} = this.state;
    const {id} = this.props
    const {uid} = LocalStorage.getObject('tokens')
    Axios.post('http://localhost:3001/api/v1/messages',
        { uid: uid,
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
    return(
      <div>
        <h1> Conversation {this.props.id} </h1>
        <div className="messageContainer">
          {this.state.messages.map( message =>
              <li key={message.id}> {message.body} </li>
           )}
         </div>
        <form onSubmit={this.sendMessage}><input name="textToSent" value = {this.state.textToSent} onChange = {this.handleInput} className= "form-control ib-auth-field" /></form>
      </div>
    )
  }
}
