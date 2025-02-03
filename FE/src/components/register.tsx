import { Button, Input } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { API } from '../utils/axiosInterceptor'

function Register() {
    const [confirmPassword, setConfirmPassword] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [username, setUsername] = useState<string>('')
    const [validateConfirmPassword, setValidateConfirmPassword] = useState<boolean>(true)
    const [validatePassword, setValidatePassword] = useState<boolean>(true)
    const [validateUsername, setValidateUsername] = useState<boolean>(true)
    const navigate = useNavigate()

    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    
        e.preventDefault();
        // make API call to register user
        try {
            const data = await API.post('/register', {
                email: username,
                password
            })
            if(data){
                alert('User registered successfully')
                navigate('/login')
            }
            else{
                alert('User already exists')
            }
        } catch (error) {
            alert('Registration failed, please try again!')
            
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
     <form onSubmit={handleSubmit} 
     style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap:'20px', justifyContent: 'center', }}>
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

    <Button variant="contained" color="primary" type="submit">Register</Button>
    </form>
    </div>
    )
  
}

export default Register
