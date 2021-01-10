import React, { useState, useEffect } from "react";
import axios from "axios";

const Country = ({ data }) => {
  const [weatherData, setWeatherData] = useState(undefined);
  const { name, capital, population, languages, flag } = data;
  const displayLanguages = languages.map((item) => {
    return <li key={item.name}>{item.name}</li>;
  });

  useEffect(() => {
    const API_KEY = process.env.REACT_APP_API_KEY;
    const _query = capital;
    console.log(API_KEY);
    axios
      .get("http://api.weatherstack.com/current", {
        params: { access_key: API_KEY, query: _query },
      })
      .then((response) => {
        if (!response.data.error) {
          console.log(response);
          setWeatherData(response.data);
        } else {
          console.log(
            "error",
            response.data.error.code,
            response.data.error.info,
            "url used:",
            response.config.url
          );
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  }, [capital]);

  console.log(weatherData);

  return (
    <div className="country">
      <h2>{name}</h2>
      <p>capital {capital}</p>
      <p>population {population}</p>
      <h3>languages</h3>
      <ul>{displayLanguages}</ul>
      <img src={flag} alt="The country's flag" width="200" height="150" />
      <h3>Weather in {capital}</h3>
      {weatherData !== undefined && (
        <>
          <p>temperature: {weatherData.current.temperature} C</p>
          <img
            src={weatherData.current.weather_icons[0]}
            alt="Current Weather"
          />
          <p>
            wind: {weatherData.current.wind_speed}km/h direction:{" "}
            {weatherData.current.wind_dir}
          </p>
        </>
      )}
    </div>
  );
};

export default Country;
