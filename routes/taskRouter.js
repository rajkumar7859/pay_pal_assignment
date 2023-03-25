const express = require("express");
const { createUser, createTask,loginUser, getAllTasks, getTaskById, updateTaskById, getTasksForSprint, getTasksForUser, createSprint } = require("../controllers/task.controller");
const router = express.Router();


router.post("/signup", createUser);
router.post("/login" , loginUser)
router.post("/new", createTask);
router.get("/get", getAllTasks);
router.get("/:id", getTaskById);
router.put("/update/:id", updateTaskById);
router.get("/users/:id/tasks", getTasksForSprint);
router.get("/sprints/:id/tasks", getTasksForUser);
router.post("/create/new", createSprint);

module.exports = router;