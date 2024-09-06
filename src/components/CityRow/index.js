import React from "react";
import { Link } from "react-router-dom";

import "./index.css";

const CityRow = ({ city }) => {
  const { name: cityName, cou_name_en: countryName, timezone } = city;

  return (
    <tr>
      <td>
        <Link to={`/weather/${cityName.toLowerCase()}`}>{cityName}</Link>
      </td>
      <td>{countryName}</td>
      <td>{timezone}</td>
    </tr>
  );
};

export default CityRow;
