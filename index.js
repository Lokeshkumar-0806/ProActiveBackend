require('dotenv').config();
const express = require('express')
const cors = require('cors')
const connectDB = require('./config/db')
const app = express()
const port = process.env.PORT || 5000

connectDB()

// CORS configuration - Allow all origins
app.use(cors({ 
  origin: true,
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

// Export for serverless platforms (Vercel)
module.exports = app;

// Start server (required for Render and local development)
app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
