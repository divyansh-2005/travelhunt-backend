const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  fullName: {
    type: String,
    default: '',  // Users can fill this later through the update details route
  },
  email: {
    type: String,
    default: '',  // Users can fill this later through the update details route
  },
  city: {
    type: String,
    default: '',  // The living location of the user
  },
  age: {
    type: Number,
    default: null,
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
    default: 'Other',
  },
  totalPoints: {
    type: Number,
    default: 0,  // Total points from quests, challenges, and quizzes
  },
  locationsTraveled: [
    {
      locationName: { 
        type: String, 
        required: true,
      },
      coordinates: {
        lat: { type: Number, required: true },
        lng: { type: Number, required: true },
      },
      pointsEarned: {
        type: Number,
        default: 0,  // Points earned at this location
      },
      visitedAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  questsCompleted: [
    {
      questId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Quest',
      },
      status: {
        type: String,
        enum: ['in-progress', 'completed', 'failed'],
        default: 'in-progress',
      },
      completedAt: {
        type: Date,
        default: null,
      },
      pointsEarned: {
        type: Number,
        default: 0,
      },
    },
  ],
  challengesCompleted: [
    {
      challengeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Challenge',
      },
      status: {
        type: String,
        enum: ['in-progress', 'completed', 'failed'],
        default: 'in-progress',
      },
      completedAt: {
        type: Date,
        default: null,
      },
      pointsEarned: {
        type: Number,
        default: 0,
      },
    },
  ],
  quizAttempts: [
    {
      quizId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Quiz',
      },
      score: {
        type: Number,
        default: 0,
      },
      completedAt: {
        type: Date,
        default: null,
      },
    },
  ],
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
