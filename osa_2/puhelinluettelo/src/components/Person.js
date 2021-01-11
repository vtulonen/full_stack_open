import React from "react";
import personService from "../services/persons";

const Person = ({ name, number, persons, setPersons }) => {
  const deletePerson = () => {
    const id = persons.find((person) => person.name === name).id;

    personService
      .destroy(id)
      .then((response) => {
        if (response.status === 200) {
          personService.getAll().then((response) => {
            setPersons(response.data);
          });
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  return (
    <div className="person">
      <span>
        {name} {number}
      </span>
      <button onClick={deletePerson}>delete</button>
    </div>
  );
};

export default Person;
