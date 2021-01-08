import Person from "./Person";
import React from "react";

const DisplayPersons = ({ persons, filter }) => {
  return (
    <div className="persons">
      {persons.map((person) => {
        if (person.name.toLowerCase().includes(filter))
          return (
            <Person
              key={person.name}
              name={person.name}
              number={person.number}
            />
          );
        else return null;
      })}
    </div>
  );
};

export default DisplayPersons;
