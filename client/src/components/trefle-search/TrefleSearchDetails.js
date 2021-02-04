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
      console.log(responseFromApi);
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

        {this.state.plant && (
          <div>
            <img
              className="apiPlantImage"
              src={this.state.plant.image_url}
              width="180"
              height="180"
              alt="selected plant"
            />
            <div className="commonName">
              {" "}
              <h3>Names:</h3>
              <h4>Common name:</h4>
              {this.state.plant.common_name == null && (
                <p>information unavailable</p>
              )}{" "}
              <p style={{ textTransform: "capitalize" }}>
                {this.state.plant.common_name}{" "}
              </p>
              <h4> Scientific name:</h4>
              {this.state.plant.scientific_name == null && (
                <p>information unavailable</p>
              )}{" "}
              <p> {this.state.plant.scientific_name}</p>{" "}
              <h4>Family common name:</h4>
              {this.state.plant.family.common_name == null && (
                <p>information unavailable</p>
              )}{" "}
              <p> {this.state.plant.family.common_name}</p>{" "}
            </div>
            <h3>Gallery: </h3>
            <img
              className="apiPlantImage"
              src={this.state.plant.main_species.images.flower[0].image_url}
              width="180"
              height="180"
              alt="imgFlower"
            />
            <img
              className="apiPlantImage"
              src={this.state.plant.main_species.images.flower[1].image_url}
              width="180"
              height="180"
              alt="imgFlower1"
            />
            <img
              className="apiPlantImage"
              src={this.state.plant.main_species.images.leaf[0].image_url}
              width="180"
              height="180"
              alt="imgLeaf"
            />
            <h3>Distribution Native Countries:</h3>
            {this.state.plant.main_species.distribution.native
              .slice(0, 2)
              .map((item, index) => {
                return <div key={index}>{item} </div>;
              })}
            <div className="plantGrowth">
              {" "}
              <h3>Growth:</h3>
              <h4>PH Maximum:</h4>
              {this.state.plant.main_species.growth.ph_maximum == null && (
                <p>information unavailable </p>
              )}{" "}
              <p>{this.state.plant.main_species.growth.ph_maximum}</p>
              <h4>PH Minimum:</h4>
              {this.state.plant.main_species.growth.ph_minimum == null && (
                <p>information unavailable</p>
              )}{" "}
              <p>{this.state.plant.main_species.growth.ph_minimum}</p>
              <h4>Light*:</h4>
              {this.state.plant.main_species.growth.light == null && (
                <p>information unavailable</p>
              )}{" "}
              <p>{this.state.plant.main_species.growth.light}</p>
              <h4>Bloom months:</h4>
              {this.state.plant.main_species.growth.bloom_months == null && (
                <p>information unavailable</p>
              )}{" "}
              <p>{this.state.plant.main_species.growth.bloom_months}</p>
              <h4>Atmospheric humidity**:</h4>
              {this.state.plant.main_species.growth.atmospheric_humidity ==
                null && <p>information unavailable</p>}
              <p>{this.state.plant.main_species.growth.atmospheric_humidity}</p>
              <h4>Minimum temperature:</h4>
              {this.state.plant.main_species.growth.minimum_temperature.deg_c ==
                null && <p>information unavailable</p>}
              <p>
                {this.state.plant.main_species.growth.minimum_temperature.deg_c}
                C°
              </p>
              <h4>Maximum temperature:</h4>
              {this.state.plant.main_species.growth.maximum_temperature.deg_c ==
                null && <p>information unavailable</p>}{" "}
              <p>
                {this.state.plant.main_species.growth.maximum_temperature.deg_c}
                C°
              </p>
              <h4>Soil texture:</h4>
              {this.state.plant.main_species.growth.soil_texture == null && (
                <p>information unavailable</p>
              )}{" "}
              <p>{this.state.plant.main_species.growth.soil_texture}</p>
              <h4>Soil humidity:</h4>
              {this.state.plant.main_species.growth.soil_humidity == null && (
                <p>information unavailable</p>
              )}{" "}
              <p>{this.state.plant.main_species.growth.soil_humidity}</p>
              <p>
                * Light: Required amount of light, on a scale from 0 (no light,
                less than/equal to 10 lux) to 10 (very intensive insolation,
                reater than/equal to100 000 lux) <br></br>
                **Atmospheric humidity: Required relative humidity in the air,
                on a scale from 0 (less than/equal to 10%) to 10 (greater
                than/equal to 90%)
              </p>
            </div>
            <Link to={`/add-plant/${this.state.plant.slug}`}>
              Add to My Plant Collection
            </Link>
          </div>
        )}
      </div>
    );
  }
}

// common_name
// scientific_name
// family_common_name
// images [could be an additional gallery]
// distribution.native [could be 2-3 places] - shall we list them all since they are in alphabetical order= or display them randomly?
// growth.ph_maxiumum
// growth.ph_minimum
// growth.light
// growth.atmospheric_humidity
// growth.minimum_temperature
// growth.maximum_temperature
// growth.soil_texture
// growth.soil_humidity
