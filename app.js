const express = require('express')
const app = express()
const connectDB = require('./db/connect')
const tasks = require('./routes/tasks')
require('dotenv').config()

// Middleware
app.use(express.json())

// Routes
app.get('/url', (req, res) => {
  res.send('Task Manager Application')
})
app.use('/api/v1/tasks', tasks)

// Port
const port = 3000

const startServer = async () => {
  try {
    connectDB(process.env.MONGO_URI)
    app.listen(port, console.log(`Welcome Server listing at ${port}`))
  } catch (err) {
    console.log(err)
  }
}

startServer()
