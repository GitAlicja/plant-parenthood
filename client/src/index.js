import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import axios from "axios";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter } from "react-router-dom";

const render = user => {
  ReactDOM.render(
    <React.StrictMode>
      <BrowserRouter>
        <App user={user} />
      </BrowserRouter>
    </React.StrictMode>,
    document.getElementById("root")
  );
};
// pass user in then to render (if found), catch if 401 (unauthorized)
axios.get("/api/checkuser").then(res => render(res.data)).catch(() => render(null));
serviceWorker.unregister();
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
