import React, { Component } from "react";

//obtains plant details from API added in the users' collection

class PlantApiDetails extends Component {
  // state = {
  //   apiPlant: null,
  //   loading: true,
  // };

  // this.props.dataFromApi to match in PlantDetails
  render() {
    return (
      <div className="apiPlantDetails">
        <img
          src={this.props.dataFromApi.image_url}
          width="180"
          height="180"
          alt="selected plant"
        />
        <h3>Common Name: {this.props.dataFromApi.common_name}</h3>
      </div>
    );
  }
}

export default PlantApiDetails;
