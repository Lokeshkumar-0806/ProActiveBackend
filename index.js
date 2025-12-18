require('dotenv').config();
const express = require('express')
const cors = require('cors')
const connectDB = require('./config/db')
const app = express()
const port = process.env.PORT || 5000

connectDB()

// CORS configuration for production and development
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  'https://proactive-frontend.vercel.app', // Add your actual frontend Vercel URL
  process.env.FRONTEND_URL
].filter(Boolean);

app.use(cors({ 
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true
}))
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

// Export for Vercel serverless
module.exports = app;

// Only listen if not in serverless environment
if (process.env.NODE_ENV !== 'production') {
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
}
