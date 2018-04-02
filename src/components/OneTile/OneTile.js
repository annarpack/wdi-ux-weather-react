import React, { Component } from 'react';

import axios from 'axios';

class OneTile extends Component {

  constructor(props) {
    super(props);

    this.state = {
      todayCurrent: [],
      todaySummary: [],
      weekInfo: [],
      todayTwelve: []
    }
  }

  componentDidMount() {
    axios.get(`https://flyhigh.herokuapp.com/${this.props.clickedId}`)
    .then(res => {
      this.setState({
        todayCurrent: res.data.onePlaceData.currently,
        todaySummary: res.data.onePlaceData.daily.data[0],
        weekInfo: res.data.onePlaceData.daily.data,
        todayTwelve: res.data.onePlaceData.hourly.data
      })
      this.props.changeEmpty(res.length === 0)
    })
  }

  todaySummary() {
    return (
      <div className='todaySummary'>
       <div className="icon"></div>
         <div className="info">
          <div className="title">TODAY</div>
          <div className="main-temp">{Math.round(this.state.todayCurrent.temperature)}°</div>
          <div className="details">
          <div className="temp">
            <span>L {Math.round(this.state.todaySummary.temperatureMin)}°</span>
            <span>H {Math.round(this.state.todaySummary.temperatureMax)}°</span>
          </div>
          <div>{this.state.todayTwelve[0].temperature}</div>
          <div>
            <div>NEXT HOUR</div>
            <div className="summary">{this.state.todayTwelve[1].summary} for the hour.</div>
          </div>
          </div>
        </div>
      </div>
    )
  }

  weekSummary() {

    const weekData = [];

    const today = new Date().getDay();

    const tomorrow = (today+1)%7;
    const inTwoDays = (today+2)%7;
    const inThreeDays = (today+3)%7;
    const inFourDays = (today+4)%7;
    const inFiveDays = (today+5)%7;
    const inSixDays = (today+6)%7;

    const weekDay = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    const weekDayCurrent = [today, tomorrow, inTwoDays, inThreeDays, inFourDays, inFiveDays, inSixDays];

    for (let i = 1; i < 7; i++) {
      let el = this.state.weekInfo[i];
      weekData.push(
        <div className="day">
        <div className={`weekData${i}`} key={`weekData${i}`}>
        <div className={el.icon}>
          <div className="title"> {weekDay[weekDayCurrent[i]]} </div>
          <div className="icon"></div>
          <div className="temp">
            <span>L {Math.round(el.temperatureMin)}°</span>
            <span>H {Math.round(el.temperatureMax)}°</span>
          </div></div>
        </div></div>
      )
    }
    return weekData;
  }

  todayDetails() {

    const todayData = [];
    const now = new Date().getHours();

    let ampm = "";
      if (now <= 12) {
        ampm = "am"
      } else {
        ampm = "pm"
      }

    for (let i = 1; i <= 12; i++) {
      let el = this.state.todayTwelve[i];
      let nowData = (now+i)%12;
      todayData.push (
        <div className="hour">
          <div className={`todayData${i}`} key={`todayData${i}`}>
            <div>{nowData} {ampm}</div>
            <div>{Math.round(this.state.todayTwelve[i].temperature)}°</div>
            <div>{this.state.todayTwelve[i].summary}</div>
            <div className="temp-bar">
              <div className={this.state.todayTwelve[i].icon} ></div>
            </div>
          </div>
        </div>
      )
    }
    return todayData;
  }

  render() {
    return (
      <div className="OneTile">
        <div className={this.state.todayCurrent.icon}>
        {this.state.todayTwelve[0] !== undefined &&
          <div className="one-tile-container">
            <div className="row">
            {this.todaySummary()}
            <div className="weekSummary">{this.weekSummary()}</div>
            </div>
            <div className="todayDetails">
              <div className="title">NEXT 12 HOURS
                <div className="row">{this.todayDetails()}</div>
              </div>
          </div>
        </div>
        }
      </div>
    </div>
    );
  }
}


export default OneTile;
