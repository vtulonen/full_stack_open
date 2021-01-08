import React from "react";

const AddPersonForm = ({ newName, setNewName, persons, setPersons }) => {
  const onSubmit = (e) => {
    e.preventDefault();
    const newPerson = {
      name: newName,
    };

    // Palauttaa undefined jos mikään person.name ei vastaa newNamea
    persons.find((person) => person.name === newName) === undefined
      ? setPersons([...persons, newPerson])
      : alert(`${newName} is already in the phonebook`);
  };

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  return (
    <form onSubmit={onSubmit}>
      <div>
        name: <input value={newName} onChange={handleNameChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default AddPersonForm;
