const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const plantSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  plantImg: String,
  notes: {
    type: String,
    trim: true,
  },
  reminders: [{ type: Schema.Types.ObjectId, ref: "Reminder" }],
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  trefleSlug: {
    type: String,
    required: true,
    trim: true,
  },
});

const Plant = mongoose.model("Plant", plantSchema);

module.exports = Plant;
