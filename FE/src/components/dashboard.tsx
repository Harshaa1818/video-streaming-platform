import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/auth";
import { useEffect } from "react";

const Dashboard = () => {
    const isAuthenticated = useAuth()
    const navigate = useNavigate();
    
    useEffect(() => {
 

  if (!isAuthenticated) {
    
    navigate("/login");
  }
}, []);

  return <div>Welcome to the Dashboard!</div>;
};

export default Dashboard;
