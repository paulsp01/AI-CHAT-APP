import React from 'react'
import { Route,BrowserRouter,Routes } from 'react-router-dom'
import Login from '../screens/login'
import Register from '../screens/Register'
import Home from '../screens/Home'

const AppRoutes = () => {
  return (
    <div>
        <BrowserRouter>
       <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
       
       </Routes>
        </BrowserRouter>
    </div>
  )
}

export default AppRoutes