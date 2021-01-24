const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const axios = require("axios");

const Plant = require("../models/plant-model");

router.get("/my-plants", (req, res, next) => {
  Plant.find()
    .populate("reminders")
    .then((allThePlants) => {
      res.json(allThePlants);
    });
});
router.get("/search", (req, res, next) => {
  const searchTerm = req.query.searchterm;
  // if (!req.session.userId) {
  //   res.redirect("/");
  // } else {
  let query = {
    $or: [
      { name: new RegExp(req.query.query, "i") },
      { instructions: new RegExp(req.query.query, "i") },
    ],
  };

  //API Search example - https://trefle.io/api/v1/plants/search?token=YOUR_TREFLE_TOKEN&q=coconut

  Plant.find(query).then(() => {
    axios
      .get(
        "https://trefle.io/api/v1/plants/search?token=" +
          process.env.TREFLE_ACCESS_TOKEN +
          `&q=${searchTerm}`
      )
      .then((resp) => {
        // information from trefle
        console.log(resp.data);
        res.json({ apiInfo: resp.data });
      });
  });
});
module.exports = router;
