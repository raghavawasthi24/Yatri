import React, { useState } from 'react'
import './Buy.css'
import { Button, Checkbox, TextField } from '@mui/material';
import axios from 'axios';

const Buy = () => {
    const [source,setSource] = useState("");
    const [destination,setDestination] = useState("");
    const [date,setDate] = useState("")
    const [trainInfo,settrainInfo] = useState([])
  return (
    <div className='sell-main'>
        <div className="outer-div">
            <p className='main-head-buy'>Indian Railways</p>
            <div className="inner-div">
                <div className='inner-div-flex'>
                <div style={{marginTop:"1rem"}}>
            <TextField name="pnr" label="Source" color="success" placeholder='New Delhi'
              sx={{ width: "20vw" }} size="medium" value={source} onChange={(e) => {
                setSource(e.target.value)
              }}/>
              </div>
              <div style={{marginTop:"1rem"}}>
              <TextField name="pnr" label="Destination" color="success" placeholder='Ghaziabad'
              sx={{ width: "20vw" }} size="medium" value={destination} onChange={(e) => {
                setDestination(e.target.value)
              }}/>
              </div>
              <div style={{marginTop:"1rem"}}>
              <TextField name="pnr" label="Date of Journey" color="success" placeholder='05/05/2003'
              sx={{ width: "20vw" }} size="medium" value={date} onChange={(e) => {
                setDate(e.target.value)
              }}/>
              
              </div>
              </div>
              <button className='search-trains-btn' onClick={() => {
                console.log(source)
                console.log(destination)
                console.log(date)
                axios.get("https://irctc1.p.rapidapi.com/api/v3/trainBetweenStations",{
      method: 'GET',
      params: {
        fromStationCode: source,
        toStationCode: destination,
        dateOfJourney: '2022-08-03'
      },
      headers: {
        'X-RapidAPI-Key': '4fb6eff0admshbdf5ceb06511570p152d5djsne0fb02731d5f',
        'X-RapidAPI-Host': 'irctc1.p.rapidapi.com'
      }
    })
    .then((res)=>{
      console.log(res)
      settrainInfo(res.data)
      console.log(trainInfo)
    }).catch((err)=>{
      console.log(err)
    })
              }} >Search Trains</button>
            </div>
            
        </div>
        <div className="lower-div" style={{marginTop:"2rem"}}>
            <div className="all-trains-info">
                <div className="each-train">
                    <div className="each-train-head">
                        <div className="train-name-num">
                            <p>Gomti Express(12420)</p>
                        </div>
                        <div className="runs-on-info">
                            <p>Runs on : <span style={{color:"green"}}> M T W T F S S </span></p>
                        </div>
                    </div>
                    <div className="each-train-main">
                        <div className="source-info-each-train-main">
                        <p><span style={{fontWeight:"550",fontSize:"1.6rem"}}>06:10</span> | New Delhi</p>
                        </div>
                        <div className="train-taking-time">
                            <div>
                        <hr style={{width:"2rem",marginTop:"0.6rem"}} /></div>
                        <div> <p>9:15</p></div>
                        <div> <hr style={{width:"2rem",marginTop:"0.6rem"}} /></div>
                        </div>
                        <div className="dest-info-each-train-main">
                        <p><span style={{fontWeight:"550",fontSize:"1.6rem"}}>06:10</span> | Ghaziabad</p>
                        </div>
                          
                    </div>
                    <div className="each-train-coach">
                    <div className='coach-head'><p>Sleeper<br />(S)</p></div>
                        <div className='coach-head'><p>AC Chair Car<br />(S)</p></div>
                        <div className='coach-head'><p>Exec. Chair Car<br />(S)</p></div>
                        <div className='coach-head'><p>AC 3 Tier<br />(3AC)</p></div>
                        

                    </div>
                    <div>
                        <button className='get-tickets-btn'>Get Tickets</button>
                    </div>
                </div>
            </div>

        </div>
    </div>
  )
}

export default Buy