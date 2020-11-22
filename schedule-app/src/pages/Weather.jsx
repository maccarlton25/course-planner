import React from 'react';
import "../styles/Weather.css";
import "bootstrap/dist/js/bootstrap.min.js";
import DayCard from '../components/DayCard.jsx';

const Weather = () => {
    
    let state = {
        fullData: [],
        dailyData: []
      }
    
    let getWeather = () => {
        const weatherURL =
        `http://api.openweathermap.org/data/2.5/forecast?zip=27514&appid=a2dca4995be86d6bc8760239ae5b8713`;
    
        fetch(weatherURL)
        .then(res => res.json())
        .then(data => {
          const dailyData = data.list.filter(reading => reading.dt_txt.includes("18:00:00"))
          state.fullData = data.list;
          state.dailyData = dailyData;
          console.log(state);
        })
      }
      getWeather();
      let formatDayCards = () => {
        return state.dailyData.map((reading, index) => <DayCard reading={reading} key={index} />)
      }

    return (
        <>
        
        
        <div className="container-fluid">
            <div className="jumbotron star" style={{ textAlign: "center" }}>
            <h1 className="display-4">Chapel Hill, NC Forecast</h1>
            <div className="row justify-content-center">
              {formatDayCards()}
            </div>
            </div>
        </div>
      
    </>
  )
}

export default Weather;