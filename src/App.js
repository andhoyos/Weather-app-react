import React, { useState, useEffect } from "react";

import CardInfo from "./components/CardInfo";

const api = {
  key: "f2c5e04d6f84797bbebcc655413efb0b",

  base: "https://api.openweathermap.org/data/2.5/",
};

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});

  const searchData = (url) => {
    fetch(url)
      .then((res) => res.json())
      .then((result) => {
        setWeather(result);
        setQuery("");
        console.log(weather);
      });
  };

  const search = () => {
    let urlQuery = `${api.base}weather?q=${query}&lang=sp&units=metric&APPID=${api.key}`;
    searchData(urlQuery);
  };

  const searchEnter = (e) => {
    if (e.key === "Enter") {
      return search();
    }
  };

  const geolocation = () => {
    let latitud;
    let longitud;
    navigator.geolocation.getCurrentPosition((data) => {
      latitud = data.coords.latitude;
      longitud = data.coords.longitude;
      let latUrl = `&lat=${latitud}`;
      let longUrl = `&lon=${longitud}`;
      let urlGeo = `${api.base}weather?q=${latUrl}${longUrl}&lang=sp&units=metric&APPID=${api.key}`;
      console.log(data);
      searchData(urlGeo);
    });
  };

  const dateBuilder = () => {
    const dateNow = Date.now();
    const today = new Date(dateNow);

    return today.toDateString();
  };

  useEffect(() => {
    let prueba = setTimeout(geolocation, 1000);

    return () => clearTimeout(prueba);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
            onKeyPress={searchEnter}
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
