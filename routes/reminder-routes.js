const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const Reminder = require('../models/reminder-model');
const Plant = require('../models/plant-model');


// GET route => to retrieve list of reminders

router.get('/reminders', (req, res, next) => {
  Reminder.find({ owner: req.session.userID })
    .populate('plant')
    .then(allTheReminders => {
      res.json(allTheReminders);
    })
    .catch(err => {
      console.error(err);
      res.sentStatus(500);
    });
});


// POST route => to create a new reminder

router.post('/reminders', (req, res, next) => {

  // TODO test reminderDate (input validation)
  Plant.findOne({ _id: req.body.plantID, owner: req.session.userID })
    .then(onePlant => {

      if (!onePlant) {
        res.status(400).json({ error: 'Plant not found!' })
        return;
      }

      Reminder.create({
        reminderDate: req.body.reminderDate,
        typeOfCare: req.body.typeOfCare,
        frequency: req.body.frequency,
        unit: req.body.unit,
        plant: req.body.plantID,
        owner: req.session.userID
      })
        .then(response => {
          Plant.findByIdAndUpdate(req.body.plantID, { $push: { reminders: response._id } })
            .then(theResponse => {
              res.json(theResponse);
            })
            .catch(err => {
              console.error(err);
              res.sentStatus(500);
            });
        })
        .catch(err => {
          console.error(err);
          res.sentStatus(500);
        });
    })
    .catch(err => {
      console.error(err);
      res.sentStatus(500);
    });
})


// GET route => to retrieve a specific reminder

router.get('/reminders/:id', (req, res, next) => {
  Reminder.findOne({ _id: req.params.id, owner: req.session.userID })
    .populate('plant')
    .then(oneReminder => {

      if (!oneReminder) {
        res.sendStatus(404);
        return;
      }
      res.json(oneReminder);
    })
    .catch(err => {
      console.error(err);
      res.sentStatus(500);
    });
});


// PUT route => to update a specific reminder

router.put('/reminders/:id', (req, res, next) => {

  // TODO test reminderDate (input validation)
  if (!req.body.reminderDate || !Array.isArray(req.body.typeOfCare) || req.body.typeOfCare < 1) {
    res.status(400).json({ error: 'Choose date and type of care!' });
    return;
  }

  Reminder.findOneAndUpdate({ _id: req.params.id, owner: req.session.userID }, { reminderDate: req.body.reminderDate, typeOfCare: req.body.typeOfCare, frequency: req.body.frequency, unit: req.body.unit})
    .then(oneReminder => {

      // if there is no reminder with certain id show 404 error
      if (!oneReminder) {
        res.sendStatus(404);
        return;
      }
      res.json({ message: `Reminder with ${req.params.id} is updated successfully.` });
    })
    .catch(err => {
      console.error(err);
      res.sentStatus(500);
    });
})


// DELETE route => to delete a specific reminder

router.delete('/reminders/:id', (req, res, next) => {

  Reminder.findOneAndRemove({ _id: req.params.id, owner: req.session.userID })
    .then(oneReminder => {

      // if there is no reminder with certain id show 404 error
      if (!oneReminder) {
        res.sendStatus(404);
        return;
      }
      res.json({ message: `Reminder with ${req.params.id} is removed successfully.` });
    })
    .catch(err => {
      console.error(err);
      res.sentStatus(500);
    });
})

module.exports = router;