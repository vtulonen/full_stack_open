import React from "react";

const Filter = ({ filter, setFilter }) => {
  return (
    <div>
      <span>Search countries </span>
      <input
        value={filter}
        onChange={(e) => {
          setFilter(e.target.value);
        }}
      />
    </div>
  );
};

export default Filter;