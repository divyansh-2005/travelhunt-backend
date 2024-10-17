const Quiz = require('../models/Quiz');
const User = require('../models/User');

// Create a new quiz
const createQuiz = async (req, res) => {
  try {
    const { title, city, questions } = req.body;

    const newQuiz = new Quiz({
      title,
      city,
      questions
    });

    await newQuiz.save();
    res.status(201).json(newQuiz);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating quiz', error: error.message });
  }
};

// Fetch quizzes by city
const getQuizzesByCity = async (req, res) => {
  try {
    const city = req.params.city;
    const quizzes = await Quiz.find({ city });

    if (quizzes.length === 0) {
      return res.status(404).json({ message: 'No quizzes found for this city' });
    }

    res.status(200).json(quizzes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching quizzes', error: error.message });
  }
};

// Fetch all quizzes
const getAllQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find({});

    if (quizzes.length === 0) {
      return res.status(404).json({ message: 'No quizzes found' });
    }

    res.status(200).json(quizzes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching quizzes', error: error.message });
  }
};

// Complete a quiz
const completeQuiz = async (req, res) => {
  try {
    const { quizId, userAnswers } = req.body; // Get quizId and user's answers
    const userId = req.user.id; // Get userId from token

    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    // Calculate the score based on correct answers
    let score = 0;
    quiz.questions.forEach((question, index) => {
      if (userAnswers[index] && userAnswers[index] === question.correctAnswer) {
        score += quiz.points / quiz.questions.length; // Calculate score for each correct answer
      }
    });

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Add to quizAttempts and update total points
    user.quizAttempts.push({
      quizId,
      score,
      completedAt: new Date(),
    });

    user.totalPoints += score;

    await user.save();

    res.status(200).json({
      message: 'Quiz completed successfully',
      score,
      totalPoints: user.totalPoints,
      quizAttempts: user.quizAttempts,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error completing quiz', error: error.message });
  }
};

module.exports = {
  createQuiz,
  getQuizzesByCity,
  getAllQuizzes,
  completeQuiz
};