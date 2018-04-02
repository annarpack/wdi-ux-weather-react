import React, { Component } from 'react';
import axios from 'axios';
class CreateTile extends Component {

  constructor(props) {

    super(props);

    this.state = {
      value: "",
      placeId: "",
      fiveSuggestions: []
    }

    this.handleChange = this.handleChange.bind(this);
    this.searchFiveResults = this.searchFiveResults.bind(this);
    this.displayFiveResults = this.displayFiveResults.bind(this);
    this.locationChoice = this.locationChoice.bind(this);

  }

  handleChange(event) {
    event.preventDefault();
    this.setState({
      value: event.target.value
    }, this.searchFiveResults)
  }

  searchFiveResults() {
    axios.post(`https://flyhigh.herokuapp.com//${this.state.value}`)
    .then(res => {
      this.setState({fiveSuggestions: res.data})
    })
  }

  displayFiveResults() {
    return this.state.fiveSuggestions.map(each => {
      let display = "";
      if (each.state === "") {
        display = `${each.city}, ${each.country}`
      } else {
        display = `${each.city}, ${each.state}, ${each.country}`
      }
      return (
        <p onClick={()=>{this.locationChoice(each.placeId)}} key={each.placeId}>{display}</p>
      )
    })
  }

  locationChoice(id) {
    axios.get(`https://flyhigh.herokuapp.com/${this.state.value}/${id}`)
    .then(
      setTimeout(this.props.back, 500)
    )
  }

  render() {
    return (
      <div className="Background">
        <div className="CreateTile">
        <div className="search-bar">
          <input className='searchBar' type='text' ref={el=>{this.search=el}} placeholder="Type a city" onChange={this.handleChange} />
          <div className="search-icon"></div>
        </div>
        <div className='fiveResults'>{this.displayFiveResults()}</div>
        </div>
      </div>
    );
  }
}
export default CreateTile;
