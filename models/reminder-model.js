const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reminderSchema = new Schema({
  reminderDate: Date,
  typeOfCare: [String],
  //plant: [{ type: Schema.Types.ObjectId, ref: 'Plant' }],
  frequency: Number,
  unit: String
});

const Reminder = mongoose.model('Reminder', reminderSchema);

module.exports = Reminder;