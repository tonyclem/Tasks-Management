const Task = require('../models/task')
const asyncWrapper = require('../middleware/async')
const { createCustomError } = require('../error/cutom-error')

const getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find({})
  // res.status(200).json({ tasks })
  // res.status(200).json({ tasks, amount: tasks.length })
  res
    .status(200)
    .json({ status: 'success', data: { tasks, amount: tasks.length } })
})

const createTask = asyncWrapper(async (req, res) => {
  const task = await Task.create(req.body)
  res.status(201).json({ task })
})

const getTask = async (req, res, next) => {
  try {
    const { id: taskID } = req.params
    const task = await Task.findById({ _id: taskID })

    if (!task) {
      return next(createCustomError(`No task with id ${taskID}`, 404))
      // return res.status(404).json({ msg: `Task not found with id: ${taskID}` })
    }
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
      return next(createCustomError(`No task with id ${taskID}`, 404))
      // return res.status(404).json({ msg: `Task not found with id: ${taskID}` })
    }
    res.status(200).json({ task, msg: 'Task deleted successfully' })
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

    if (!task) {
      return next(createCustomError(`No task with id : ${taskID}`, 404))
    }

    res.status(200).json({ task })
  } catch (error) {
    res.status(500).json({ msg: error.message })
  }
}

// const editTask = async (req, res) => {
//   try {
//     const { id: taskID } = await req.params
//     const task = await Task.findByIdAndUpdate({ _id: taskID }, req.body, {
//       new: true,
//       runValidators: true,
//       overwrite: true,
//     })
//     res.status(200).json({ task })
//   } catch (error) {
//     res.status(500).json({ msg: error.message })
//   }
// }

module.exports = {
  getAllTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
}
