import React from "react";
import personService from "../services/persons";

const AddPersonForm = ({
  newName,
  setNewName,
  persons,
  setPersons,
  newNumber,
  setNewNumber,
}) => {
  const addPerson = (e) => {
    e.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber,
    };

    // Palauttaa undefined jos mikään person.name ei vastaa newNamea
    persons.find((person) => person.name === newName) === undefined
      ? personService
          .create(newPerson)
          .then((response) => {
            setPersons(persons.concat(response.data));
            setNewName("");
            setNewNumber("");
          })
          .catch(error => {
            console.log(error);
          })
      : alert(`${newName} is already in the phonebook`);
  };

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  };

  return (
    <form onSubmit={addPerson}>
      <div>
        name: <input value={newName} onChange={handleNameChange} />
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default AddPersonForm;
