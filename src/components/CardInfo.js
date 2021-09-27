import React from "react";

function CardInfo({ weather, date }) {
  return (
    <div>
      <div className="location-box">
        <div className="location">
          {weather.name}, {weather.sys.country}
        </div>
        <div className="date">{date(new Date())}</div>
      </div>

      <div className="weather-box">
        <div className="temp">
          <div className="weather">
            {weather.weather[0].description}
            <img
              className="imgWeather"
              src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`}
              alt=""
            />
          </div>
          {Math.round(weather.main.temp)}°c
          <div className="minMax">
            Min {Math.trunc(weather.main.temp_min)}°c - Max.{""}
            {Math.trunc(weather.main.temp_max)}°c
            <p>Humedad:{weather.main.humidity}%</p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default CardInfo;
