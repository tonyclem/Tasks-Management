const express = require('express')
const tasks = require('./routes/tasks')

const app = express()

// Middleware
app.use(express.json())

// Routes
app.get('/url', (req, res) => {
  res.send('Task Manager Application')
})
app.use('/api/v1/tasks', tasks)

// Port
const port = 3000

app.listen(port, console.log(`Welcome Server listing at ${port}`))
