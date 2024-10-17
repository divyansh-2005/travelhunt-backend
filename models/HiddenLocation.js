const mongoose = require('mongoose');

const hiddenLocationSchema = new mongoose.Schema({
  locationName: {
    type: String,
    required: true,
  },
  coordinates: {
    lat: {
      type: Number,
      required: true,
    },
    lng: {
      type: Number,
      required: true,
    },
  },
  description: {
    type: String,
    required: true,
  },
  culturalSignificance: {
    type: String,
    required: true,
  },
  challenges: [
    {
      challengeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Challenge',
        default: null,  // Set default to null
      },
      description: String,
      points: {
        type: Number,
        default: 0,
      },
    },
  ],
  quizzes: [
    {
      quizId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Quiz',
        default: null,  // Set default to null
      },
      description: String,
      points: {
        type: Number,
        default: 0,
      },
    },
  ],
}, { timestamps: true });

module.exports = mongoose.model('HiddenLocation', hiddenLocationSchema);
