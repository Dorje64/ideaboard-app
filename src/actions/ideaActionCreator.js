import Axios from 'axios';
const IDEA_SERVER = 'http://localhost:3001/api/v1/ideas';

export function fetchIdea(page = 1){
  return{
    type: 'FETCH_IDEA',
    payload: Axios.get(IDEA_SERVER,{params: {page: page}})
  }
}

export function deleteIdea(ideaId){
  return {
    type: 'DELETE_IDEA',
    payload: Axios.delete(IDEA_SERVER+'/'+String(ideaId))
  }
}

export function updateIdea(idea){
  return {
    type: "UPDATE_IDEA",
    payload: {idea}
  }
}

export function newIdea(){
  return {
    type: "NEW_IDEA",
    payload: Axios.post(IDEA_SERVER,
                                    {idea:
                                      {
                                        title: '',
                                        body: ''
                                      }
                                    })

  }
}
