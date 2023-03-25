import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {CgClose} from "react-icons/cg"



const TaskForm = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("feature");
  const [assignee, setAssignee] = useState("");
  const [sprint, setSprint] = useState([]);
  const [status, setStatus] = useState("todo");
  const [selectedTask, setSelectedTask] = useState(null);
  const [users, setUsers] = useState([]);
  const [openModal , setOpenModal] =useState(false)

  useEffect(() => {
    getAllTasks();
    getAllUsers();
    getAllSprints()
  }, []);

  

  const getAllTasks = async () => {
    try {
      const res = await axios.get("http://localhost:8080/task/getall");
      setTasks(res.data);
      console.log("tase",res.data)
    } catch (error) {
      console.error(error);
    }
  };
  const getAllSprints = async () => {
    try {
      const res = await axios.get("http://localhost:8080/sprint/sprints");
      setSprint(res.data);
      console.log("sprint",res.data)
    } catch (error) {
      console.error(error);
    }
  };

  const getAllUsers = async () => {
    try {
      const res = await axios.get("http://localhost:8080/user/get");
      setUsers(res.data);
      console.log("getUser" , res.data)
    } catch (error) {
      console.error(error);
    }
  };

  const createTask = async () => {
    try {
      const res = await axios.post("http://localhost:8080/task/new", {
        title,
        description,
        type,
        assignee,
        sprint,
        status,
      });
      setTasks([...tasks, res.data]);
      setTitle("");
      setDescription("");
      setType("feature");
      setAssignee("");
      setSprint("");
      setStatus("todo");
      setOpenModal(false)
      alert("Task created successfully")
      console.log("data" , tasks)
    } catch (error) {
      console.error(error);
    }
  };

  const updateTask = async () => {
    try {
      const res = await axios.put(`http://localhost:8080/task/update/${selectedTask._id}`, {
        title,
        description,
        type,
        assignee,
        status: selectedTask.status,
        sprint,
      });
      const updatedTasks = tasks.map((task) =>
        task._id === res.data._id ? res.data : task
      );
      setTasks(updatedTasks);
      setSelectedTask(null);
      setTitle("");
      setDescription("");
      setType("feature");
      setAssignee("");
      setSprint("");
    } catch (error) {
      console.error(error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`/api/tasks/${id}`);
      const filteredTasks = tasks.filter((task) => task._id !== id);
      setTasks(filteredTasks);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (task) => {
    setSelectedTask(task);
    setTitle(task.title);
    setDescription(task.description);
    setType(task.type);
    setAssignee(task.assignee);
    setSprint(task.sprint);
  };

  const handleCancelEdit = () => {
    setSelectedTask(null);
    setTitle("");
    setDescription("");
    setType("feature");
    setAssignee("");
    setSprint("");
  };

  return (
    <div className="container mx-auto">

        <button  onClick={()=>setOpenModal(!openModal)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-blue focus:shadow-outline">Add Task</button>
{
    openModal?(
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
        <div className="relative mx-auto w-[80%] shadow-lg rounded-md">
    <form
        className="bg-white shadow-md rounded m-auto mt-8 px-8 pt-6 pb-8 mb-4"
        onSubmit={(e) => {
            e.preventDefault();
            selectedTask ? updateTask() : createTask();
        }}
      >
        <button className="text-[2rem] ml-[98%]" onClick={()=>setOpenModal(!openModal)}><CgClose /></button>
        <h1 className="text-3xl font-bold  mb-8 ">Task Manager</h1> 
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="title">
            Title
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="title"
            type="text"
            placeholder="Enter task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <div className="mb-4">
            <label htmlFor="type" className="block font-bold mb-2">
              Type
            </label>
            <select
              id="type"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="feature">Feature</option>
              <option value="bug">Bug</option>
              <option value="story">Story</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block font-bold mb-2">
              Description
            </label>
            <textarea
              id="description"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter task description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <div className="mb-4">
            <label htmlFor="status" className="block font-bold mb-2">
              Status
            </label>
            <select
              id="status"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="todo">Todo</option>
              <option value="in-progress">In Progress</option>
              <option value="done">Done</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="sprint" className="block font-bold mb-2">
              Sprint
            </label>
            <select
              id="sprint"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={sprint}
              onChange={(e) => setSprint(e.target.value)}
            >
              {sprint.map((sprint) => (
                <option key={sprint._id} value={sprint._id}>
                  {sprint.title}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="assignee" className="block font-bold mb-2">
            Assignee
          </label>
          <select
            id="assignee"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={assignee}
            onChange={(e) => setAssignee(e.target.value)}
          >
            <option value="">Select assignee</option>
            {users.map((user) => (
              <option key={user._id} value={user._id}>
                {user.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Create Task
          </button>
          <Link

            to="/"
            className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
          >
            Cancel
          </Link>
        </div>
      </form>
      </div>
      </div>
      ):(
        tasks?.map((task)=>
        <div key={task._id}>
            <div className="bg-white shadow-md rounded-lg w-full md:w-1/2 lg:w-1/3 m-4">
      <div className="p-4">
        <h2 className="text-2xl font-bold">{task.title}</h2>
        <p className="text-gray-700 mt-2">{task.description}</p>
      </div>
      <div className="flex justify-end p-4">
        <button
          onClick={"onEdit"}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
        >
          Edit
        </button>
        <button
          onClick={"onDelete"}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Delete
        </button>
      </div>
    </div>
        </div>
        )
      )
}
    </div>
  );
};
export default TaskForm;
