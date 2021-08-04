import { useState } from "react";

import "./App.css";

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
        typeof weather.main != "undefined"
          ? weather.main.temp < 16
            ? "app warn"
            : "app"
          : "app  warn"
      }
    >
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
        {typeof weather.main != "undefined" ? (
          <div>
            <div className="location-box">
              <div className="location">
                {weather.name}, {weather.sys.country}
              </div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div className="weather-box">
              <div className="temp">{Math.round(weather.main.temp)}°c</div>
              <div>
                Min {Math.trunc(weather.main.temp_min)}°c Max.{" "}
                {Math.trunc(weather.main.temp_max)}°c
              </div>
              <div className="weather" traslate="yes">
                {weather.weather[0].main}
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
