import Axios from 'axios';
import {reactLocalStorage as LocalStorage} from 'reactjs-localstorage';
const CONVERSATION_SERVER = 'http://localhost:3001/api/v1/conversations';
const {uid} = LocalStorage.getObject('tokens')

export function fetchConversation(page = 1){
  return {
    'type' : "FECTCH_CONVERSATION",
    'payload': Axios.get(CONVERSATION_SERVER, {params: { uid: uid, page: page }})
  }
}

export function totalCount(){
  return{
    'type': "TOTAL_CONV",
    'payload': Axios.get(CONVERSATION_SERVER  + '/total_conversations', {params: {uid: uid}})
  }
}

export function createConversation(subject,body,receiver){
  return {
    'type': "CREATE_CONV",
    'payload': Axios.post(CONVERSATION_SERVER,
       {
        subject: subject,
        body: body,
        receiver: receiver,
        uid: uid
      }
    )
  }
}
