require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');;

const app = express();

// ✅ Connect DB (safe in Vercel)
connectDB();

// ✅ Allowed origins
const allowedOrigins = [
  'http://localhost:5173',
  'https://pro-active.vercel.app'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// ✅ Routes
app.get('/', (req, res) => {
  res.send('Hello World how are you!');
});

app.use('/api', require('../Routes/CreateUsers'));
app.use('/api', require('../Routes/Login'));
app.use('/api', require('../Routes/CreateTask'));
app.use('/api', require('../Routes/CreateTime'));
app.use('/api', require('../Routes/CreateGoal'));
app.use('/api', require('../Routes/aiRoutes'));

// ❌ REMOVE app.listen()
// ✅ EXPORT app for Vercel
module.exports = app;
