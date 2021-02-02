const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const Reminder = require("../models/reminder-model");
const Plant = require("../models/plant-model");


const typesOfCare = ["Water", "Fertilize", "Repot", "Insecticide", "Trim"];
const frequencies = [1, 2, 3, 4, 5, 6, 7];
const units = ["day", "week", "month", "year"];

// GET route => to retrieve list of all reminders

router.get("/reminders", (req, res, next) => {
  Reminder.find({ owner: req.user._id })
    .populate("plant")
    .then((allTheReminders) => {
      res.json(allTheReminders);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});

// POST route => to create a new reminder

router.post("/reminders", (req, res, next) => {
  Plant.findOne({ _id: req.body.plantID, owner: req.user._id })
    .then((onePlant) => {
      if (!onePlant) {
        res.status(400).json({ error: "Plant not found!" });
        return;
      }

      // detecting invalid date format
      const date = new Date(req.body.reminderDate);
      if (!date || Number.isNaN(date.getTime())) {
        res.status(400).json({ error: "Wrong date format!" });
        return;
      }

      if (!typesOfCare.includes(req.body.typeOfCare)) {
        res.status(400).json({ error: "Invalid type of care!" });
        return;
      }

      if (!frequencies.includes(req.body.frequency)) {
        res.status(400).json({ error: "Invalid frequency!" });
        return;
      }

      if (!units.includes(req.body.unit)) {
        res.status(400).json({ error: "Invalid unit!" });
        return;
      }

      Reminder.create({
        reminderDate: date,
        typeOfCare: req.body.typeOfCare,
        frequency: req.body.frequency,
        unit: req.body.unit,
        plant: req.body.plantID,
        owner: req.user._id,
      })
        .then((response) => {
          onePlant.reminders.push(response._id);
          onePlant
            .save()
            .then((theResponse) => {
              res.json(theResponse);
            })
            .catch((err) => {
              console.error(err);
              res.sendStatus(500);
            });
        })
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

// GET route => to retrieve a specific reminder

router.get("/reminders/:id", (req, res, next) => {
  Reminder.findOne({ _id: req.params.id, owner: req.user._id })
    .populate("plant")
    .then((oneReminder) => {
      if (!oneReminder) {
        res.sendStatus(404);
        return;
      }
      res.json(oneReminder);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});

// PUT route => to update a specific reminder

router.put("/reminders/:id", (req, res, next) => {
  if (
    !req.body.reminderDate ||
    !req.body.typeOfCare ||
    req.body.typeOfCare < 1
  ) {
    res.status(400).json({ error: "Choose date and type of care!" });
    return;
  }

  // detecting invalid date format
  const date = new Date(req.body.reminderDate);
  if (!date || Number.isNaN(date.getTime())) {
    res.status(400).json({ error: "Wrong date format!" });
    return;
  }

  if (!typesOfCare.includes(req.body.typeOfCare)) {
    res.status(400).json({ error: "Invalid type of care!" });
    return;
  }

  if (!frequencies.includes(req.body.frequency)) {
    res.status(400).json({ error: "Invalid frequency!" });
    return;
  }

  if (!units.includes(req.body.unit)) {
    res.status(400).json({ error: "Invalid unit!" });
    return;
  }

  Reminder.findOneAndUpdate(
    { _id: req.params.id, owner: req.user._id },
    {
      reminderDate: date,
      typeOfCare: req.body.typeOfCare,
      frequency: req.body.frequency,
      unit: req.body.unit,
    }
  )
    .then((oneReminder) => {
      // if there is no reminder with certain id show 404 error
      if (!oneReminder) {
        res.sendStatus(404);
        return;
      }
      res.json({
        message: `Reminder with ${req.params.id} is updated successfully.`,
      });
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});

// DELETE route => to delete a specific reminder

router.delete("/reminders/:id", (req, res, next) => {
  Reminder.findOneAndRemove({ _id: req.params.id, owner: req.user._id })
    .then((oneReminder) => {
      // if there is no reminder with certain id show 404 error
      if (!oneReminder) {
        res.sendStatus(404);
        return;
      }

      // after removing a reminder update plant reminders array
      Plant.findOneAndUpdate(
        { _id: req.body.plantID, owner: req.user._id },
        { $pull: { reminders: oneReminder._id } }
      )
        .then(() =>
          res.json({
            message: `Reminder with ${req.params.id} is removed successfully.`,
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
