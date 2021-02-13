import React, { Component } from "react";

export default class TrefleInfoPlantList extends Component {
  //this component to be imported in TrefleSearchDetails and PlantApiDetails
  // this.props.trefleInfoPlant to match in TrefleSearchDetails

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

    const hasDistributionArray =
      this.props.trefleInfoPlant.main_species.distribution.native &&
      this.props.trefleInfoPlant.main_species.distribution.native.length > 0;

    const distributionNativeArray = this.props.trefleInfoPlant.main_species
      .distribution.native;

    //chooses 2 random distribution native countries from the array --> maybe show all countries for consistency??
    const randomCountryArray = [];
    for (let i = 0; i < 2; i++) {
      const randomCountry =
        distributionNativeArray[
          Math.floor(Math.random() * distributionNativeArray.length)
        ];
      randomCountryArray.push(randomCountry);
    }
    // console.log("randomCountryArray!!!", randomCountryArray);

    return (
      <div className="TreflePlantInfo">
        <img
          className="apiPlantImage"
          src={this.props.trefleInfoPlant.image_url}
          width="180"
          height="180"
          alt="selected plant"
        />

        <div className="treflePlantNames">
          <h3>Names:</h3>
          <h4>Common name:</h4>
          {this.props.trefleInfoPlant.common_name == null && (
            <p>information unavailable</p>
          )}{" "}
          <p style={{ textTransform: "capitalize" }}>
            {this.props.trefleInfoPlant.common_name}{" "}
          </p>
          <h4> Scientific name:</h4>
          {this.props.trefleInfoPlant.scientific_name == null && (
            <p>information unavailable</p>
          )}{" "}
          <p> {this.props.trefleInfoPlant.scientific_name}</p>{" "}
          <h4>Family common name:</h4>
          {this.props.trefleInfoPlant.family_common_name == null && (
            <p>information unavailable</p>
          )}{" "}
          <p> {this.props.trefleInfoPlant.family_common_name}</p>{" "}
        </div>

        <div className="treflePlantGallery">
          <h3>Gallery: </h3>

          {/* hide unavailable images */}
          <p> Flower Images: </p>
          {hasFlowerImages &&
            this.props.trefleInfoPlant.main_species.images.flower.map(
              (flower) => {
                return (
                  <img
                    key={flower.id}
                    className="apiPlantImage"
                    src={flower.image_url}
                    width="180"
                    height="180"
                    alt="imgFlower"
                  />
                );
              }
            )}
          {hasLeafImages &&
            this.props.trefleInfoPlant.main_species.images.leaf.map((leaf) => {
              return (
                <img
                  key={leaf.id}
                  className="apiPlantImage"
                  src={leaf.image_url}
                  width="180"
                  height="180"
                  alt="imgLeaf"
                />
              );
            })}

          <div className="trefleDistributionNativeCountries">
            <h3>Distribution Native Countries :</h3>{" "}
            <p>(some of the countries)</p>
            {hasDistributionArray &&
              randomCountryArray.map((country, index) => {
                return <p key={index}>{country}</p>;
              })}
            {/* {this.props.trefleInfoPlant.main_species.distribution.native
              .slice(0, 2)
              .map((country, index) => {
                return <p key={index}>{country} </p>;
              })} */}
          </div>
          <div className="treflePlantGrowth">
            {" "}
            <h3>Growth:</h3>
            <h4>PH Maximum:</h4>
            {this.props.trefleInfoPlant.main_species.growth.ph_maximum ==
              null && <p>information unavailable </p>}{" "}
            <p>{this.props.trefleInfoPlant.main_species.growth.ph_maximum}</p>
            <h4>PH Minimum:</h4>
            {this.props.trefleInfoPlant.main_species.growth.ph_minimum ==
              null && <p>information unavailable</p>}{" "}
            <p>{this.props.trefleInfoPlant.main_species.growth.ph_minimum}</p>
            <h4>Light*:</h4>
            {this.props.trefleInfoPlant.main_species.growth.light == null && (
              <p>information unavailable</p>
            )}{" "}
            <p>{this.props.trefleInfoPlant.main_species.growth.light}</p>
            <h4>Bloom months:</h4>
            {this.props.trefleInfoPlant.main_species.growth.bloom_months ==
              null && <p>information unavailable</p>}{" "}
            {hasBloomMonths &&
              this.props.trefleInfoPlant.main_species.growth.bloom_months.map(
                (month, index) => {
                  return (
                    <p style={{ textTransform: "capitalize" }} key={index}>
                      {month}{" "}
                    </p>
                  );
                }
              )}
            <h4>Atmospheric humidity**:</h4>
            {this.props.trefleInfoPlant.main_species.growth
              .atmospheric_humidity == null && <p>information unavailable</p>}
            <p>
              {
                this.props.trefleInfoPlant.main_species.growth
                  .atmospheric_humidity
              }
            </p>
            <h4>Minimum temperature:</h4>
            {this.props.trefleInfoPlant.main_species.growth.minimum_temperature
              .deg_c == null && <p>information unavailable</p>}
            <p>
              {
                this.props.trefleInfoPlant.main_species.growth
                  .minimum_temperature.deg_c
              }
              C°
            </p>
            <h4>Maximum temperature:</h4>
            {this.props.trefleInfoPlant.main_species.growth.maximum_temperature
              .deg_c == null && <p>information unavailable</p>}{" "}
            <p>
              {
                this.props.trefleInfoPlant.main_species.growth
                  .maximum_temperature.deg_c
              }
              C°
            </p>
            <h4>Soil texture:</h4>
            {this.props.trefleInfoPlant.main_species.growth.soil_texture ==
              null && <p>information unavailable</p>}{" "}
            <p>{this.props.trefleInfoPlant.main_species.growth.soil_texture}</p>
            <h4>Soil humidity:</h4>
            {this.props.trefleInfoPlant.main_species.growth.soil_humidity ==
              null && <p>information unavailable</p>}{" "}
            <p>
              {this.props.trefleInfoPlant.main_species.growth.soil_humidity}
            </p>
          </div>

          <p className="trefleGrowthNotes">
            * Light: Required amount of light, on a scale from 0 (no light, less
            than/equal to 10 lux) to 10 (very intensive insolation, reater
            than/equal to100 000 lux) <br></br>
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
