import React, { Component } from "react";

//obtains plant details by users from the users' collection

class PlantCustomFields extends Component {
  // this.props.dataFromUser to match in PlantDetails

  render() {
    console.log("THIS.PROPS", this.props);

    return (
      <div className="plantCustomFields">
        <h3> Name: {this.props.dataFromUser.name}</h3>
        <p> Your Notes: {this.props.dataFromUser.notes}</p>
        <p> Your plant picture: </p>
      </div>
    );
  }
}

export default PlantCustomFields;
