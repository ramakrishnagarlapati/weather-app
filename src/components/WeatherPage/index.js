import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Forecast from "../Forecast";
import LoaderComponent from "../Loader";
import { apiStatusConstants } from "../../constants";
import "./index.css";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const WeatherPage = () => {
  const { cityName } = useParams(); // Retrieve the city name from URL parameters

  // State for holding current city weather, forecast data, and API status
  const [cityWeather, setCityWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial);

  // Function to fetch current weather and forecast data
  const getCityCurrentWeatherAndForecast = async () => {
    setApiStatus(apiStatusConstants.inProgress); // Set API status to in-progress

    // Fetch current weather and forecast data
    const currentWeatherResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=20de95818dbd788288530360d48f7de4`
    );
    const forecastResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?cnt=6&q=${cityName}&units=metric&appid=20de95818dbd788288530360d48f7de4&units=metric`
    );
    // Check if both responses are OK
    if (currentWeatherResponse.ok && forecastResponse.ok) {
      const currentWeatherData = await currentWeatherResponse.json();
      const forecastData = await forecastResponse.json();

      // Update state with fetched data
      setForecast(forecastData.list);
      setCityWeather(currentWeatherData);
      // Set API status to success
      setApiStatus(apiStatusConstants.success);
    } else {
      // Set API status to failure on error
      setApiStatus(apiStatusConstants.failure);
    }
  };

  // Fetch weather and forecast data when the component mounts
  useEffect(() => {
    getCityCurrentWeatherAndForecast();
  }, []);

  // Function to render the failure view
  const renderFailureView = () => {
    return (
      <div className="failure-view">
        <img
          src="https://assets.ccbp.in/frontend/react-js/not-found-blog-img.png"
          className="failure-image"
          alt="not found"
        />
        <h2 className="failure-heading">Oops! Something went wrong.</h2>
        <p className="failure-description">
          We cannot seem to find the city you are looking for.
        </p>
        <Link to="/" className="failure-back-button">
          Back
        </Link>
      </div>
    );
  };

  // Function to render city weather information
  const renderCityWeather = () => {
    const { weather, main, name, wind } = cityWeather;
    const { description, icon } = weather[0];

    return (
      <div className="current-and-forecast-wrapper">
        <div className="current-weather-container">
          <div className="top">
            <div>
              <p className="city-name">{name}</p>
              <p className="weather-desc">{description}</p>
              <p className="temperature">{Math.round(main.temp)}°C</p>
            </div>

            <img
              src={`../icons/${icon}.png`}
              alt="weather"
              className="weather-icon"
            />
          </div>
          <div className="bottom">
            <div className="label-value-wrapper">
              <span className="label label-bold">Details</span>
            </div>
            <div className="label-value-wrapper">
              <span className="label">Feels Like</span>
              <span className="value">{Math.round(main.feels_like)}°C</span>
            </div>
            <div className="label-value-wrapper">
              <span className="label">Wind</span>
              <span className="value">{wind.speed} m/s</span>
            </div>
            <div className="label-value-wrapper">
              <span className="label">Humidity</span>
              <span className="value">{main.humidity}%</span>
            </div>
            <div className="label-value-wrapper">
              <span className="label">Pressure</span>
              <span className="value">{main.pressure} hPa</span>
            </div>
          </div>
        </div>
        <div className="forecast-container">
          <Forecast forecast={forecast} />
        </div>
      </div>
    );
  };

  // Function to render the appropriate view based on the API status
  const rederViewBasedOnApiStatus = () => {
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        // Render a loader while the API call is in progress
        return <LoaderComponent />;
      case apiStatusConstants.success:
        // Render the blog posts if the API call is successful
        return renderCityWeather();
      case apiStatusConstants.failure:
        // Render the failure view if the API call fails
        return renderFailureView();
      default:
        return null;
    }
  };

  return (
    <div className="city-weather-bg-container">
      <div className="city-weather-container">
        {rederViewBasedOnApiStatus()}
      </div>
    </div>
  );
};

export default WeatherPage;
