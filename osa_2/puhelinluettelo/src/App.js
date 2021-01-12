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
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState(null);

  const displayNotification = (type, text) => {
    setMessageType(type)
    setMessage(text);
    setTimeout(() => {
      setMessage(null);
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
      <Notification type={messageType} message={message} />
      <Filter filter={filter} setFilter={setFilter} />

      <h2>Add new</h2>
      <AddPersonForm
        newName={newName}
        setNewName={setNewName}
        persons={persons}
        setPersons={setPersons}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
        displayNotification={displayNotification}
      />
      <h2>Numbers</h2>
      <DisplayPersons
        persons={persons}
        setPersons={setPersons}
        filter={filter.toLowerCase()}
        displayNotification={displayNotification}
      />
    </div>
  );
};

export default App;
