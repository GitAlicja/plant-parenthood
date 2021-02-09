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
  uploadHandler = (event) => {
    const uploadData = new FormData();
    // imageUrl => this name has to be the same as in the model since we pass
    // req.body to .create() method when creating a new thing in '/api/things/create' POST route
    uploadData.append("imageUrl", event.target.files[0]);

    axios.post("/api/upload", uploadData).then((resp) => {
      this.setState({
        plantImg: resp.data.secure_url,
      });
    });
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
          <input
            type="file"
            name="plantImg"
            // value={this.state.plantImg}
            onChange={(e) => this.uploadHandler(e)}
          ></input>
          <img
            src={this.state.plantImg || "/images/growing.png"}
            width="180"
            height="180"
            alt="defaultPlantImg"
          />
          <button onClick={this.submitHandler} className="btn btn-primary">
            Save
          </button>
        </form>
      </div>
    );
  }
}
