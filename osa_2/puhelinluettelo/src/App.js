import React, { useState } from "react";
import AddPersonForm from "./components/AddPersonForm";
import AllPersons from "./components/AllPersons";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas" },
    { name: "Ada Lovelace" },
    { name: "Dan Abramov" },
    { name: "Mary Poppendieck" },
  ]);
  const [newName, setNewName] = useState("");

  return (
    <div>
      <h2>Phonebook</h2>
      <AddPersonForm
        newName={newName}
        setNewName={setNewName}
        persons={persons}
        setPersons={setPersons}
      />
      <h2>Numbers</h2>
      <AllPersons persons={persons}/>
    </div>
  );
};

export default App;
