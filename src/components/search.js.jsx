import React, {Component} from 'react'

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
    this.props.searchIdea(this.state.keyword)
  }

  render(){
      return(
        <div>
          <form onSubmit= {this.searchIdea}>
            <div className="input-group">
              <input type="text" name='keyword' onChange = {this.handleInput} className="form-control search-input" placeholder="Search for..." aria-label="Search for..."/>
              <span className="input-group-btn">
                <input type="submit" value= "Go!" className="btn idea-button"/>
              </span>
            </div>
          </form>
        </div>
      )}

}
export default Search
