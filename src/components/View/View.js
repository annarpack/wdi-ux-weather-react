import React, { Component } from 'react';

import AllTiles from '../AllTiles/AllTiles';
import CreateTile from '../CreateTile/CreateTile';
import OneTile from '../OneTile/OneTile';

class View extends Component {

  constructor(props) {

    super(props);

    this.renderView = this.renderView.bind(this);

  }

  renderView() {
  if ((this.props.mode === "View All") || (this.props.mode === "Edit")) {
    return <AllTiles
      onClickButton={this.props.onClick}
      changeEmpty={this.props.changeEmpty}
      oneTile={this.props.oneTile}
      isEditMode={this.props.mode === "Edit"}
      back={this.props.back}/>

  } else if (this.props.mode === "Search") {

    return <CreateTile
      back={this.props.back}/>

  } else if (this.props.mode === "View One") {

    return <OneTile
      changeEmpty={this.props.changeEmpty}
      clickedId={this.props.clickedId} />
  }
}

  render() {

    return (
      <div className="View">
        {this.renderView()}
      </div>
    )

  }
}

export default View;
