import React, { useState, useEffect } from "react";
import axios from "axios";
import Filter from "./components/Filter";
import SearchResults from "./components/SearchResults";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("");
 

  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then((response) => {
      setCountries(response.data);
    });

  }, []);

  return (
    <div>
      <Filter filter={filter} setFilter={setFilter} />
      {filter !== ""  && <SearchResults countries={countries} filter={filter.toLowerCase()} />}
    </div>
  );
};

export default App;
