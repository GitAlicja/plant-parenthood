const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const User = require('../models/user-model');


// GET route => to get the user profile

router.get('/user-profile', (req, res, next) => {

  // TODO req.session.userID compare with auth (login)
  User.findById(req.session.userId)
    .then(user => {
      res.json(user);
    })
    .catch(err => {
      console.error(err);
      res.sentStatus(500);
    });
});

// PUT route => to update user profile

router.put('/user-profile/edit', (req, res, next) => {

  if (!req.body.name || req.body.name.trim().length === 0) {
    res.status(400).json({ error: 'Plant name missing!' });
    return;
  }

  User.findByIdAndUpdate()
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



module.exports = router;