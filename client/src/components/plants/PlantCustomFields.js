import React, { Component } from "react";

//obtains plant details by users from the users' collection

class PlantCustomFields extends Component {
  // this.props.dataFromUser to match in PlantDetails

  render() {
    // console.log("THIS.PROPS", this.props);

    return (
      <div className="single-plant-innerbox shadow p-4 mb-4 bg-body rounded">
        <h3 className="green-headline mb-2">{this.props.dataFromUser.name}</h3>
        <div className="mb-3">
          <img src={this.props.dataFromUser.plantImg || "/images/growing.png"} alt="custom plant" className="img-fluid" />
        </div>
        <div className="notes-paragraph">
          <h5 className="green-headline">Your Notes</h5>
          <p className="p-2">{this.props.dataFromUser.notes}</p>
        </div>
      </div>
    );
  }
}

export default PlantCustomFields;
