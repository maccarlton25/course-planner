import React from 'react';
import Moment from 'react-moment';

const DayCard = (props) => {
  let newDate = new Date();
  const weekday = props.dt * 1000
  newDate.setTime(weekday)

  const imgURL = `owf owf-${props.weather[0].id} owf-5x`

  return (
    <div className="col-sm-2">
      <div className="card">
        <h3 className="card-title">{Moment(newDate).format('dddd')}</h3>
        <p className="text-muted">{Moment(newDate).format('MMMM Do, h:mm a')}</p>
        <i className={imgURL}></i>
        <h2>{Math.round(props.main.temp)} °F</h2>
        <div className="card-body">
          <p className="card-text">{props.weather[0].description}</p>
        </div>
      </div>
    </div>
  )
}

export default DayCard;