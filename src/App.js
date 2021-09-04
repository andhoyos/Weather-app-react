import React from "react";
import { useState } from "react";

const api = {
  key: "f2c5e04d6f84797bbebcc655413efb0b",

  base: "https://api.openweathermap.org/data/2.5/",
};

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});

  const search = (e) => {
    if (e.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then((res) => res.json())
        .then((result) => {
          setWeather(result);
          setQuery("");
          console.log(weather);
        });
    }
  };
  const dateBuilder = () => {
    const dateNow = Date.now();
    const today = new Date(dateNow);

    return today.toDateString();
  };

  return (
    <div
      className={
        typeof weather.main !== "undefined"
          ? weather.main.temp < 16
            ? "app wcold"
            : "app wheat"
          : "app"
      }
    >
      {" "}
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search..."
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {typeof weather.main !== "undefined" ? (
          <div>
            <div className="location-box">
              <div className="location">
                {weather.name}, {weather.sys.country}
              </div>
              <div className="date">{dateBuilder(new Date())}</div>
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
        ) : (
          ""
        )}
      </main>
    </div>
  );
}

export default App;
