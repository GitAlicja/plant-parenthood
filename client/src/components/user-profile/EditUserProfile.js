import React from "react";
import axios from "axios";
import "../../App.css";

class EditUserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: this.props.theUser.username,
      email: this.props.theUser.email,
      profileImg: "",
    };
  }

  handleChangeInput = (event) => {
    this.setState({
      [event.target.name]: event.currentTarget.value,
    });
  };

  submitHandler = (event) => {
    event.preventDefault();

    axios.put("/api/user-profile", { ...this.state }).then((resp) => {
      this.props.reloadHandler();
    });
  };

  uploadHandler = (event) => {
    const uploadData = new FormData();
    uploadData.append("imageUrl", event.target.files[0]);

    axios.post("/api/upload", uploadData).then((resp) => {
      this.setState({
        profileImg: resp.data.secure_url,
      });
    });
  };

  render() {
    return (
      <div className="plant-edit-container">
        <h3>Edit your profile</h3>
        <form>
          <div className="form-group row justify-content-center justify-content-md-start">
            <label className="col-sm-5 col-form-label" htmlFor="username">
              Username:
            </label>
            <div className="col-sm-7">
              <input
                type="text"
                name="username"
                value={this.state.username}
                onChange={this.handleChangeInput}
                className="form-control"
              />
            </div>
          </div>
          <div className="form-group row justify-content-center justify-content-md-start">
            <label className="col-sm-5 col-form-label" htmlFor="email">
              Email:
            </label>
            <div className="col-sm-7">
              <input
                type="text"
                name="email"
                value={this.state.email}
                onChange={this.handleChangeInput}
                className="form-control"
              />
            </div>
          </div>
          <div className="form-group row justify-content-center justify-content-md-start">
            <label className="col-sm-5 col-form-label" htmlFor="profileImage">
              Image:
            </label>
            <div className="col-sm-7">
              <input
                type="file"
                name="profileImg"
                onChange={this.uploadHandler}
                className="form-control-file"
              />
            </div>
          </div>

          <button onClick={this.submitHandler} className="btn btn-primary btn-sm">
            Save Changes
          </button>
        </form>
      </div>
    );
  }
}

export default EditUserProfile;
