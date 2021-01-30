import React, { Component } from "react";
import axios from "axios";

//obtains plant details from API added in the users' collection

export default class PlantCustomFields extends Component {
  state = {
    plant: null,
    loading: true,
  };

  componentDidMount() {
    const { params } = this.props.match;

    axios.get(`/api/my-plants/:id/${params.slug}`).then((responseFromApi) => {
      this.setState({
        plant: responseFromApi.ourModel.data,
        loading: false,
      });
    });
  }
  render() {
    return (
      <div className="apiPlantDetails">
        {/* <img
          src={this.state.plant.image_url}
          width="180"
          height="180"
          alt="selected plant"
        /> */}
        <h2>Common Name: {this.state.plant.common_name}</h2>
      </div>
    );
  }
}
