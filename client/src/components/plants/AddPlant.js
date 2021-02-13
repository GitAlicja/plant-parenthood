import React from "react";
import axios from "axios";

class AddPlant extends React.Component {
  state = {
    name: "",
    plantImg: "",
    notes: "",
  };

  handleChangeInput = (event) => {
    this.setState({
      [event.target.name]: event.currentTarget.value,
    });
  };

  submitHandler = (event) => {
    const slug = this.props.match.params.slug;

    event.preventDefault();

    axios.post("/api/my-plants", { ...this.state, slug }).then((resp) => {
      this.props.history.push("/my-plants");
      // console.log(resp);
    });
  };

  uploadHandler = (event) => {
    const uploadData = new FormData();
    uploadData.append("imageUrl", event.target.files[0]);

    axios.post("/api/upload", uploadData).then((resp) => {
      this.setState({
        plantImg: resp.data.secure_url,
      });
    });
  };

  render() {
    return (
      <div className="plant-edit-container">
        <h3>Add a new plant</h3>
        <form>
          <div className="form-group row">
            <label className="col-sm-2 col-form-label" for="plant-name">
              Plant name
            </label>
            <div className="col-7">
              <input
                type="text"
                name="name"
                // placeholder="Plant name"
                value={this.state.name}
                onChange={this.handleChangeInput}
                className="form-control"
              ></input>
            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-2 col-form-label" for="notes">
              Your notes
            </label>
            <div className="col-sm-7">
              <textarea
                name="notes"
                // placeholder="Your notes"
                value={this.state.notes}
                onChange={this.handleChangeInput}
                className="form-control input-field"
                rows="5"
              ></textarea>
            </div>
          </div>
          <div className="form-group row">
            <label className="col sm-2 col-form-label" for="plantImg">
              Upload an image
            </label>

            <div className="col-sm-10">
              <input
                type="file"
                name="plantImg"
                onChange={this.uploadHandler}
                className="form-control-file"
              ></input>
            </div>
          </div>
          <button onClick={this.submitHandler} className="btn btn-primary">
            Save Plant
          </button>
        </form>
      </div>
    );
  }
}

export default AddPlant;
