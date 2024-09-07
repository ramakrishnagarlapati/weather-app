import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import "./index.css";

const CityRow = ({ city, index }) => {
  const { name: cityName, cou_name_en: countryName, timezone } = city;
  const [currTemp, setCurrTemp] = useState("");
  const [tempMin, setTempMin] = useState("");
  const [tempMax, setTempMax] = useState("");
  const getCityWeather = async () => {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=20de95818dbd788288530360d48f7de4`
    );
    const data = await response.json();
    if (data.cod !== "404") {
      const {
        temp_min: tempMin,
        temp_max: tempMax,
        temp: currTemp,
      } = data.main;
      setCurrTemp(Math.round(currTemp, 0));
      setTempMax(Math.round(tempMax, 0));
      setTempMin(Math.round(tempMin, 0));
    } else {
      setCurrTemp("-");
      setTempMax("-");
      setTempMin("-");
    }
  };
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
      <td>{tempMax && tempMin && `${tempMin}/${tempMax}`}</td>
    </tr>
  );
};

export default CityRow;
