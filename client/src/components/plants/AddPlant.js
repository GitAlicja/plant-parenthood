import React from "react";
import axios from "axios";

class AddPlant extends React.Component {
  state = {
    name: "",
    plantImg: "",
    notes: ""
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
        plantImg: resp.data.secure_url
      })
    })
  }

  render() {
    return (
      <div>
        <h2>Add a new plant</h2>
        <form>
          <input type="text" name="name" placeholder="Plant name" value={this.state.name} onChange={this.handleChangeInput} className="form-control input-field"></input>
          <textarea
            name="notes"
            placeholder="Your notes"
            value={this.state.notes}
            onChange={this.handleChangeInput}
            className="form-control input-field"
          ></textarea>
          <label>Upload an image
          <input type="file" name="plantImg" onChange={this.uploadHandler}></input>  
          </label>
          <button onClick={this.submitHandler} className="btn btn-primary">
            Save Plant
          </button>
        </form>
      </div>
    );
  }
}

export default AddPlant;
