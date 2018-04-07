import {reactLocalStorage as LocalStorage} from 'reactjs-localstorage';
import Axios from 'axios';
const MESSAGE_SERVER = process.env.REACT_APP_HOST_API + '/api/v1/messages';
const currentUid = LocalStorage.getObject('tokens').uid;
const currentUserId = LocalStorage.getObject('data').id;

export function fetchMessage(conversation_id){
  return {
    type: "FETCH_MESSAGE",
    action: Axios.get(MESSAGE_SERVER,{params: { conversation_id: conversation_id, uid: currentUid }})
  }
}
