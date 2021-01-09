import React from "react";

const Country = ({ data }) => {
  console.log(data);
  const { name, capital, population, languages, flag } = data;
  const displayLanguages = languages.map((item) => {
    return <li key ={item.name}>{item.name}</li>;
  });

  return (
    <div className="country">
      <h2>{name}</h2>
      <p>capital {capital}</p>
      <p>population {population}</p>
      <h3>languages</h3>
      <ul>{displayLanguages}</ul>
      <img
        src={flag}
        alt="Image of the country's flag"
        width="200"
        height="150"
      />
    </div>
  );
};

export default Country;
