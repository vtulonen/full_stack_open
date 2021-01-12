import React from "react";
import personService from "../services/persons";

const AddPersonForm = ({
  newName,
  setNewName,
  persons,
  setPersons,
  newNumber,
  setNewNumber,
  displaySuccess,
}) => {
  
  const updatePerson = (id, newPerson) => {
    if (
      window.confirm(
        `${newName} is already in the phonebook. Do you wish to update the number?`
      )
    ) {
      personService
        .update(id, newPerson)
        .then((response) => {
          if (response.status === 200) {
            personService.getAll().then((response) => {
              setPersons(response.data);
              displaySuccess(`${newPerson.name}'s number updated successfully`);
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const addPerson = (e) => {
    e.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber,
    };

    // Palauttaa undefined jos mikään person.name ei vastaa newNamea
    persons.find((person) => person.name === newName) === undefined
      ? personService // Jos ei löydy, lisätään luetteloon
          .create(newPerson)
          .then((response) => {
            setPersons(persons.concat(response.data));
            displaySuccess(`${newName} added successfully`);
            setNewName("");
            setNewNumber("");
          })
          .catch((error) => {
            console.log(error);
          })
      : // Else Puhelinnumeron päivitys jos eroaa annetusta
      persons.find((person) => person.number === newNumber)
      ? alert(`${newName} is already in the phonebook`)
      : updatePerson(
          persons.find((person) => person.name === newName).id,
          newPerson
        );
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
