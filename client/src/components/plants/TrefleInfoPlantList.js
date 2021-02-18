import React, { Component } from "react";

import Gallery from "./Gallery";

export default class TrefleInfoPlantList extends Component {
  state = {
    animating: false,
  };
  //this component to be imported in TrefleSearchDetails and PlantApiDetails
  // this.props.trefleInfoPlant to match in TrefleSearchDetails
  setAnimating = (condition) => {
    this.setState({
      animating: condition,
    });
  };

  render() {
    //to check if image array is defined and if contains information
    const hasFlowerImages =
      this.props.trefleInfoPlant.main_species.images.flower &&
      this.props.trefleInfoPlant.main_species.images.flower.length > 0;

    const hasLeafImages =
      this.props.trefleInfoPlant.main_species.images.leaf &&
      this.props.trefleInfoPlant.main_species.images.leaf.length > 0;

    const hasBloomMonths =
      this.props.trefleInfoPlant.main_species.growth.bloom_months &&
      this.props.trefleInfoPlant.main_species.growth.bloom_months.length > 0;

    let blossomMonths = [];
    if (hasBloomMonths) {
      this.props.trefleInfoPlant.main_species.growth.bloom_months.map(
        (month) => {
          return blossomMonths.push(month);
        }
      );
    }

    const randomCountryArray = [];
    const distributionNativeArray = this.props.trefleInfoPlant.main_species.distribution.native || [];

    for (let i = 0; i < 3 && i < distributionNativeArray.length; i++) {
      const randomCountry =
        distributionNativeArray[
          Math.floor(Math.random() * distributionNativeArray.length)
        ];
      randomCountryArray.push(randomCountry);
    }
    
    return (
      <div className="trefle-plant-info-innerbox shadow p-4 mb-4 bg-body rounded">
        <h3 className="green-headline mb-2">General Information</h3>
        <div>
          {this.props.trefleInfoPlant.image_url ? (
            <img src={this.props.trefleInfoPlant.image_url} alt="selected plant" className="img-fluid" />
          ) : ""}
        </div>
        <div className="trefle-names mt-3">
          <h5 className="yellow-headline">Names</h5>
          <table className="table table-responsive d-table table-borderless">
            <tbody>
              <tr className="tr-color">
                <td>Common name</td>
                {!this.props.trefleInfoPlant.common_name ? (<td>currently unavailable</td>) :
                  (<td style={{ textTransform: "capitalize" }}>{this.props.trefleInfoPlant.common_name}</td>)}
              </tr>
              <tr>
                <td>Scientific name</td>
                {!this.props.trefleInfoPlant.scientific_name ? (<td>currently unavailable</td>) :
                  (<td style={{ textTransform: "capitalize" }}>{this.props.trefleInfoPlant.scientific_name}</td>)}
              </tr>
              <tr className="tr-color">
                <td>Family common name</td>
                {!this.props.trefleInfoPlant.family_common_name ? (<td>currently unavailable</td>) :
                  (<td style={{ textTransform: "capitalize" }}> {this.props.trefleInfoPlant.family_common_name}</td>)}
              </tr>
            </tbody>
          </table>
        </div>

        <div className="trefle-distribution mt-2">
          <h5 className="yellow-headline">Distribution Native*</h5>
          <ul className="distribution-countries">
            {randomCountryArray.length > 0 ? randomCountryArray.map((country, index) => (<li key={index}>{country}</li>)) : (<li>currently unavailable</li>)}
          </ul>
          {/* {this.props.trefleInfoPlant.main_species.distribution.native
              .slice(0, 2)
              .map((country, index) => {
                return <p key={index}>{country} </p>;
              })} */}
        </div>

        <div className="trefle-plant-gallery">
          {/* <h5 className="yellow-headline mt-3">Gallery</h5> */}
          {/* hide unavailable images */}
          {hasFlowerImages && (
            <div>
              <h5 className="yellow-headline mt-3">Flower Images</h5>
              <Gallery
                items={this.props.trefleInfoPlant.main_species.images.flower}
              />
            </div>
          )}
          {hasLeafImages && (
            <div>
              <h5 className="yellow-headline mt-3">Leaf Images</h5>
              <Gallery
                className="api-plant-images"
                items={this.props.trefleInfoPlant.main_species.images.leaf}
              />
            </div>
          )}
        </div>

        <div className="trefle-plant-growth mt-3">
          <h5 className="yellow-headline">Growth</h5>
          <table className="table table-responsive d-table table-borderless">
            <tbody>
              <tr className="tr-color">
                <td>PH Maximum</td>
                {!this.props.trefleInfoPlant.main_species.growth.ph_maximum ? (
                  <td>currently unavailable</td>
                ) : (
                  <td>
                    {this.props.trefleInfoPlant.main_species.growth.ph_maximum}
                  </td>
                )}
              </tr>
              <tr>
                <td>PH Minimum</td>
                {!this.props.trefleInfoPlant.main_species.growth.ph_minimum ? (<td>currently unavailable</td>) :
                  (<td>{this.props.trefleInfoPlant.main_species.growth.ph_minimum}</td>)}
              </tr>
              <tr className="tr-color">
                <td>Light**</td>
                {!this.props.trefleInfoPlant.main_species.growth.light ? (
                  <td>currently unavailable</td>
                ) : (
                  <td>
                    {this.props.trefleInfoPlant.main_species.growth.light}
                  </td>
                )}
              </tr>
              <tr>
                <td>Bloom months</td>
                {!this.props.trefleInfoPlant.main_species.growth
                  .bloom_months ? (
                  <td>currently unavailable</td>
                ) : (
                  <td style={{ textTransform: "capitalize" }}>
                    {blossomMonths.join(", ")}
                  </td>
                )}
              </tr>
              <tr className="tr-color">
                <td>Atmospheric humidity***</td>
                {!this.props.trefleInfoPlant.main_species.growth
                  .atmospheric_humidity ? (
                  <td>currently unavailable</td>
                ) : (
                  <td>
                    {
                      this.props.trefleInfoPlant.main_species.growth
                        .atmospheric_humidity
                    }
                  </td>
                )}
              </tr>
              <tr>
                <td>Minimum temperature</td>
                {!this.props.trefleInfoPlant.main_species.growth
                  .minimum_temperature.deg_c ? (
                  <td>currently unavailable</td>
                ) : (
                  <td>
                    {
                      this.props.trefleInfoPlant.main_species.growth
                        .minimum_temperature.deg_c
                    }{" "}
                    °C
                  </td>
                )}
              </tr>
              <tr className="tr-color">
                <td>Maximum temperature</td>
                {!this.props.trefleInfoPlant.main_species.growth
                  .maximum_temperature.deg_c ? (
                  <td>currently unavailable</td>
                ) : (
                  <td>
                    {
                      this.props.trefleInfoPlant.main_species.growth
                        .maximum_temperature.deg_c
                    }{" "}
                    °C
                  </td>
                )}
              </tr>
              <tr>
                <td>Soil texture</td>
                {!this.props.trefleInfoPlant.main_species.growth
                  .soil_texture ? (
                  <td>currently unavailable</td>
                ) : (
                  <td>
                    {
                      this.props.trefleInfoPlant.main_species.growth
                        .soil_texture
                    }
                  </td>
                )}
              </tr>
              <tr className="tr-color">
                <td>Soil humidity</td>
                {!this.props.trefleInfoPlant.main_species.growth
                  .soil_humidity ? (
                  <td>currently unavailable</td>
                ) : (
                  <td>
                    {
                      this.props.trefleInfoPlant.main_species.growth
                        .soil_humidity
                    }
                  </td>
                )}
              </tr>
            </tbody>
          </table>
          {/* {this.props.trefleInfoPlant.main_species.growth.bloom_months ==
              null && <p>currently unavailable</p>}
            {hasBloomMonths &&
              this.props.trefleInfoPlant.main_species.growth.bloom_months.map(
                (month, index) => {
                  return (
                    <p style={{ textTransform: "capitalize" }} key={index}>
                      {month}{" "}
                    </p>
                  );
                }
              )} */}
        </div>
        <div className="trefle-growth-notes mt-4">
          <p>* Some of the countries (chosen randomly)</p>
          <p>
            ** Light: Required amount of light, on a scale from 0 (no light,
            less than/equal to 10 lux) to 10 (very intensive insolation, reater
            than/equal to100 000 lux){" "}
          </p>
          <p>
            **Atmospheric humidity: Required relative humidity in the air, on a
            scale from 0 (less than/equal to 10%) to 10 (greater than/equal to
            90%)
          </p>
        </div>
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
