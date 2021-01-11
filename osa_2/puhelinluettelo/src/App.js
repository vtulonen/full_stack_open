import React, { useState, useEffect } from "react";
import AddPersonForm from "./components/AddPersonForm";
import DisplayPersons from "./components/DisplayPersons";
import Filter from "./components/Filter";
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    personService.getAll().then((response) => {
      setPersons(response.data);
    })
    .catch(error => {
      console.log(error);
    });
  }, []);

  return (
    <div>
      <h1>Phonebook</h1>

      <Filter filter={filter} setFilter={setFilter} />

      <h2>Add new</h2>
      <AddPersonForm
        newName={newName}
        setNewName={setNewName}
        persons={persons}
        setPersons={setPersons}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
      />
      <h2>Numbers</h2>
      <DisplayPersons persons={persons} filter={filter.toLowerCase()} />
    </div>
  );
};

export default App;
