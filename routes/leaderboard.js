const express = require('express');
const router = express.Router();
const leaderboardController = require('../controllers/LeaderboardController');

// GET: Global leaderboard
router.get('/global', leaderboardController.getGlobalLeaderboard);

// GET: City-based leaderboard
router.get('/city/:city', leaderboardController.getCityLeaderboard);

module.exports = router;
