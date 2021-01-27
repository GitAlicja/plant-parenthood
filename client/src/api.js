import axios from "axios";

export const signup = (username, password, email) => {
  return axios
    .post("/api/signup", { username, password, email })
    .then((response) => response.data);
};
