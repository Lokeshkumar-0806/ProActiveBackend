require('dotenv').config();
const express = require('express')
const cors = require('cors')
const connectDB = require('./config/db')
const app = express()
const port = process.env.PORT || 5000

connectDB()

const allowedOrigins = [
  'http://localhost:5173',
  'https://pro-active.vercel.app' // Assuming this is your frontend production URL
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Handle preflight requests
app.options('*', cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World how are you!')
})
app.use('/api', require('./Routes/CreateUsers'))
app.use('/api', require('./Routes/Login'))


app.use('/api', require('./Routes/CreateTask'))
app.use('/api', require('./Routes/CreateTime'))
app.use('/api', require('./Routes/CreateGoal'))

app.use("/api", require("./Routes/aiRoutes"));




  app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
