const mongoose = require('mongoose');

const hiddenLocationSchema = new mongoose.Schema({
  locationName: {
    type: String,
    required: true,
  },
  latitude: {
    type: Number,
    required: true,
  },
  longitude: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,  // Each location should have an image URL
  },
  culturalSignificance: {
    type: String,
    default: null,
  },
  challenges: [
    {
      challengeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Challenge',
        default: null,
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
        default: null,
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
