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
