const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const User = require('../models/user-model');


// GET route => to get the user profile

router.get('/user-profile', (req, res, next) => {

  User.findById(req.user._id)
    .then(user => {
      // if there is no user with certain id show 404 error
      if (!user) {
        res.sendStatus(404);
        return;
      }
      res.json({ id: user._id, username: user.username, email: user.email, profileImg: user.profileImg });
    })
    .catch(err => {
      console.error(err);
      res.sendStatus(500);
    });
});

// PUT route => to update user profile

router.put('/user-profile', (req, res, next) => {

  if (!req.body.username || req.body.username.trim().length === 0) {
    res.status(400).json({ error: 'Username is missing!' });
    return;
  }

  if (!req.body.email || req.body.email.trim().length === 0) {
    res.status(400).json({ error: 'Email address is missing!' });
    return;
  }

  User.findByIdAndUpdate(req.user._id, { username: req.body.username, email: req.body.email, profileImg: req.body.profileImg })
    .then(user => {

      // if there is no user with certain id show 404 error
      if (!user) {
        res.sendStatus(404);
        return;
      }
      res.json({ message: `User with ID ${req.user._id} is updated successfully.` });
    })
    .catch(err => {
      console.error(err);
      res.sendStatus(500);
    });
})


// TODO password verification

// router.put('/user-profile/set-password', (req, res, next) => {});

module.exports = router;

