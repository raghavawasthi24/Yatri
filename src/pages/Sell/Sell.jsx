import React, { useState } from 'react';
import "./Sell.css";
import { Button, Checkbox, TextField } from '@mui/material';
import axios from 'axios';

const Sell = () => {

  let ticketInfo = {
    trainNo: "",
    trainName: "",
    boardingTime: "",
    boardingCode: "",
    boardingStation: "",
    boardingDate: "",
    destinationTime: "",
    destinationCode: "",
    destinationStation: "",
    destinationDate: "",
    class: "",
    quota: "",
    fare: "",
  };

  const initialvalues = {
    pnr: ""
  }

  let sellSeats = [];

  const [pnrDetails, setPnrDetails] = useState(initialvalues);
  const [ticketDetails, setTicketDetails] = useState("");
  const [seatInfo, setSeatInfo] = useState([]);
  // const [toggle, setToggle] = useState(true);

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setPnrDetails({ ...pnrDetails, [name]: value })
  }

  const checkPNR = () => {
    axios.get(`https://pnr-status-indian-railway.p.rapidapi.com/pnr-check/${pnrDetails.pnr}`, {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '4fb6eff0admshbdf5ceb06511570p152d5djsne0fb02731d5f',
        'X-RapidAPI-Host': 'pnr-status-indian-railway.p.rapidapi.com'
      }
    })
      .then((res) => {
        console.log(res.data.data)
        ticketInfo.trainNo = res.data.data.trainInfo.trainNo;
        ticketInfo.trainName = res.data.data.trainInfo.name;
        ticketInfo.boardingTime = res.data.data.boardingInfo.arrivalTime;
        ticketInfo.boardingCode = res.data.data.boardingInfo.stationCode;;
        ticketInfo.boardingStation = res.data.data.boardingInfo.stationName;
        ticketInfo.boardingDate = res.data.data.trainInfo.dt;

        ticketInfo.destinationTime = res.data.data.destinationInfo.departureTime;
        ticketInfo.destinationCode = res.data.data.destinationInfo.stationCode;;
        ticketInfo.destinationStation = res.data.data.destinationInfo.stationName;
        ticketInfo.destinationDate = res.data.data.trainInfo.dt;


        // setSeatInfo(res.data.data.passengerInfo);
        setTicketDetails(ticketInfo);

        // console.log(ticketDetails.boardingInfo.stationName);
      }).catch((err) => {
        console.log(err)
      })


    axios.get(`https://real-time-pnr-status-api-for-indian-railways.p.rapidapi.com/indianrail/${pnrDetails.pnr}`, {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '4fb6eff0admshbdf5ceb06511570p152d5djsne0fb02731d5f',
        'X-RapidAPI-Host': 'real-time-pnr-status-api-for-indian-railways.p.rapidapi.com'
      }
    }).then((res) => {
      console.log(res.data)
      // ticketInfo.trainNo = res.data.trainNumber;
      // ticketInfo.trainName = res.data.trainName;
      // ticketInfo.boardingTime = res.data.dateOfJourney;
      // ticketInfo.boardingCode = res.data.boardingPoint;;
      // // ticketInfo.boardingStation = res.data.data.boardingInfo.stationName;
      // // ticketInfo.boardingDate = res.data.data.trainInfo.dt;

      // ticketInfo.destinationTime = res.data.data.destinationInfo.departureTime;
      // ticketInfo.destinationCode = res.data.data.destinationInfo.stationCode;;
      // ticketInfo.destinationStation = res.data.data.destinationInfo.stationName;
      // ticketInfo.destinationDate = res.data.data.trainInfo.dt;
      ticketInfo.class = res.data.journeyClass;
      ticketInfo.quota = res.data.quota;
      ticketInfo.fare = res.data.ticketFare;
      setSeatInfo(res.data.passengerList);

      setTicketDetails(ticketInfo);
      console.log(seatInfo);
      console.log(ticketDetails)
    }).catch((err) => {
      console.log(err);
    })



  }




  const confirm = (e,passengerNo,coach, berth,berthCode) => {
    if(e.target.checked){
    sellSeats.push({
      passengerNo:passengerNo,
      coach: coach,
      berth: berth,
      berthCode:berthCode,
    })
  }
  else{
    const itemToBeRemoved={passengerNo:passengerNo,coach: coach,berth: berth,berthCode:berthCode}
    sellSeats.splice(sellSeats.findIndex(a => a.passengerNo === itemToBeRemoved.passengerNo), 1)
  }
    console.log(sellSeats);
  }




  return (
    <div className='sell'>
      <div>
        <div className='pnr'>
          <div className='pnrStatus'>
            {/* <p>Enter PNR No</p> */}
            <TextField value={pnrDetails.pnr} onChange={inputHandler} name="pnr" label="Enter PNR Number" placeholder='Your 10 digit PNR Number'
              sx={{ width: "90%" }} />
            <Button variant='contained' color="success" onClick={checkPNR}
              sx={{ marginTop: "2rem" }}>Continue</Button>
          </div>
        </div>

        <div>
          <div className='trainInfo'>
            <p>({ticketDetails.trainNo}){ticketDetails.trainName}</p>
            <Button variant='outlined'>Confirm</Button>
          </div>
          <div className='stationInfo'>
            <div>
              <p>{ticketDetails.boardingStation}({ticketDetails.boardingCode})</p>
              <p>{ticketDetails.boardingTime}</p>
              <p>{ticketDetails.boardingDate}</p>
              {/* <p>Status : {ticketDetails.}</p> */}
            </div>
            <p>--------------</p>
            <div>
              <p>{ticketDetails.destinationStation}({ticketDetails.destinationCode})</p>
              <p>{ticketDetails.destinationTime}</p>
              <p>{ticketDetails.destinationDate}</p>
            </div>
          </div>

          {
            seatInfo.map((val) => {
              return (
                <div className='seatInfo'>
                  <div className="seatPassengerInfo">
                    <p>Passenger : {val.passengerSerialNumber}</p>
                  </div>
                  <div className="seatPassengerInfo">
                    <p>Coach : {val.bookingCoachId}</p>
                    <p>Berth : {val.bookingBerthNo}</p>
                    <p>Berth Type : {val.bookingBerthCode}</p>
                  </div>
                  {/* <Button className={toggle ? "select" : "hide"} variant='contained' color="success" onClick={e => { confirm(val.currentCoach, val.currentBerthNo)}}>Select</Button> */}
                  <div className="seatPassengerInfo">
                    <p>Status : {val.currentStatus}</p>
                    <div>
                      <Checkbox onChange={e=>{confirm(e,val.passengerSerialNumber,val.bookingCoachId,val.bookingBerthNo,val.bookingBerthCode)}}/>
                    </div>
                  </div>
                 
                </div>
              )
            })
          }

        </div>

      </div>
    </div>
  )
}

export default Sell