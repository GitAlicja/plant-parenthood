const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      // match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.'],
      // unique: true,
      // lowercase: true,
      // trim: true
    },
    passwordHash: {
      type: String,
      required: true
    },
    // bookmarkedPlants: [{ type: Schema.Types.ObjectId, ref: 'Plant' }],
    collectedPlants: [{ type: Schema.Types.ObjectId, ref: 'Plant' }],
    profileImg: String,
  },
  {
    timestamps: true
  }
);

const User = mongoose.model('User', userSchema);

module.exports = User;

