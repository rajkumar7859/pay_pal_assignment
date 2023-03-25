const express = require("express");
const { createUser, createTask, getAllTasks, getTaskById, updateTaskById, getTasksForSprint, getTasksForUser, createSprint } = require("../controllers/task.controller");
const router = express.Router();


router.post("/new", createUser);
router.post("/new", createTask);
router.get("/get", getAllTasks);
router.get("/:id", getTaskById);
router.put("/update/:id", updateTaskById);
router.get("/:id/tasks", getTasksForSprint);
router.get("/:id/tasks", getTasksForUser);
router.post("/new", createSprint);

module.exports = router;
