import React from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Dashboard from './components/dashboard'
import Login from './components/login'
import Register from './components/register'

function App() {
  

  return (
    <>
      <Routes>
      <Route path="/" element={<Dashboard />}/>
      <Route path="/login" element= {<Login/>}/>
      <Route path="/register" element= {<Register/>}/>
      </Routes>

     
    </>
  )
}

export default App
