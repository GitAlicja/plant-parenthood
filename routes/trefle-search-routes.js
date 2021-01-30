const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const axios = require("axios");
const user = require("../models/user-model");
const Plant = require("../models/plant-model");

// /api/search?searchterm= GET

router.get("/search", (req, res, next) => {

  const searchTerm = req.query.searchterm;
  console.log("SERACHTERM", searchTerm);
  //   res.redirect("/");
  // } else {

  //API Search example - https://trefle.io/api/v1/plants/search?token=YOUR_TREFLE_TOKEN&q=coconut

  const apiURL =
    "https://trefle.io/api/v1/plants/search?token=" +
    process.env.TREFLE_ACCESS_TOKEN +
    `&q=${searchTerm}`;

  axios.get(apiURL).then((resp) => {
    console.log(resp.data);
    res.json(resp.data);
  });
});

//get the detail of specific slug from the API

router.get("/search/detail/:slug", (req, res, next) => {
  console.log("search slug");
  //get the plant from API
  Plant.findOne({ trefleSlug: req.params.slug })
    .then((onePlant) => {
      axios
        .get(
          "https://trefle.io/api/v1/plants/" +
          encodeURIComponent(req.params.slug) +
          "?token=" +
          process.env.TREFLE_ACCESS_TOKEN
        )
        .then((resp) => {
          // information from trefle
          console.log(resp.data);
          res.json(resp.data);
        });
    })
    .catch((err) => {
      console.error(err);
      res.sentStatus(500);
    });
});

module.exports = router;
