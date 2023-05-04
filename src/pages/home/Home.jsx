import React from 'react';
import "./Home.css";
import homebg from "../../assests/videos/Homebg2.mp4";
import Button from '@mui/material/Button';

const Home = () => {
  return (
    <div className='home'>
      <video autoPlay loop muted>
        <source src={homebg} type="video/mp4" />
      </video>
      <h2>Fastest And Secure Way To Transfer Your Train Tickets</h2>
      <p>This platform offers you to transfer confirmed tickets form one person to another</p>

      <div className='homebtns'>
          <Button variant="contained" sx={{margin:"0 2rem"}} color="success">Transfer Ticket</Button>
          <Button variant="contained" sx={{margin:"0 2rem"}}>Get Ticket</Button>
      </div>

    </div>
  )
}

export default Home