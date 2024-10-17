const User = require('../models/User');

// Get global leaderboard
const getGlobalLeaderboard = async (req, res) => {
  try {
    // Fetch users sorted by total points in descending order
    const users = await User.find({})
      .sort({ totalPoints: -1 })  // Sort users by totalPoints (highest first)
      .limit(10)  // Limit to top 10 users (can adjust as per requirement)
      .select('username totalPoints');  // Select only the necessary fields

    if (users.length === 0) {
      return res.status(404).json({ message: 'No users found for the leaderboard' });
    }

    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching global leaderboard', error: error.message });
  }
};

// Get city-based leaderboard
const getCityLeaderboard = async (req, res) => {
  try {
    const { city } = req.params;

    // Fetch users in the given city, sorted by total points
    const users = await User.find({ city })
      .sort({ totalPoints: -1 })  // Sort users by totalPoints (highest first)
      .limit(10)  // Limit to top 10 users
      .select('username totalPoints city');  // Select only the necessary fields

    if (users.length === 0) {
      return res.status(404).json({ message: `No users found for the leaderboard in ${city}` });
    }

    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching city leaderboard', error: error.message });
  }
};

module.exports = {
  getGlobalLeaderboard,
  getCityLeaderboard
};
