import React from "react";

const Person = ({ name, number }) => {
  return (
    <p className="person">
      {name} {number}
    </p>
  );
};

export default Person;
