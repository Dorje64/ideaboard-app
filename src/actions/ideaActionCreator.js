import Axios from 'axios';
const IDEA_SERVER = 'http://localhost:3001/api/v1/ideas';

export function fetchIdea(page = 1){
  return{
    type: 'FETCH_IDEA',
    payload: Axios.get(IDEA_SERVER,{params: {page: page}})
  }
}

export function deleteIdea(id){
  return {
    type: 'DELETE_IDEA',
    payload: Axios.delete(IDEA_SERVER+'/'+String(id)),
    deletedId: id
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

export function enableEdit(id){
  return {
    type: "ENABLE_EDIT",
    payload: id
  }
}

export function updateIdea(id , data){
  return {
    type: "UPDATE_IDEA",
    payload: Axios.put(IDEA_SERVER + '/' + String(id),{idea: data})
  }
}
