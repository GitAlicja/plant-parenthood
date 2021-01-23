const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const axios = require('axios');

const Plant = require('../models/plant-model');
const Reminder = require('../models/reminder-model');


// GET route => to get all plants in your collection

// find all plants, filter by the owner
router.get('/my-plants', (req, res, next) => {
  Plant.find({ owner: req.session.userID })
    .then(allThePlants => {
      res.json(allThePlants);
    })
    .catch(err => {
      console.error(err);
      res.sentStatus(500);
    });
});


// POST route => to create / add a plant to your collection
// custom fields and slug from the Trefle API accessed and sent to data base by the frontend

router.post('/my-plants', (req, res, next) => {

  if (!req.body.name || req.body.name.trim().length === 0) {
    res.status(400).json({ error: 'Plant name missing!' });
    return;
  }
  if (!req.body.slug || req.body.slug.trim().length === 0) {
    res.status(400).json({ error: 'Slug is missing!' });
    return;
  }

  Plant.create({
    name: req.body.name,
    plantImg: req.body.plantImg,
    notes: req.body.notes,
    reminders: [],
    // TODO req.session.userID compare with auth (login)
    owner: req.session.userID,
    trefleSlug: req.body.slug
  })
    .then(response => {
      res.json(response);
    })
    .catch(err => {
      console.error(err);
      res.sentStatus(500);
    });
});


// GET route => to get a details page (plant which is in your collection)

// get the plant, filter by the owner and id
router.get('/my-plants/:id', (req, res, next) => {
  Plant.findOne({ _id: req.params.id, owner: req.session.userID })
    .populate('reminders')
    .then(onePlant => {

      // if there is no plant with certain id show 404 error
      if (!onePlant) {
        res.sendStatus(404);
        return;
      }
      axios.get('https://trefle.io/api/v1/plants/' + encodeURIComponent(onePlant.trefleSlug) + '?token=' + process.env.TREFLE_ACCESS_TOKEN)
        .then((trefleResponse) => {
          // information from trefle
          console.log(trefleResponse.data);

          res.json({ ourModel: onePlant, apiInfo: trefleResponse.data });
          //res.json({ apiInfo: resp.data });
        });
    })
    .catch(err => {
      console.error(err);
      res.sentStatus(500);
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

router.put('/my-plants/:id', (req, res, next) => {

  if (!req.body.name || req.body.name.trim().length === 0) {
    res.status(400).json({ error: 'Plant name missing!' });
    return;
  }

  // only the plant owner can update the plant (filter by the owner and id)
  // only values for the name, plantImg and notes properties can be updated
  Plant.findOneAndUpdate({ _id: req.params.id, owner: req.session.userID }, { name: req.body.name, plantImg: req.body.plantImg, notes: req.body.notes })
    .then(onePlant => {

      // if there is no plant with certain id show 404 error
      if (!onePlant) {
        res.sendStatus(404);
        return;
      }
      res.json({ message: `Plant with ${req.params.id} is updated successfully.` });
    })
    .catch(err => {
      console.error(err);
      res.sentStatus(500);
    });
})


// DELETE route => to delete a specific plant

router.delete('/my-plants/:id', (req, res, next) => {

  Plant.findOneAndRemove({ _id: req.params.id, owner: req.session.userID })
    .then(onePlant => {

      // if there is no plant with certain id show 404 error
      if (!onePlant) {
        res.sendStatus(404);
        return;
      }
      res.json({ message: `Plant with ${req.params.id} is removed successfully.` });
    })
    .catch(err => {
      console.error(err);
      res.sentStatus(500);
    });
})

module.exports = router;