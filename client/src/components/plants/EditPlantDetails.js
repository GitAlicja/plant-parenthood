//form to edit only the custom fields of the plant

import React, { Component } from "react";
import axios from "axios";

export default class EditPlantDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.customPlantFields.name,
      plantImg: this.props.customPlantFields.plantImg,
      notes: this.props.customPlantFields.notes,
    };
  }

  handleFormSubmit = (event) => {
    const name = this.state.name;
    const plantImg = this.state.plantImg;
    const notes = this.state.notes;

    event.preventDefault();
    // /my-plants/:id
    //needs to match the plant-routes from backend to connect to react
    axios
      .put(`/api/my-plants/${this.props.customPlantFields._id}`, {
        name,
        plantImg,
        notes,
      })
      .then(() => {
        this.props.reloadHandler();
      })
      .catch((error) => console.log(error));
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <div>
        <h2>Edit your plant</h2>
        <form onSubmit={this.handleFormSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={this.state.name}
            onChange={(e) => this.handleChange(e)}
            className="form-control input-field"
          ></input>
          <textarea
            name="notes"
            placeholder="Description"
            value={this.state.notes}
            onChange={(e) => this.handleChange(e)}
            className="form-control input-field"
          ></textarea>
          {/* <input 
          type="file" 
          name="plantImg"
          value={this.state.plantImg}
          onChange={(e) => this.handleChange(e)}  >
          </input> */}
          <button onClick={this.submitHandler} className="btn btn-primary">
            Save
          </button>
        </form>
      </div>
    );
  }
}
