import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";
import "./index.css";

const Forecast = ({ forecast }) => {
  console.log(forecast);
  return (
    <>
      <label className="title">Forecast for today every three hours</label>
      <Accordion allowZeroExpanded>
        {forecast.map((item, index) => {
          return (
            <AccordionItem key={index}>
              <AccordionItemHeading>
                <AccordionItemButton>
                  <div className="hourly-item">
                    <img
                      src={`../icons/${item.weather[0].icon}.png`}
                      className="icon-small"
                      alt="weather-icon"
                    />
                    <label className="day">
                      {item.dt_txt.split(" ")[1].slice(0, 5)}
                    </label>
                    <label className="desc">
                      {item.weather[0].description}
                    </label>
                    <label className="min-max">
                      {Math.round(item.main.temp_min)}°C |{" "}
                      {Math.round(item.main.temp_max)}°C
                    </label>
                  </div>
                </AccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemPanel>
                <div className="daily-details-grid">
                  <div className="daily-details-grid-item">
                    <label>Pressure:</label>
                    <label>{item.main.pressure} hPa</label>
                  </div>
                  <div className="daily-details-grid-item">
                    <label>Humidity:</label>
                    <label>{item.main.humidity}%</label>
                  </div>
                  <div className="daily-details-grid-item">
                    <label>Clouds:</label>
                    <label>{item.clouds.all}%</label>
                  </div>
                  <div className="daily-details-grid-item">
                    <label>Wind Speed:</label>
                    <label>{item.wind.speed} m/s</label>
                  </div>
                  <div className="daily-details-grid-item">
                    <label>Sea Level:</label>
                    <label>{item.main.sea_level} m</label>
                  </div>
                  <div className="daily-details-grid-item">
                    <label>Feels Like:</label>
                    <label>{Math.round(item.main.feels_like)}°C</label>
                  </div>
                </div>
              </AccordionItemPanel>
            </AccordionItem>
          );
        })}
      </Accordion>
    </>
  );
};

export default Forecast;
