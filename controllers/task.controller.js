const Sprint = require("../model/SprintSchema");
const Task = require("../model/TaskSchema");


const createTask = async (req, res) => {
  try {
    const { title, description, type, assignee, sprint } = req.body;
    const task = new Task({ title, description, type, assignee, sprint });
    await task.save();
    res.status(200).json(task);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

const getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ msg: "Task not found" });
    }
    res.json(task);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

const updateTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ msg: "Task not found" });
    }
    const { title, description, type, assignee, status } = req.body;
    task.title = title || task.title;
    task.description = description || task.description;
    task.type = type || task.type;
    task.assignee = assignee || task.assignee;
    task.status = status || task.status;
    await task.save();
    res.json(task);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

const getTasksForSprint = async (req, res) => {
  try {
    const tasks = await Task.find({ sprint: req.params.id });
    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

const getTasksForUser = async (req, res) => {
  try {
    const tasks = await Task.find({ assignee: req.params.id });
    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

const createSprint = async (req, res) => {
  try {
    const { title, description } = req.body;
    const sprint = new Sprint({ title, description });
    await sprint.save();
    res.json(sprint);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

const getSprint = async (req, res) => {
  try {
    const sprint = await Sprint.find();
    if (!sprint || sprint.length === 0) {
      return res.status(404).json({ message: "No sprint found" });
    }
    return res.status(200).json(sprint);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getSprint,
  createTask,
  getAllTasks,
  getTaskById,
  updateTaskById,
  getTasksForSprint,
  getTasksForUser,
  createSprint,
};
