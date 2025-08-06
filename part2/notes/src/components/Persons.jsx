import React from "react";

function Persons({ persons }) {
  return (
    <div>
      {persons.map((person, i) => (
        <div key={i}>
          {person.name} {person.number}
        </div>
      ))}
    </div>
  );
}

export default Persons;
