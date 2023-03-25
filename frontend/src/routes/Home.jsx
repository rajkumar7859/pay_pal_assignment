import React, { useEffect, useState } from 'react'

const Home = () => {
    const [tasks, setTasks] = useState([]);
    const [sprintTasks, setSprintTasks] = useState([]);
    const [userTasks, setUserTasks] = useState([]);
    const [sprints, setSprints] = useState([]);
    const [users, setUsers] = useState([]);
  
    const fetchTasks = async () => {
      const res = await fetch("http://localhost:8080/task/get");
      const data = await res.json();
      setTasks(data);
    };
  
    const fetchSprintTasks = async (sprintId) => {
      const res = await fetch(`http://localhost:8080/sprint/${sprintId}/tasks`);
      const data = await res.json();
      setSprintTasks(data);
    };
  
    const fetchUserTasks = async (userId) => {
      const res = await fetch(`/users/${userId}/tasks`);
      const data = await res.json();
      setUserTasks(data);
    };
  
    const fetchSprints = async () => {
      const res = await fetch("/sprints");
      const data = await res.json();
      setSprints(data);
    };
  
    // const fetchUsers = async () => {
    //   const res = await fetch("/users");
    //   const data = await res.json();
    //   setUsers(data);
    // };
  
    useEffect(() => {
      fetchTasks();
      fetchSprints();
    //   fetchUsers();
    }, []);
  
    const handleCreateTask = async (title, description, type, assignee, sprint) => {
      const res = await fetch("/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description, type, assignee, sprint }),
      });
      const data = await res.json();
      setTasks([...tasks, data]);
    };
  
    const handleUpdateTask = async (taskId, title, description, type, assignee, status) => {
      const res = await fetch(`/tasks/${taskId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description, type, assignee, status }),
      });
      const data = await res.json();
      setTasks(tasks.map((task) => (task._id === taskId ? data : task)));
    };



  return (
    <div className="max-w-screen-lg mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Task Management System</h1>

      <div className="mb-4">
        <h2 className="text-2xl font-bold mb-2">All Tasks</h2>
        <ul className="list-disc ml-8">
          {tasks.map((task) => (
            <li key={task._id}>
              {task.title} - {task.description}{task.type} - {task.assignee} - {task.status}
</li>
))}
</ul>
</div>

php
Copy code
<div className="mb-4">
  <h2 className="text-2xl font-bold mb-2">Tasks for Sprint</h2>
  <select className="mb-2" onChange={(e) => fetchSprintTasks(e.target.value)}>
    <option value="">Select a Sprint</option>
    {sprints.map((sprint) => (
      <option key={sprint._id} value={sprint._id}>
        {sprint.title}
      </option>
    ))}
  </select>
  <ul className="list-disc ml-8">
    {/* map through the sprint tasks state instead of tasks */}
    {sprintTasks.map((task) => (
      <li key={task._id}>
        {task.title} - {task.description} - {task.type} - {task.assignee} - {task.status}
      </li>
    ))}
  </ul>
</div>

<div className="mb-4">
  <h2 className="text-2xl font-bold mb-2">Tasks for User</h2>
  <select className="mb-2" onChange={(e) => fetchUserTasks(e.target.value)}>
    <option value="">Select a User</option>
    {users.map((user) => (
      <option key={user._id} value={user._id}>
        {user.name}
      </option>
    ))}
  </select>
  <ul className="list-disc ml-8">
    {/* map through the user tasks state instead of tasks */}
    {userTasks.map((task) => (
      <li key={task._id}>
        {task.title} - {task.description} - {task.type} - {task.assignee} - {task.status}
      </li>
    ))}
  </ul>
</div>

<div className="mb-4">
  <h2 className="text-2xl font-bold mb-2">Create Task</h2>
  <form >
    <div className="flex flex-col mb-2">
      <label htmlFor="title" className="mb-1 font-bold">
        Title
      </label>
      <input type="text" name="title" id="title" className="border py-2 px-3 text-grey-800" required />
    </div>

    <div className="flex flex-col mb-2">
      <label htmlFor="description" className="mb-1 font-bold">
        Description
      </label>
      <textarea name="description" id="description" className="border py-2 px-3 text-grey-800" required />
    </div>

    <div className="flex flex-col mb-2">
      <label htmlFor="type" className="mb-1 font-bold">
        Type
      </label>
      <input type="text" name="type" id="type" className="border py-2 px-3 text-grey-800" required />
    </div>

    <div className="flex flex-col mb-2">
      <label htmlFor="assignee" className="mb-1 font-bold">
        Assignee
      </label>
      <select name="assignee  continue code from here
">
<option value="">Select Assignee</option>
{users.map((user) => (
<option key={user._id} value={user._id}>
{user.name}
</option>
))}
</select>
</div>
</form>
</div>
</div>
  )
}
export default Home
