import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { AsyncPaginate } from "react-select-async-paginate";
import { useHistory } from "react-router-dom";

import CityRow from "../CityRow";
import "./index.css";
import LoaderComponent from "../Loader";

const Home = () => {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);
  const [cities, setCities] = useState([]);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [selectedCity, setSelectedCity] = useState(null);

  // Fetch cities data for the infinite scroll

  const fetchCities = async () => {
    const url = `https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?limit=30&offset=${offset}`;
    try {
      const response = await fetch(url);
      const data = await response.json();

      const newCities = data.results;
      setCities([...cities, ...newCities]);
      setOffset(offset + 30);

      if (newCities.length === 0) {
        setHasMore(false);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCities();
    setIsLoading(false);
  }, []);

  // Fetch suggestions as the user types
  const loadOptions = async (searchQuery, loadedOptions) => {
    const url = `https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?where=name%20like%20%20"${searchQuery}"`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      const { results } = data;
      const options = results.map((city) => ({
        label: city.name + ", " + city.cou_name_en, // City name and country
        value: city.name.toLowerCase(),
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
    history.push(`/weather/${value}`);
  };

  return (
    <div className="home-page-bg-container">
      <div className="home-page-container">
        <h1 className="home-page-heading">
          Find the weather of your favourite city
        </h1>

        <div className="select-container">
          <AsyncPaginate
            value={selectedCity}
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
            <table className="table table-striped table-bordered table-hover">
              <thead>
                <tr className="table-primary">
                  <th></th>
                  <th>City Name</th>
                  <th>Country</th>
                  <th>Timezone</th>
                  <th>Current Temp in Celisus</th>
                  <th> Min/Max Temp in Celisus</th>
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
