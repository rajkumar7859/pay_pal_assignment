const express = require("express");
const {createTask, getAllTasks, getTaskById,getSprint, updateTaskById, getTasksForSprint, getTasksForUser, createSprint } = require("../controllers/task.controller");
const { createUser, loginUser, getUser } = require("../controllers/user.controller");
const router = express.Router();


router.post("/signup", createUser);
router.post("/login" , loginUser)
router.get("/get" , getUser)
router.post("/new", createTask);
router.get("/getall", getAllTasks);
router.get("/:id", getTaskById);
router.put("/update/:id", updateTaskById);
router.get("/users/:id/tasks", getTasksForSprint);
router.get("/sprints/:id/tasks", getTasksForUser);
router.post("/create/new", createSprint);
router.get("/sprints", getSprint);

module.exports = router;