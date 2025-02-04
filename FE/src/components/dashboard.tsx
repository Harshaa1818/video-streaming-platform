import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/auth";
import { useEffect } from "react";
import '../app.css'
import zoomImage from '../assets/zoomImage.png'
import zoomJoin from '../assets/zoomJoin.png'
import { v4 as uuid } from 'uuid'
const Dashboard = () => {
    const isAuthenticated = useAuth()
    const navigate = useNavigate();

    useEffect(() => {
 

  if (!isAuthenticated) {
    
    navigate("/login");
  }
}, []);

const handleNewMeeting = () => {
   const meetingId = uuid();
    navigate(`/meeting/${meetingId}`);
}
const handleJoinMeeting = () => {
    navigate('/meeting')
}

  return (
  <div style={{display: 'flex',  alignItems: 'center', justifyContent: 'space-between', width:'50vw' }}>
     <div className="image-container" onClick={handleNewMeeting}>
      <img src={zoomImage} alt="meeting" />
      <span className="hover-text">Start New Meeting</span>
    </div>
    <div className="image-container" onClick={handleJoinMeeting}>
      <img src={zoomJoin} alt="meeting" />
      <span className="hover-text">Join a Meeting</span>
    </div>
    
    </div>
  );
};

export default Dashboard;
