const express = require('express');
const router = express.Router();
const adminAuth = require('../middleware/adminAuth');
const challengeController = require('../controllers/challengeController');
const { verifyToken } = require('../middleware/auth');

// POST: Create a new challenge (only accessible by admin)
router.post('/', adminAuth, challengeController.createChallenge);

// GET: Fetch all challenges
router.get('/', challengeController.getAllChallenges);

// GET: Fetch challenges by city
router.get('/:city', challengeController.getChallengesByCity);

// POST: Complete a challenge
router.post('/complete',verifyToken, challengeController.completeChallenge);

module.exports = router;