const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const plantSchema = new Schema({
  name: String,
  plantImg: String,
  notes: String,
  reminders: [{ type: Schema.Types.ObjectId, ref: "Reminder" }],
  trefleSlug: String,
});

const Plant = mongoose.model("Plant", plantSchema);

module.exports = Plant;
