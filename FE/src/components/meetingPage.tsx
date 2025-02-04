import React from 'react'
import '../App.css'
import { Button, Input } from '@mui/material'

function MeetingPage() {
  return (
    <div className='main-container' style={{border: '1px solid white', display: 'grid', gridTemplateColumns: '7fr 3fr', }}>
        <div className='video-container'
        style={{border: '1px solid white', width: '800px', height: '550px', margin: 0}}>
        </div>
        <div className='chat-container'
        style={{border: '1px solid white', display:'grid', gridTemplateRows: '9fr 1fr', }}>
            <div className='conversation-history'>
                
            </div>
            <div className='chat-input' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', border: '1px solid white', gap: '10px'}}>
                <Input type='text' placeholder='Type a message' sx={{background:'white', marginLeft:'10px', paddingLeft:'10px'}} />
                <Button variant='contained'>Send</Button>
                </div>
        </div>
    </div>
  )
}

export default MeetingPage
