import React from 'react';
import "../styles/Weather.css";
import "bootstrap/dist/js/bootstrap.min.js";
import DayCard from "../components/DayCard";

const Weather = () => {
    async function getWeather() {
        let response = await fetch('https://api.api.openweathermap.org/data/2.5/weather?q=chapel+hill&appid=a2dca4995be86d6bc8760239ae5b8713');
        let data = await response.json();
        return data;
    }
    
    let state = {
        fullData: [],
        dailyData: []
      }
    
    let componentDidMount = () => {
        const weatherURL =
        `http://api.openweathermap.org/data/2.5/forecast?zip=27514&units=imperial&APPID=a2dca4995be86d6bc8760239ae5b8713`;
    
        fetch(weatherURL)
        .then(res => res.json())
        .then(data => {
          const dailyData = data.list.filter(reading => reading.dt_txt.includes("18:00:00"))
          this.setState({
            fullData: data.list,
            dailyData: dailyData
          }, () => console.log(this.state))
        })
      }
    
      let formatDayCards = () => {
        return this.state.dailyData.map((reading, index) => <DayCard reading={reading} key={index} />)
      }

    return (
        <>
        
        
        <div className="container-fluid">
            <div className="jumbotron star" style={{ textAlign: "center" }}>
            <h1 className="display-4">Chapel Hill, NC </h1>
            <div className="row justify-content-center">{formatDayCards()}
            </div>
            </div>
        </div>
        </>
    )
}

export default Weather;