import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
export default class TrefleSearchDetails extends Component {
  state = {
    plant: null,
    loading: true,
  };

  componentDidMount() {
    const { params } = this.props.match;

    axios.get(`/api/search/detail/${params.slug}`).then((responseFromApi) => {
      this.setState({
        plant: responseFromApi.data.data,
        loading: false,
      });
    });
  }

  render() {
    return (
      <div className="treflePlantDetails">
        {this.state.loading && <h1>Loading...</h1>}
        {/* <Link to={'/add-plant/:slug'}> Add to my plant collection </Link> */}
        {this.state.plant && (
          <div>
            <img
              src={this.state.plant.image_url}
              width="180"
              height="180"
              alt="selected plant"
            />
            <h2>Common Name: {this.state.plant.common_name}</h2>
            <p>Scientific Name: {this.state.plant.scientific_name}</p>
            <p>Family Common Name: {this.state.plant.family.common_name}</p>
            <p>Observations: {this.state.plant.observations}</p>
          </div>
        )}
      </div>
    );
  }
}

// common_name
// scientific_name
// year (?)
// family_common_name
// family
// genus
// image_url
// observations
