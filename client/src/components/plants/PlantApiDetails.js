import React, { Component } from "react";
import TrefleInfoPlantList from "./TrefleInfoPlantList";

//obtains plant details from API added in the users' collection

class PlantApiDetails extends Component {
  // this.props.dataFromApi to match in PlantDetails
  render() {
    return (
      <div>
        <TrefleInfoPlantList trefleInfoPlant={this.props.dataFromApi} />
      </div>
    );
  }
}

export default PlantApiDetails;
