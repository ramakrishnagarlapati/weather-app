import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { AsyncPaginate } from "react-select-async-paginate";
import CityRow from "../CityRow";
import "./index.css";

const Home = () => {
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
      console.log(data);
      const newCities = data.results;
      setCities([...cities, ...newCities]);
      setOffset(offset + 20);

      if (newCities.length === 0) {
        setHasMore(false);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCities();
  }, []);

  return (
    <div className="home-page-container">
      <InfiniteScroll
        dataLength={cities.length}
        next={fetchCities}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You've seen it all</b>
          </p>
        }
      >
        <table>
          <thead>
            <tr>
              <th>City Name</th>
              <th>Country</th>
              <th>Timezone</th>
            </tr>
          </thead>
          <tbody>
            {cities.map((city, index) => (
              <CityRow key={index} city={city} />
            ))}
          </tbody>
        </table>
      </InfiniteScroll>
    </div>
  );
};

export default Home;
