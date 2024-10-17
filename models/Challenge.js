// models/Challenge.js
const mongoose = require('mongoose');

const ChallengeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  city: { type: String, required: true },
  points: { type: Number, required: true },
  locationCoordinates: {
    lat: { type: Number, required: true },
    long: { type: Number, required: true }
  },
  description: { type: String, required: true },
  required: { type: Boolean, default: false }
});

const Challenge = mongoose.model('Challenge', ChallengeSchema);

module.exports = Challenge;
