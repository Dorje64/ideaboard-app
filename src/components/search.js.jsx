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
<<<<<<< HEAD
          <form onSubmit= { this.searchIdea } >
            <input type='text' name='keyword' placeholder='title' onChange = {this.handleInput} />
            <input type='submit' value="Search" />
          </form>
      )
  }
=======
        <div>
          <form onSubmit= {this.searchIdea}>
            <div className="input-group">
              <input type="text" name='keyword' placeholder='title' onChange = {this.handleInput} className="form-control search-input" placeholder="Search for..." aria-label="Search for..."/>
              <span className="input-group-btn">
                <input type="submit" value= "Go!" className="btn idea-button"/>
              </span>
            </div>
          </form>
        </div>
      )}
>>>>>>> 6059cb594073df80056c9a19136118247e44aa93

}
export default Search
