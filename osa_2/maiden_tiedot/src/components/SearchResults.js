import React, { useState } from "react";
import Country from "./Country";

const SearchResults = ({ countries, filter }) => {
  const results = countries.filter((country) => {
    return country.name.toLowerCase().includes(filter);
  });

  const displayResults = results.map((result) => {
    return (
      <p key={result.name} className="result">
        {result.name}
      </p>
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
    </div>
  );
};

export default SearchResults;
