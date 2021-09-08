import React from "react";
import { useState } from "react";

import CardInfo from "./components/CardInfo";

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
          <CardInfo weather={weather} date={dateBuilder} />
        ) : (
          ""
        )}
      </main>
    </div>
  );
}

export default App;
