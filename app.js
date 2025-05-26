const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const mainRouter = require('./routes/index');
const { logIn, createUser } = require('./controllers/users');
const userRoutes = require('./routes/users');

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

const routes = require('./routes');
app.use(routes);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
