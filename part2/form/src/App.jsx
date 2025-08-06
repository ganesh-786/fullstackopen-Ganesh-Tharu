import React, { useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

function App() {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-1234567" },
  ]);

  const [searchName, setSearchName] = useState("");
  const [searchNumber, setSearchNumber] = useState("");
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const handleAddPerson = (e) => {
    e.preventDefault();
    if (!newName.trim()) {
      alert("Name cannot be empty");
      return;
    }
    if (persons.some((p) => p.name === newName)) {
      alert(`${newName} is already added to phonebook`);
      return;
    }
    setPersons((prev) => [...prev, { name: newName, number: newNumber }]);
    setNewName("");
    setNewNumber("");
  };

  const filteredByName = persons.filter((p) =>
    p.name.toLowerCase().includes(searchName.toLowerCase())
  );
  const filteredByNumber = filteredByName.filter((p) =>
    p.number.includes(searchNumber)
  );

  return (
    <div style={{ padding: "16px", fontFamily: "Arial, sans-serif" }}>
      <h2>Phonebook</h2>

      <Filter
        label="Search for names"
        value={searchName}
        onChange={(e) => setSearchName(e.target.value)}
      />

      <Filter
        label="Filter by number"
        value={searchNumber}
        onChange={(e) => setSearchNumber(e.target.value)}
      />

      <h2>add a new</h2>
      <PersonForm
        nameValue={newName}
        numberValue={newNumber}
        onNameChange={(e) => setNewName(e.target.value)}
        onNumberChange={(e) => setNewNumber(e.target.value)}
        onSubmit={handleAddPerson}
      />

      <h2>Numbers</h2>
      <Persons persons={filteredByNumber} />
    </div>
  );
}

export default App;
