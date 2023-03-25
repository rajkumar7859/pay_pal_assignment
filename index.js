const express = require("express")
const Connect = require("./config/db")
require("dotenv").config()
const app= express()
const createUserRoute=require("./routes/taskRouter")
const createTaskRoute=require("./routes/taskRouter")
const getTaskRoute=require("./routes/taskRouter")
const getTaskByIdRoute=require("./routes/taskRouter")
const updateTaskRoute=require("./routes/taskRouter")
const getTaskSprintRoute=require("./routes/taskRouter")
const getTaskUserRoute=require("./routes/taskRouter")
const getSprintRoute=require("./routes/taskRouter")
const port = process.env.PORT || 3000
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.get("/",(req,res)=>res.send("Hello"))
app.use("/user" , createUserRoute)
app.use("/task" , createTaskRoute, getTaskRoute , getTaskByIdRoute , updateTaskRoute , getTaskSprintRoute ,getTaskUserRoute)
app.use("/sprint" ,getSprintRoute)

app.listen(port , async()=>{
    try {
        await Connect()
        console.log(` server successful running on localhost:${port}`);
    } catch (error) {
        console.log(` server running error ${error.message}`);
    }
})