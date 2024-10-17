// index.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const imageRoutes = require('./routes/image');
const userProfileRoutes = require('./routes/userProfile');
const locationRoutes = require('./routes/hiddenLocations');
const quizRoutes = require('./routes/quiz');
const challengeRoutes = require('./routes/challenges');
const leaderboardRoutes = require('./routes/leaderboard');
const blogRoutes = require('./routes/blog');

dotenv.config();

const app = express();

// Middleware
const cors = require('cors');
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
app.use('/api/auth', authRoutes);
// Image similarity route
app.use('/api/image', imageRoutes);
app.use('/api/user', userProfileRoutes);
app.use('/api/locations', locationRoutes);
app.use('/api/quiz', quizRoutes);
app.use('/api/challenge', challengeRoutes);
app.use('/api/leaderboard', leaderboardRoutes);
app.use('/api/blog', blogRoutes);


// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log("MongoDB connected"))
.catch(err => console.error(err));

app.get('/', (req, res) => {
  res.send('TravelHunt Backend');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// module.exports = app;
