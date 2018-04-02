import React, { Component } from 'react';

class Header extends Component {

  constructor(props) {
    super(props);

    this.renderHeader = this.renderHeader.bind(this);
  }

  renderHeader() {

    const fulldate = new Date();
    const weekday = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"]
    const monthnames = ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"]

    const today = weekday[fulldate.getDay()];
    const month = monthnames[fulldate.getMonth()];
    const day = fulldate.getDate();

    const date = `${today} - ${month} ${day}`

    if (this.props.mode === "Search") {

      return (
        <div className="emptyHeaderSearch">
          <div className="close-button" onClick={this.props.back}>X</div>
          </div>
      )

    } else if ((this.props.isEmpty === true) && (this.props.mode === "View All")){

      return (
        <div className="emptyHeaderHome">
        </div>
      )

    } else if ((this.props.isEmpty === false)&&(this.props.mode === "Edit")){

      return (
        <div className="headerForEdit">
          <div>REARRANGE & DELETE</div>
          <button className="save-button"  onClick={this.props.back}>SAVE</button>
        </div>
      )

    } else if ((this.props.isEmpty === false)&&(this.props.mode === "View One")){

      return (
        <div className="headerForOne">
          <div className="close-button"  onClick={this.props.back} >X</div>
          <div className="title">{this.props.cityclicked} . {this.props.stateclicked} . {this.props.countryclicked}</div>
        </div>
      )

    } else if ((this.props.isEmpty === false)&&(this.props.mode === "View All")) {

      return (
        <div className="headerForAll">
          <div>{date}</div>
          <button className="edit-button" onClick={this.props.goToEditPage}>EDIT</button>
        </div>
      )

    }
  }

  render() {
    return (
      <div className="Header">
        {this.renderHeader()}
      </div>
    );
  }
}

export default Header;
