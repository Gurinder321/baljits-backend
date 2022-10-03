const express = require('express');
const dotenv = require('dotenv').config();
const colors = require('colors');
const connectDB = require('./config/db');
const cors = require('cors');
const Goal = require('./models/goalModel');
const PORT = process.env.PORT;

// connect to DB
connectDB();

const app = express();

app.use(
  cors({
    origin: (origin, cb) => {
      cb(null, true);
    },
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/goals', require('./routes/goalsRoutes'));

app.listen(PORT, () => {
  console.log(`Server is listening on PORT: ${PORT}..`);
});
