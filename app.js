require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const mainRouter = require('./routes/index');
const { logIn, createUser } = require('./controllers/users');
const userRoutes = require('./routes/users');
const errorHandler = require('./middlewares/errorHandler');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();

const { PORT = 3001 } = process.env;

app.use(cors());


mongoose
.connect('mongodb://127.0.0.1:27017/wtwr_db')
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((err) => {
  console.error(err);
});

app.use(express.json());

app.use('/', userRoutes);

//app.use("/", mainRouter);

//crash test route
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Server will crash now');
  }, 0);
});

// Middleware for logging requests
app.use(requestLogger);

const routes = require('./routes');
app.use(routes);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Middleware for logging errors
app.use(errorLogger);

// celebrate error handling
app.use(errors());

// error handling middleware
app.use(errorHandler);