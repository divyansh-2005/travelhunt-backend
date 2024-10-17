// routes/userProfile.js
const express = require('express');
const User = require('../models/User');
const { verifyToken } = require('../middleware/auth');
const { getUserProfile, updateUserProfile } = require('../controllers/userController');

const router = express.Router();

// Get user profile
router.get('/profile', verifyToken, getUserProfile);
router.put('/update', verifyToken, updateUserProfile);
module.exports = router;
