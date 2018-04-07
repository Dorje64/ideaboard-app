import Axios from 'axios';
const IDEA_SERVER = process.env.REACT_APP_HOST_API + '/api/v1/ideas';

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

export function totalCount(){
  return {
    type: "TOTAL_COUNT",
    payload: Axios.get(IDEA_SERVER  + '/total_ideas')
  }
}

export function search(keyword){
  return{
    type: "SEARCH_IDEA",
    payload: Axios.post(IDEA_SERVER + '/search', {
      keyword: keyword
    })
  }
}

export function share(idea){
  return{
      type: "SHARE_IDEA",
      payload: Axios.post("https://api.github.com/gists",
        {
          "description": idea.title,
          "public": true,
          "files": {
            "file1.txt": {
              "content": idea.body
            }
          }
        })
  }

}
