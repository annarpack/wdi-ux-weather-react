import React, { Component } from 'react';
import './App.css';

import Header from './components/Header/Header';
import View from './components/View/View';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      value: "",
      mode: "View All",
      tiles: [],
      empty: true,
      clickedid: "",
      cityclicked: "",
      stateclicked: "",
      countryclicked: ""
    }

    this.onClickButton = this.onClickButton.bind(this);
    this.backToViewAll = this.backToViewAll.bind(this);
    this.changeEmpty = this.changeEmpty.bind(this);
    this.oneTile = this.oneTile.bind(this);
    this.onEditButton = this.onEditButton.bind(this);
  }

  onClickButton() {
    this.setState({
      mode: "Search"
    })
  }

  backToViewAll(){
    this.setState({
      mode: "View All"
    })
  }

  onEditButton() {
    this.setState({
      mode: "Edit"
    })
  }

  changeEmpty(value){
    this.setState({
      empty: value
    })
  }

  oneTile(id, city, state, country) {
    this.setState({
      clickedid: id,
      cityclicked: city,
      stateclicked: state,
      countryclicked: country,
      mode: "View One"
    })
  }

  render() {
    return (
      <div className="App">

        <Header
          mode={this.state.mode}
          back={this.backToViewAll}
          goToEditPage={this.onEditButton}
          isEmpty={this.state.empty}
          cityclicked={this.state.cityclicked}
          stateclicked={this.state.stateclicked}
          countryclicked={this.state.countryclicked} />
        <View
          mode={this.state.mode}
          back={this.backToViewAll}
          changeEmpty={this.changeEmpty}
          oneTile={this.oneTile}
          clickedId={this.state.clickedid}
          onClick={this.onClickButton} />
        <button className="add-button"
          onClick={this.onClickButton}></button>

      </div>
    );
  }
}

export default App;
