require('dotenv').config();
const express = require('express')
const cors = require('cors')
const connectDB = require('./config/db')
const app = express()
const port = process.env.PORT || 5000

connectDB()

app.use(cors({ origin: 'http://localhost:5173' }))
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
