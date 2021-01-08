import React, { useState } from "react";
import AddPersonForm from "./components/AddPersonForm";
import DisplayPersons from "./components/DisplayPersons";
import Filter from "./components/Filter";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456" },
    { name: "Arto Marto", number: "040-123434" },
    { name: "Arto Saldo", number: "040-123437" },
    { name: "Ada Lovelace", number: "39-44-5323523" },
    { name: "Dan Abramov", number: "12-43-234345" },
    { name: "Mary Poppendieck", number: "39-23-6423122" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

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
