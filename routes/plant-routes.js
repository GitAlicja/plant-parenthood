const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const axios = require("axios");

const Plant = require("../models/plant-model");
const Reminder = require("../models/reminder-model");

// GET route => to get all plants in your collection

router.get("/my-plants", (req, res, next) => {
  // find all plants, filter by the owner
  Plant.find({ owner: req.user._id })
    .then((collectedPlants) => {
      res.json(collectedPlants);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});

// POST route => to create / add a plant to your collection
// custom fields values and slug from the Trefle API accessed and sent to data base by frontend

router.post("/my-plants", (req, res, next) => {
  if (!req.body.name || req.body.name.trim().length === 0) {
    res.status(400).json({ error: "Plant name missing!" });
    return;
  }
  if (!req.body.slug || req.body.slug.trim().length === 0) {
    res.status(400).json({ error: "Slug is missing!" });
    return;
  }

  Plant.create({
    name: req.body.name,
    plantImg: req.body.plantImg,
    notes: req.body.notes,
    reminders: [],
    owner: req.user._id,
    trefleSlug: req.body.slug,
  })
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});

// GET route => to get a details page (plant which is in your collection)

router.get("/my-plants/:id/:slug", (req, res, next) => {
  // get the plant, filter by the owner and id
  Plant.findOne({ _id: req.params.id, owner: req.user._id })
    .populate("reminders")
    .then((onePlant) => {
      // if there is no plant with certain id show 404 error
      if (!onePlant) {
        res.sendStatus(404);
        return;
      }
      axios
        .get(
          "https://trefle.io/api/v1/plants/" +
            encodeURIComponent(onePlant.trefleSlug) +
            "?token=" +
            process.env.TREFLE_ACCESS_TOKEN
        )
        .then((trefleResponse) => {
          // information from trefle
          console.log(trefleResponse.data);

          res.json({ ourModel: onePlant, apiInfo: trefleResponse.data });
        });
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});

// 1st version => using slug from Trefle

/* router.get('/my-plants/:slug', (req, res, next) => {
  // Plant.findOne({ trefleSlug: req.params.slug }).populate('reminders')
  //  .then(onePlant => {
  axios.get('https://trefle.io/api/v1/plants/' + encodeURIComponent(req.params.slug) + '?token=' + process.env.TREFLE_ACCESS_TOKEN).then((resp) => {
    // information from trefle
    console.log(resp.data)

    // res.json({ ourModel: onePlant , apiInfo: resp.data });
    res.json({ apiInfo: resp.data });
  })

  //  })
}); */

// PUT route => to update custom filds of a specific plant

router.put("/my-plants/:id", (req, res, next) => {
  if (!req.body.name || req.body.name.trim().length === 0) {
    res.status(400).json({ error: "Plant name missing!" });
    return;
  }

  const updatePlantObj = { name: req.body.name, notes: req.body.notes };

  // we update the image only if it's added to edit form
  // if no image was added, no image will be sent to the data bank
  if (req.body.plantImg) {
    updatePlantObj.plantImg = req.body.plantImg;
  }

  // only the plant owner can update the plant (filter by the owner and id)
  // only values for the name, plantImg and notes properties can be updated
  // put method takes two arguments: what to look for (find an object with certain id), what to update (send)
  Plant.findOneAndUpdate(
    { _id: req.params.id, owner: req.user._id },
    // { name: req.body.name, plantImg: req.body.plantImg, notes: req.body.notes }
    updatePlantObj
  )
    .then((onePlant) => {
      // if there is no plant with certain id show 404 error
      if (!onePlant) {
        res.sendStatus(404);
        return;
      }
      res.json({
        message: `Plant with ${req.params.id} is updated successfully.`,
      });
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});

// DELETE route => to delete a specific plant

router.delete("/my-plants/:id", (req, res, next) => {
  Plant.findOneAndRemove({ _id: req.params.id, owner: req.user._id })
    .then((onePlant) => {
      // if there is no plant with certain id show 404 error
      if (!onePlant) {
        res.sendStatus(404);
        return;
      }

      // after removing a plant remove also all reminders created for this plant
      return Promise.all(
        onePlant.reminders.map((reminderID) =>
          Reminder.findByIdAndRemove(reminderID).exec()
        )
      )
        .then(() =>
          res.json({
            message: `Plant with ${req.params.id} is removed successfully.`,
          })
        )
        .catch((err) => {
          console.error(err);
          res.sendStatus(500);
        });
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});

module.exports = router;
