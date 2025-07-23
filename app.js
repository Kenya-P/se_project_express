require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { errors } = require('celebrate');
const errorHandler = require('./middlewares/errorHandler');
const userRoutes = require('./routes/users');
const mainRoutes = require('./routes');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();
const { PORT = 3001 } = process.env;

const allowedOrigins = [
  'https://www.wtwr-kenya.crabdance.com',
  'https://wtwr-kenya.crabdance.com',
  'http://localhost:3000', // local dev
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));

app.use(express.json());

// Logger: BEFORE routes
app.use(requestLogger);

// DB connect
mongoose.connect('mongodb://127.0.0.1:27017/wtwr_db')
  .then(() => console.log('Connected to MongoDB'))
  .catch(console.error);

// Crash test
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Server will crash now');
  }, 0);
});

// Mount signup/signin/user routes at root
app.use('/', userRoutes);

// Mount general app routes (items, 404, etc.)
app.use(mainRoutes);

// Error logger: AFTER routes
app.use(errorLogger);

// Celebrate validation errors
app.use(errors());

// Centralized error handler
app.use(errorHandler);

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});

