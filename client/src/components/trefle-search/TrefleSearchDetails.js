import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import TrefleInfoPlantList from "../plants/TrefleInfoPlantList";
export default class TrefleSearchDetails extends Component {
  state = {
    plant: null,
    loading: true,
  };

  componentDidMount() {
    const { params } = this.props.match;

    axios.get(`/api/search/detail/${params.slug}`).then((responseFromApi) => {
      console.log("CHECK THE RESPONSE!!!", responseFromApi);

      this.setState({
        plant: responseFromApi.data.data,
        loading: false,
      });
    });
  }

  render() {
    console.log("CHECK THE STATE!", this.state);
    if (this.state.loading) {
      return <h1>Loading...</h1>;
    }
    return (
      <div className="treflePlantDetails">
        {/* {this.state.plant.scientific_name} */}

        <TrefleInfoPlantList trefleInfoPlant={this.state.plant} />

        <Link to={`/add-plant/${this.state.plant.slug}`}>
          Add to My Plant Collection
        </Link>
      </div>
    );
  }
}
