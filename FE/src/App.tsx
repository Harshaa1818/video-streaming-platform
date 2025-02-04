import './App.css'
import { Route, Routes } from 'react-router-dom'
import Dashboard from './components/dashboard'
import Login from './components/login'
import Register from './components/register'
import MeetingPage from './components/meetingPage'
import MeetingJoin from './components/meetingJoin'
function App() {
  

  return (
    <>
      <Routes>
      <Route path="/" element={<Dashboard />}/>
      <Route path="/login" element= {<Login/>}/>
      <Route path="/register" element= {<Register/>}/>
      <Route path="meeting/:meetingId" element={<MeetingPage/>}/>
      <Route path="/meeting" element={<MeetingJoin/>}/>
      </Routes>

     
    </>
  )
}

export default App
