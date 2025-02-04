import { Button, Input } from "@mui/material";
import { useState } from "react";
import { API } from "../utils/axiosInterceptor";
import { useParams, useNavigate } from "react-router-dom";

function MeetingJoin() {

    const [meetingId, setMeetingId] = useState<string>('')
    const [name, setName] = useState<string>('')

    const navigate = useNavigate()

    const handleJoinMeeting = async() => {
        // make API call to join meeting
       try {
         const data = await API.get(`/meeting/${meetingId}`)
         if(data){
            
           
             navigate(`/meeting/${meetingId}`)
 
         }
         else{
             alert('Meeting not found')
         }
       } catch (error) {
           alert('Meeting not found')
        
       }
    }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "20px",
        justifyContent: "center",
      }}
    >
      <Input
        placeholder="Enter Meeting ID"
        type="text"
        onChange={(e) => setMeetingId(e.target.value)}
        sx={{
          background: "white",
          paddingLeft: "20px",
          width: "100%",
          display: "flex",
          height: "50px",
          justifyContent: "center",
        }}
      />
      <Input
        placeholder="Enter your Name"
        type="text"
        onChange={(e) => setName(e.target.value)}
        sx={{
          background: "white",
          paddingLeft: "20px",
          width: "100%",
          display: "flex",
          height: "50px",
          justifyContent: "center",
        }}
      />
      <Button variant="contained" color="primary" onClick={handleJoinMeeting}>
        Join Meeting
      </Button>
    </div>
  );
}

export default MeetingJoin;
