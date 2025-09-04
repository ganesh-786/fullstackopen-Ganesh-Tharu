import React from "react";

function Persons({ persons, handleDelete, onEdit }) {
  return (
    <div>
      {persons.map((person, i) => (
        <div key={i}>
          {person.name} {person.number}{" "}
          <button onClick={() => handleDelete(person._id)}>delete</button>
          <button onClick={() => onEdit(person)}>update</button>
        </div>
      ))}
    </div>
  );
}

export default Persons;
