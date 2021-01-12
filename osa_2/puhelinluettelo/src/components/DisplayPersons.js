import Person from "./Person";
import React from "react";

const DisplayPersons = ({ persons, setPersons, filter, displaySuccess }) => {
  return (
    <div className="persons">
      {persons.map((person) => {
        if (person.name.toLowerCase().includes(filter))
          return (
            <Person
              key={person.name}
              name={person.name}
              number={person.number}
              persons={persons}
              setPersons={setPersons}
              displaySuccess={displaySuccess}
            />
          );
        else return null;
      })}
    </div>
  );
};

export default DisplayPersons;
