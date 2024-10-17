const Challenge = require('../models/Challenge');
const User = require('../models/User');

// Create a new challenge (only accessible by admin)
const createChallenge = async (req, res) => {
  try {
    const { title, city, points, locationCoordinates, description, required = false } = req.body;

    const newChallenge = new Challenge({
      title,
      city,
      points,
      locationCoordinates,
      description,
      required
    });

    await newChallenge.save();
    res.status(201).json(newChallenge);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating challenge', error: error.message });
  }
};

// Fetch all challenges
const getAllChallenges = async (req, res) => {
  try {
    const challenges = await Challenge.find({});

    if (challenges.length === 0) {
      return res.status(404).json({ message: 'No challenges found' });
    }

    res.status(200).json(challenges);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching challenges', error: error.message });
  }
};

// Fetch challenges by city
const getChallengesByCity = async (req, res) => {
  try {
    const city = req.params.city;
    const challenges = await Challenge.find({ city });

    if (challenges.length === 0) {
      return res.status(404).json({ message: 'No challenges found for this city' });
    }

    res.status(200).json(challenges);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching challenges', error: error.message });
  }
};

// Complete a challenge
const completeChallenge = async (req, res) => {
    try {
      // Extract userId from the token (assuming verifyToken middleware adds user info to req.user)
      const userId = req.user.id; 
      const { challengeId, pointsEarned } = req.body;
  
      // Ensure challengeId and pointsEarned are provided
      if (!challengeId || !pointsEarned) {
        return res.status(400).json({ message: 'Challenge ID and points earned are required' });
      }
  
      // Find the user by userId from the token
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Find the challenge to ensure it exists (optional but recommended for validation)
      const challenge = await Challenge.findById(challengeId);
      if (!challenge) {
        return res.status(404).json({ message: 'Challenge not found' });
      }
  
      // Check if the user has already completed the challenge
      const alreadyCompleted = user.challengesCompleted.some(
        (completed) => completed.challengeId.toString() === challengeId
      );
      if (alreadyCompleted) {
        return res.status(400).json({ message: 'Challenge already completed' });
      }
  
      // Add challenge to user's completedChallenges array
      user.challengesCompleted.push({
        challengeId,
        status: 'completed',
        pointsEarned,
        completedAt: new Date()
      });
  
      // Update total points
      user.totalPoints += pointsEarned;
  
      // Save the user with the updated challenge completion and points
      await user.save();
  
      return res.status(200).json({
        message: 'Challenge completed successfully',
        totalPoints: user.totalPoints,
        challengesCompleted: user.challengesCompleted
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error completing challenge', error: error.message });
    }
};
  

module.exports = {
  createChallenge,
  getAllChallenges,
  getChallengesByCity,
  completeChallenge
};