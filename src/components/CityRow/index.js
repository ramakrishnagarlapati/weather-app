import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import "./index.css";

const CityRow = ({ city, index }) => {
  // Destructure properties from the city object
  const { name: cityName, cou_name_en: countryName, timezone } = city;

  // State variables to hold current temperature and min/max temperatures
  const [currTemp, setCurrTemp] = useState("");
  const [tempMin, setTempMin] = useState("");
  const [tempMax, setTempMax] = useState("");

  // Function to fetch weather data for the city
  const getCityWeather = async () => {
    try {
      // Fetch current weather data from OpenWeatherMap API
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=20de95818dbd788288530360d48f7de4`
      );
      const data = await response.json();

      // Check if the response is valid
      if (data.cod !== "404") {
        // Extract and set temperature values
        const {
          temp_min: tempMin,
          temp_max: tempMax,
          temp: currTemp,
        } = data.main;
        setCurrTemp(String(Math.round(currTemp, 0)) + "°C");
        setTempMax(String(Math.round(tempMin, 0)) + "°C");
        setTempMin(String(Math.round(tempMax, 0)) + "°C");
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
      // Set default values if there's an error during fetch
      setCurrTemp("-");
      setTempMax("-");
      setTempMin("-");
    }
  };

  // Fetch weather data when component mounts
  useEffect(() => {
    getCityWeather();
  }, []);
  return (
    <tr>
      <td>{index + 1}</td>
      <td>
        <Link
          className="city-name-link"
          to={`/weather/${cityName.toLowerCase()}`}
        >
          {cityName}
        </Link>
      </td>
      <td>{countryName}</td>
      <td>{timezone}</td>
      <td>{currTemp}</td>
      <td>{tempMax && tempMin && `${tempMin} / ${tempMax}`}</td>
    </tr>
  );
};

export default CityRow;
