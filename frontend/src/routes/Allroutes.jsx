import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from '../Components/Navbar'
import Home from './Home'
import Login from './Login'
import PrivateRoute from './PrivateRoute'
import SignUp from './SignUp'

const Allroutes = () => {
  return (
    <div>
    <Navbar />
    <Routes>
        <Route path='/' element={ <PrivateRoute><Home /></PrivateRoute> } />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/login' element={<Login />} />
    </Routes>
    </div>
  )
}

export default Allroutes
