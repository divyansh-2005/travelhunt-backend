const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quizController');
const { verifyToken } = require('../middleware/auth');

// POST: Create a new quiz
router.post('/', quizController.createQuiz);

// GET: Fetch quizzes by city
router.get('/:city', quizController.getQuizzesByCity);

// GET: Fetch all quizzes
router.get('/', quizController.getAllQuizzes);

router.post('/complete', verifyToken, quizController.completeQuiz);

module.exports = router;