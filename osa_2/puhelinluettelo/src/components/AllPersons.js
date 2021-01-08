import Person from './Person'
import React from 'react'

const AllPersons = ({persons}) => {
  return (
    <div className="persons">
      {persons.map((person) => {
        return <Person key={person.name} name={person.name} />;
      })}
    </div>
  )
}

export default AllPersons
