const express = require('express')
const app = express()
const connectDB = require('./db/connect')
const tasks = require('./routes/tasks')
require('dotenv').config()
const notFound = require('./middleware/not-found')
const errorHanderMiddleware = require('./middleware/error-handler')

// Middleware
app.use(express.json())
app.use(express.static('./public'))

app.use('/api/v1/tasks', tasks)
app.use(notFound)
app.use(errorHanderMiddleware)

// Port
const port = process.env.PORT || 3000

const startServer = async () => {
  try {
    connectDB(process.env.MONGO_URI)
    app.listen(port, console.log(`Welcome Server listing at ${port}`))
  } catch (err) {
    console.log(err)
  }
}

startServer()
