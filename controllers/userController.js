const User = require('../models/User'); // Ensure the User model is imported
const Challenge = require('../models/Challenge'); // Make sure this path is correct
const Quiz = require('../models/Quiz'); // Make sure this path is correct

async function getUserProfile(req, res) {
    try {
        const user = await User.findById(req.user.id).populate('challengesCompleted.challengeId quizAttempts.quizId');
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({
            fullName: user.fullName,
            email: user.email,
            username: user.username,
            city: user.city,
            locationsTraveled: user.locationsTraveled,
            age: user.age,
            gender: user.gender,
            totalPoints: user.totalPoints,
            challengesCompleted: user.challengesCompleted,
            quizzesCompleted: user.quizAttempts,
            rank: user.rank // Assuming rank is calculated elsewhere
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

async function updateUserProfile(req, res) {
    try {
      const { fullName, email, city, age, gender } = req.body;
  
      const user = await User.findById(req.user.id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Update user details
      user.fullName = fullName || user.fullName;
      user.email = email || user.email;
      user.city = city || user.city;
      user.age = age || user.age;
      user.gender = gender || user.gender;
  
      await user.save();
  
      res.status(200).json({ message: 'User details updated successfully', user });
    } catch (error) {
      console.error('Error updating user details:', error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
}

module.exports = { getUserProfile, updateUserProfile }; // Ensure the function is exported