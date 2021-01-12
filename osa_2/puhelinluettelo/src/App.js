import React, { useState, useEffect } from "react";
import AddPersonForm from "./components/AddPersonForm";
import DisplayPersons from "./components/DisplayPersons";
import Filter from "./components/Filter";
import personService from "./services/persons";
import Notification from "./components/Notification";
const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [successMessage, setSuccessMessage] = useState(null);

  const displaySuccess = (text) => {
    setSuccessMessage(text);
    setTimeout(() => {
      setSuccessMessage(null);
    }, 5000);
  };

  useEffect(() => {
    personService
      .getAll()
      .then((response) => {
        setPersons(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={successMessage} />
      <Filter filter={filter} setFilter={setFilter} />

      <h2>Add new</h2>
      <AddPersonForm
        newName={newName}
        setNewName={setNewName}
        persons={persons}
        setPersons={setPersons}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
        displaySuccess={displaySuccess}
      />
      <h2>Numbers</h2>
      <DisplayPersons
        persons={persons}
        setPersons={setPersons}
        filter={filter.toLowerCase()}
        displaySuccess={displaySuccess}
      />
    </div>
  );
};

export default App;
