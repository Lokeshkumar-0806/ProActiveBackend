require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();

connectDB();

app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://pro-active.vercel.app'
  ],
  credentials: true
}));

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Backend running on Vercel');
});

app.use('/api', require('./Routes/CreateUsers'));
app.use('/api', require('./Routes/Login'));
app.use('/api', require('./Routes/CreateTask'));
app.use('/api', require('./Routes/CreateTime'));
app.use('/api', require('./Routes/CreateGoal'));
app.use('/api', require('./Routes/aiRoutes'));

// ✅ REQUIRED for Vercel
module.exports = app;
