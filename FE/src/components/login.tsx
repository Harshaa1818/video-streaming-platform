import React from 'react'
import Box from '@mui/material/Box'
import { Button, Input } from '@mui/material'

function Login() {
  return (
    <div>
        <h1>Login Page</h1>
     <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap:'20px', justifyContent: 'center', }}>
    <Input placeholder="Enter your Username"  sx={{background:'white', paddingLeft:'20px', width:'100%', display:'flex', height:'50px', justifyContent:'center'}}/>
    <Input placeholder="Enter your Password"  sx={{background:'white', paddingLeft:'20px', width:'100%', display:'flex', height:'50px', justifyContent:'center'}}/>
    <Button variant="contained" color="primary">Login</Button>
    <div style={{display:'flex', gap:'10px'}}>
    <Button variant='outlined'> Login with Google</Button>
    <Button variant='outlined'>Login with Github</Button>

    </div>
     </Box>
    </div>
  )
}

export default Login
