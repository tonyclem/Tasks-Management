const Task = require('../models/task')

const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({})
    res.status(200).json({ tasks })
  } catch (error) {
    res.status(500).json({ msg: error.message })
  }
}

const createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body)
    res.status(201).json({ task })
  } catch (error) {
    res.status(500).json({ msg: error.message })
  }
}

const getTask = async (req, res) => {
  try {
    const { id: taskID } = req.params
    const task = await Task.findById({ _id: taskID })

    if (!task) {
      return res.status(404).json({ msg: `Task not found with id: ${taskID}` })
    }
    res.status(200).json({ task })
  } catch (error) {
    res.status(500).json({ msg: error.message })
  }
}

const updateTask = async (req, res) => {
  try {
    const { id: taskID } = await req.params
    const task = await Task.findByIdAndUpdate({ _id: taskID }, req.body, {
      new: true,
      runValidators: true,
    })
    res.status(200).json({ task })
  } catch (error) {
    res.status(500).json({ msg: error.message })
  }
}

const deleteTask = async (req, res) => {
  try {
    const { id: taskID } = await req.params
    const task = await Task.findByIdAndDelete({ _id: taskID })
    if (!task) {
      return res.status(404).json({ msg: `Task not found with id: ${taskID}` })
    }
    res.status(200).json({ task, msg: 'Task deleted successfully' })
  } catch (error) {
    res.status(500).json({ msg: error.message })
  }
}

module.exports = { getAllTasks, getTask, createTask, updateTask, deleteTask }
