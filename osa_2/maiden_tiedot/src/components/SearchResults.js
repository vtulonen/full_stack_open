import React, { useState } from "react";
import Country from "./Country";

const SearchResults = ({ countries, filter }) => {
  const [countryData, setCountryData] = useState(undefined);

  const results = countries.filter((country) => {
    return country.name.toLowerCase().includes(filter);
  });

  const handleClick = (e) => {
    const target = e.target.previousSibling.firstChild.data;
    const newCountrydata = countries.filter((country) => {
      return country.name.toLowerCase().includes(target.toLowerCase());
    });
    setCountryData(newCountrydata[0]);
  };

  const displayResults = results.map((result, i) => {
    return (
      <div key={result.name} className="result">
        <span>{result.name}</span>
        <button onClick={handleClick}>show</button>
      </div>
    );
  });

  const promptUser =
    filter === "" ? null : <p>Too many matches, please specify</p>;

  return (
    <div className="search-results">
      {results.length !== 1 ? ( // if more than 1 result
        results.length <= 10 ? ( // if true -> check length
          displayResults // display results
        ) : (
          promptUser // or prompt to be more spesific
        )
      ) : (
        <Country data={results[0]} /> // else display the country information
      )}
      {countryData !== undefined && <Country data={countryData} />}
    </div>
  );
};

export default SearchResults;
