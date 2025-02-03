import { useState } from 'react'
import { Button, Input } from '@mui/material'
import { API } from '../utils/axiosInterceptor'

function Login() {
    const [password, setPassword] = useState<string>('')
    const [username, setUsername] = useState<string>('')
    const [validatePassword, setValidatePassword] = useState<boolean>(true)
    const [validateUsername, setValidateUsername] = useState<boolean>(true)
    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // make API call to login user
        try {
            const data = await API.post('/login', {
                email: username,
                password
            })
            if(data){
                alert('User logged in successfully')
            }
            else{
                alert('User not found')
            }
        } catch (error) {
            alert('Login failed, please try again!')
        }
    }
    const handleGoogleOAuth = () => {
        // make API call to login with google
    }
    const handleGithubOAuth = () => {
        // make API call to login with github
    }
    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
        if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(username)){
            setValidateUsername(false)
        }
        else{
            setValidateUsername(true)
        }
    }
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
        if(password.length < 8){
            setValidatePassword(false)
        }
        else{
            setValidatePassword(true)
        }
    }

  return (
    <div>
        <h1>Login Page</h1>
     <form 
     onSubmit={handleSubmit}
     style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap:'20px', justifyContent: 'center', }}>
    <Input placeholder="Enter your Email" type='email'
    onChange={handleEmailChange}  
    sx={{background:'white', paddingLeft:'20px', width:'100%', display:'flex', height:'50px', justifyContent:'center', color:validateUsername ?' black' :'red'}}/>
    <Input placeholder="Enter your Password"  type='password'
    onChange={handlePasswordChange}
    sx={{background:'white', paddingLeft:'20px', width:'100%', display:'flex', height:'50px', justifyContent:'center', color:validatePassword?'black':'red'}}/>
    <Button variant="contained" color="primary">Login</Button>
    <div style={{display:'flex', gap:'10px'}}>
    <Button variant='outlined' onClick={handleGoogleOAuth}> Login with Google</Button>
    <Button variant='outlined' onClick={handleGithubOAuth}>Login with Github</Button>

    </div>
     </form>
    </div>
  )
}

export default Login
