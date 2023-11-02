const getAllTasks = (req, res) => {
  res.send('all Items updated')
}

const createTask = (req, res) => {
  res.json(req.body)
}

const getTask = (req, res) => {
  res.json({ id: req.params.id })
}

const updateTask = (req, res) => {
  res.send('update Tasks Success')
}

const deleteTask = (req, res) => {
  res.send('delete Tasks Successfully')
}

module.exports = { getAllTasks, getTask, createTask, updateTask, deleteTask }
