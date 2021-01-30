import React, { Component } from "react";
import axios from "axios";

//obtains plant details from API added in the users' collection

class PlantApiDetails extends Component {
  state = {
    apiPlant: null,
    loading: true,
  };

  // this.props.dataFromApi
  render() {
    return (
      <div className="apiPlantDetails">
        {/* <img
          src={this.state.apiPlant.image_url}
          width="180"
          height="180"
          alt="selected plant"
        /> */}
        {/* <h2>Common Name: {this.state.apiPlant.common_name}</h2> */}
      </div>
    );
  }
}

export default PlantApiDetails;
