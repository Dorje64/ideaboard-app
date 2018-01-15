import Axios from 'axios';
const IDEA_SERVER = 'http://localhost:3001/api/v1/ideas';

export function fetchIdea(page = 1){
  return{
    type: 'FETCH_IDEA',
    payload: Axios.get(IDEA_SERVER,{params: {page: page}})
  }
}

export function deleteIdea(idea){
  return {
    type: 'DELETE_IDEA',
    payload:  {idea}
  }
}

export function updateIdea(idea){
  return {
    type: "UPDATE_IDEA",
    payload: {idea}
  }
}
