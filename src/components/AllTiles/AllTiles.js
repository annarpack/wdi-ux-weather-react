import React, { Component } from 'react';

import axios from 'axios';

class AllTiles extends Component {

  constructor(props) {

    super(props);

    this.state = {
      allTilesPlaces: [],
      allTilesWeather: []
    }

    this.renderAllTiles = this.renderAllTiles.bind(this);
    this.delete = this.delete.bind(this);
    this.getData = this.getData.bind(this);

  }

  componentDidMount() {
    this.getData();
  }

  delete(id) {
    axios.delete(`https://flyhigh.herokuapp.com/${id}`)
    .then(
      setTimeout(this.getData, 500)
    )
  }

  getData() {
    axios.get(`https://flyhigh.herokuapp.com/`)
    .then(res => {
      this.setState({
        allTilesPlaces: res.data.places,
        allTilesWeather: res.data.weatherData
      });
      this.props.changeEmpty(res.data.places.length === 0)
    })
  }

  renderAllTiles() {
    if (this.state.allTilesPlaces.length === 0) {
      return (
        <div className="emptyHome">
              <div className="icon"></div>
                <div className="text">
                <p>Wanna know if youll melt outside?</p>
                <p>Start getting some weather.</p>
                </div>
              </div>
            )
          } else {
            return (
              this.state.allTilesPlaces.map(e => {
              let weather = this.state.allTilesWeather[this.state.allTilesPlaces.indexOf(e)];
              return (
                <div className="tile" key={e.id}>
                  {this.props.isEditMode === true && <div onClick={() => {this.delete(e.id)}} className="deleteButton"></div>}
                  <div className="tileContent" onClick={() => {this.props.oneTile(e.id, e.city, e.state, e.country)}}>
                    <div className={weather.currently.icon}>
                      <div className="title">
                        <span>{e.city} . </span>
                        {e.state.length <= 3 && <span>{e.state} . </span>}
                        <span>{e.country}</span>
                      </div>
                      <div className="icon"></div>
                      <div className="main-temp">{Math.round(weather.currently.temperature)}°</div>
                      <div className="temp">
                        <div className="divsTemp">L <span className="numbersTemp">{Math.round(weather.daily.data[0].temperatureLow)}°</span></div>
                        <div className="divsTemp">H <span className="numbersTemp">{Math.round(weather.daily.data[0].temperatureMax)}°</span></div>
                      </div>
                    </div>
                  </div>
                </div>
          )
        })
      )
    }
  }

  render() {
    return (
      <div className="AllTiles">
        {this.renderAllTiles()}
        {this.state.allTilesPlaces.length !== 0 &&
          <div>
            <div className="tile-to-add">
            <button className="add-button-tile" onClick={this.props.onClickButton}></button>
            <div>GET SOME WEATHER</div>
            </div>
          </div>}
      </div>
    );
  }
}

export default AllTiles;
