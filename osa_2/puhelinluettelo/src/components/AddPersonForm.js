import React from 'react'

const AddPersonForm = ({newName, setNewName, persons, setPersons}) => {
  const onSubmit = (e) => {
    e.preventDefault();
    const newPerson = {
      name: newName,
    };
  
    setPersons([...persons, newPerson]);
  };

  const handleNameChange = (e) => {
    console.log(e.target.value);
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
  )
}

export default AddPersonForm



