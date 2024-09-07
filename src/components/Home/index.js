import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { AsyncPaginate } from "react-select-async-paginate";
import { useHistory } from "react-router-dom";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";

import CityRow from "../CityRow";
import "./index.css";
import LoaderComponent from "../Loader";

const Home = () => {
  const history = useHistory(); //to handle the navigation between pages
  const [isLoading, setIsLoading] = useState(true); // State for loading status
  const [cities, setCities] = useState([]); // List of cities to display
  const [offset, setOffset] = useState(0); // Offset for fetching cities for infinite scroll
  const [hasMore, setHasMore] = useState(true); // To check if more data is available for infinite scroll

  // State for sorting logic
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "" });

  // Function to fetch cities data for infinite scroll
  const fetchCities = async () => {
    const url = `https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?limit=30&offset=${offset}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      const newCities = data.results;

      // Append new cities to the current list
      setCities([...cities, ...newCities]);
      setOffset(offset + 30); // Increment offset for next fetch

      // If no new cities are fetched, disable further scrolling
      if (newCities.length === 0) {
        setHasMore(false);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Load initial set of cities when component mounts
  useEffect(() => {
    fetchCities();

    // Set loading to false after initial fetch
    setIsLoading(false);
  }, []);

  // Sorting function
  const sortCities = (key) => {
    let direction = "asc"; // Default direction to ascending

    // If the current column is already sorted in ascending order, switch to descending
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }

    // Sort cities based on the selected key (column) and direction
    const sortedCities = [...cities].sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === "asc" ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === "asc" ? 1 : -1;
      }
      return 0;
    });

    // Update sort configuration and set sorted cities
    setSortConfig({ key, direction });
    setCities(sortedCities);
  };

  // Fetch suggestions as the user types
  const loadOptions = async (searchQuery, loadedOptions) => {
    const url = `https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?where=name%20like%20%20"${searchQuery}"`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      const { results } = data;
      const options = results.map((city) => ({
        label: city.name + ", " + city.cou_name_en, // Display city name and country
        value: city.name.toLowerCase(), // Use city name as value
      }));

      return {
        options,
      };
    } catch (error) {
      console.error("Error loading options", error);
      return { options: [] };
    }
  };

  // Handle navigation to detailed city weather page
  const handleCityChange = (selectedOption) => {
    const { value } = selectedOption;
    history.push(`/weather/${value}`); // Navigate to the weather page for the selected city
  };

  return (
    <div className="home-page-bg-container">
      <div className="home-page-container">
        <h1 className="home-page-heading">
          Find the weather of your favourite city
        </h1>

        <div className="select-container">
          <AsyncPaginate
            value=""
            loadOptions={loadOptions}
            onChange={handleCityChange}
            debounceTimeout={500}
            placeholder="Search cities..."
          />
        </div>

        {isLoading ? (
          <LoaderComponent />
        ) : (
          <InfiniteScroll
            dataLength={cities.length}
            next={fetchCities}
            hasMore={hasMore}
            loader={<LoaderComponent />}
            endMessage={
              <p style={{ textAlign: "center" }}>
                <b>Yay! You've seen it all</b>
              </p>
            }
          >
            <span className="info-text">*Column Headers are sortable</span>
            <table className="table table-striped table-bordered table-hover">
              <thead>
                <tr className="table-primary">
                  <th></th>
                  <th
                    className="custom-table-header"
                    onClick={() => sortCities("name")}
                  >
                    {" "}
                    City Name
                  </th>
                  <th
                    className="custom-table-header"
                    onClick={() => sortCities("cou_name_en")}
                  >
                    Country
                  </th>
                  <th
                    className="custom-table-header"
                    onClick={() => sortCities("timezone")}
                  >
                    Timezone
                  </th>
                  <th>Current Temp</th>
                  <th> Min/Max Temp</th>
                </tr>
              </thead>
              <tbody>
                {cities.map((city, index) => (
                  <CityRow key={index} index={index} city={city} />
                ))}
              </tbody>
            </table>
          </InfiniteScroll>
        )}
      </div>
    </div>
  );
};

export default Home;
