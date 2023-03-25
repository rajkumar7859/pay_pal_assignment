import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from '../Components/Navbar'
import Home from './Home'
import Login from './Login'
import PrivateRoute from './PrivateRoute'
import SignUp from './SignUp'
import TaskForm from './TaskForm'

const Allroutes = () => {
  return (
    <div>
    <Navbar />
    <Routes>
        <Route path='/' element={ <Home />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/login' element={<Login />} />
        <Route path='/taskform' element={<TaskForm />} />
    </Routes>
    </div>
  )
}

export default Allroutes
