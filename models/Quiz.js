const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
  questionText: { type: String, required: true },
  options: [{ type: String, required: true }],
  correctAnswer: { type: String, required: true }
});

const QuizSchema = new Schema({
  title: { type: String, required: true },
  city: { type: String, required: true },
  points: { type: Number, required: true },
  questions: [QuestionSchema]
});

const Quiz = mongoose.model('Quiz', QuizSchema);
module.exports = Quiz;
