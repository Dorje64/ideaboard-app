import React, {Component} from 'react'
import Axios from 'axios'

class Search extends Component{
  constructor(props){
    super(props)
    this.state = {
      keyword: ''
    }
  }

  handleInput = (e) => {
    this.setState({keyword: e.target.value})
  }

  searchIdea = (e) => {
    e.preventDefault();
    let keyword = this.state.keyword;
    Axios.post('http://localhost:3001/api/v1/ideas/search',
      {
        keyword: keyword
      }
    )
    .then( response => {
      console.log(response)
      this.props.searchIdea(response.data)
    })
    .catch( error => error => console.log(error))
  }

  render(){
      return(
        <div>
          <form onSubmit= {this.searchIdea} >
            <input type='text' name='keyword' placeholder='title' onChange = {this.handleInput} />
            <input type='submit' value="Search" />
          </form>
        </div>
      )
  }

}
export default Search
