import './styles/Weather.css'
import React from 'react';
import DayCard from './DayCard.js'
class WeekContainer extends React.Component {
  state = {
    fullData: [],
    dailyData: []
  }

  componentDidMount = () => {
    const weatherURL = `http://api.openweathermap.org/data/2.5/forecast?zip=27514&units=imperial&appid=a2dca4995be86d6bc8760239ae5b8713`;

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

  formatDayCards = () => {
    return this.state.dailyData.map((reading, index) => <DayCard reading={reading} key={index} />)
  }

  render() {
    return (
        <div className="container-fluid">
        <div className="jumbotron star" style={{ textAlign: "center" }}>
        <h1 className="display-4">Chapel Hill, NC Forecast</h1>
        <div className="row justify-content-center">
          {this.formatDayCards()}
        </div>
        </div>
    </div>
    )
  }
}

export default WeekContainer;