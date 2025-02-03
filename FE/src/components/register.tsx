import { Button, Input } from '@mui/material'
import Box from '@mui/material/Box'
import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { API } from '../utils/axiosInterceptor'

function Register() {
    const [confirmPassword, setConfirmPassword] = useState('')
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')
    const [validateConfirmPassword, setValidateConfirmPassword] = useState(true)
    const [validatePassword, setValidatePassword] = useState(true)
    const [validateUsername, setValidateUsername] = useState(true)
    const navigate = useNavigate()

    const handleSubmit = async() => {
    

        // make API call to register user
        const data = await API.post('/register')
        if(data){
            alert('User registered successfully')
            navigate('/login')
        }
        else{
            alert('User already exists')
        }
    }
    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value)
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(username)) {
            setValidateUsername(false)
           
        }
        else{
            setValidateUsername(true)
        }

    }
    const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
        if (password.length < 8 ) {
            setValidatePassword(false)
        }
        else {
            setValidatePassword(true)
        }
    }
    const handleConfirmPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(e.target.value)
        if (password !== confirmPassword) {
            setValidateConfirmPassword(false)
        }
        else {
            setValidateConfirmPassword(true)
        }
    }
  return (
    <div>
        <h1>Register Page</h1>
     <Box 
     sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap:'20px', justifyContent: 'center', }}>
    <Input placeholder="Enter your Email" type='email'
    sx={{background:'white', paddingLeft:'20px', width:'100%', display:'flex', height:'50px', justifyContent:'center', color: validateUsername ? 'black' : 'red'}}
    onChange={handleEmailChange}/>
    <Input placeholder="Enter your Password" type='password' 
    sx={{background:'white', paddingLeft:'20px', width:'100%', display:'flex', height:'50px', justifyContent:'center', color: validatePassword ? 'black' : 'red'}}
    onChange={handlePassword}/>
    <Input placeholder="Confirm your Password" type='password'
    sx={{background:'white', paddingLeft:'20px', width:'100%', display:'flex', height:'50px', justifyContent:'center', color: validateConfirmPassword ? 'black' : 'red'}}
    onChange={handleConfirmPassword} 
    />

    <Button variant="contained" color="primary" onClick={handleSubmit}>Register</Button>
    </Box>
    </div>
    )
  
}

export default Register
