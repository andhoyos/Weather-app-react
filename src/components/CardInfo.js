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
      <div className="weather">
        {weather.weather[0].main}
        <img
          className="imgWeather"
          src={
            weather.weather[0].main === "Clouds"
              ? "https://cdn-icons-png.flaticon.com/512/5118/5118948.png"
              : weather.weather[0].main === "Clear"
              ? "https://cdn-icons-png.flaticon.com/512/1891/1891534.png"
              : "https://cdn-icons-png.flaticon.com/512/2349/2349423.png"
          }
          alt=""
        />
      </div>
      <div className="weather-box">
        <div className="temp">
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
