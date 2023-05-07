 import { useEffect } from 'react';
import './App.css';
 import axios from 'axios';

function App() {

  useEffect(()=>{
    axios.get("https://pnr-status-indian-railway.p.rapidapi.com/pnr-check/6719115281",{
      method: 'GET',
      url: 'https://pnr-status-indian-railway.p.rapidapi.com/pnr-check/8531575878',
      headers: {
        'X-RapidAPI-Key': '4fb6eff0admshbdf5ceb06511570p152d5djsne0fb02731d5f',
        'X-RapidAPI-Host': 'pnr-status-indian-railway.p.rapidapi.com'
      }
    })
    .then((res)=>{
      console.log(res)
    }).catch((err)=>{
      console.log(err)
    })
   })

  // useEffect(()=>{
  //   axios.get("https://irctc1.p.rapidapi.com/api/v3/trainBetweenStations",{
  //     method: 'GET',
  //     params: {
  //       fromStationCode: 'BVI',
  //       toStationCode: 'NDLS',
  //       dateOfJourney: '2023-05-03'
  //     },
  //     headers: {
  //       'X-RapidAPI-Key': '4fb6eff0admshbdf5ceb06511570p152d5djsne0fb02731d5f',
  //       'X-RapidAPI-Host': 'irctc1.p.rapidapi.com'
  //     }
  //   })
  //   .then((res)=>{
  //     console.log(res)
  //   }).catch((err)=>{
  //     console.log(err)
  //   })
  //  })


  return (
    <>jbj</>
  )
}

export default App;
