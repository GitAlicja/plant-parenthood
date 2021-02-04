const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reminderSchema = new Schema({
  reminderDate: {
    type: Date,
    required: true
  },
  typeOfCare: {
    type: String,
    required: true
  },
  plant: {
    type: Schema.Types.ObjectId,
    ref: 'Plant',
    required: true
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  frequency: Number,
  unit: String
});

const Reminder = mongoose.model('Reminder', reminderSchema);

module.exports = Reminder;