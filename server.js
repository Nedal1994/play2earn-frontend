// server.js

const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');

const authRoutes = require('./src/routes/authRoutes');
const taskRoutes = require('./src/routes/taskRoutes');
const followTaskRoutes = require('./src/routes/followTaskRoutes'); // New route
const adminRoutes = require('./src/routes/adminRoutes');
const userRoutes = require('./src/routes/userRoutes');
const surveyRoutes = require('./src/routes/surveyRoutes');

dotenv.config();

const server = express();

// CORS Configuration
server.use(cors({
    origin: 'http://localhost:5003',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type'],
}));

// Middleware
server.use(bodyParser.json());

// Routes
server.use('/api/auth', authRoutes);
server.use('/api/tasks', taskRoutes);
server.use('/api/follow-tasks', followTaskRoutes); // New route
server.use('/api/admin', adminRoutes);
server.use('/api/users', userRoutes);
server.use('/api/surveys', surveyRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('Connected to MongoDB');
})
.catch(err => {
    console.error('Error connecting to MongoDB', err);
});

// Server setup
const PORT = process.env.PORT || 5001;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));