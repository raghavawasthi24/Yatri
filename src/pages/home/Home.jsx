import React from 'react';
import "./Home.css";
import homebg from "../../assests/videos/Homebg2.mp4";
import Button from '@mui/material/Button';
import {useNavigate} from 'react-router-dom';

const Home = () => {
  const navigate =useNavigate()
  return (
    <div className='home'>
      <video autoPlay loop muted>
        <source src={homebg} type="video/mp4" />
      </video>
      <h2>Fastest And Secure Way To Transfer Your Train Tickets</h2>
      <p>This platform offers you to transfer confirmed tickets form one person to another</p>

      <div className='homebtns'>
          <Button variant="contained" sx={{margin:"0 2rem"}} color="success"
          onClick={()=>navigate("/transferTicket")}>Transfer Ticket</Button>
          <Button variant="contained" sx={{margin:"0 2rem"}} onClick={() => {
            navigate("/buy")
          }}>Get Ticket</Button>
      </div>

    </div>
  )
}

export default Home