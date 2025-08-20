import React, { useEffect, useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import axios from "axios";

function App() {
  const [persons, setPersons] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [searchNumber, setSearchNumber] = useState("");
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [editingPerson, setEditingPerson] = useState(null); // Track person being edited

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((response) => {
      const notes = response.data;
      setPersons(notes);
      console.log(notes);
    });
  }, []);

  const handleAddOrUpdatePerson = (e) => {
    e.preventDefault();

    if (!newName.trim()) {
      alert("Name cannot be empty");
      return;
    }

    if (editingPerson) {
      // Update existing person
      window.confirm("Already present, Now do you want to update?")
        ? axios
            .put(`http://localhost:3001/persons/${editingPerson.id}`, {
              id: editingPerson.id,
              name: newName,
              number: newNumber,
            })
            .then((res) => {
              setPersons((prev) =>
                prev.map((p) => (p.id === editingPerson.id ? res.data : p))
              );
              setNewName("");
              setNewNumber("");
              setEditingPerson(null);
            })
            .catch((err) => {
              console.error(err);
              alert("Could not update the person. Please try again later.");
            })
        : "Thanks for staying!";
      return;
    }

    if (persons.some((p) => p.name?.toLowerCase() === newName.toLowerCase())) {
      alert(`${newName} is already added to phonebook`);
      return;
    }

    axios
      .post("http://localhost:3001/persons", {
        name: newName,
        number: newNumber,
      })
      .then((res) => {
        setPersons((prev) => [...prev, res.data]);
        setNewName("");
        setNewNumber("");
      })
      .catch((err) => {
        console.error(err);
        alert("Could not save the person. Please try again later.");
      });
  };

  const handleDelete = (id) => {
    window.confirm("Do you want to delete?")
      ? axios
          .delete(`http://localhost:3001/persons/${id}`)
          .then(() => setPersons((prev) => prev.filter((p) => p.id !== id)))
          .catch((err) => console.log(err))
      : "Glad to see you Staying!";
  };

  // When update button is clicked in Persons
  const handleEditPerson = (person) => {
    setEditingPerson(person);
    setNewName(person.name);
    setNewNumber(person.number);
  };

  const handleCancelEdit = () => {
    setEditingPerson(null);
    setNewName("");
    setNewNumber("");
  };

  const filteredByName = persons.filter((p) =>
    p.name?.toLowerCase().includes(searchName.toLowerCase())
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
        onSubmit={handleAddOrUpdatePerson}
        isEditing={!!editingPerson}
        onCancelEdit={handleCancelEdit}
      />

      <h2>Numbers</h2>
      <Persons
        persons={filteredByNumber}
        handleDelete={handleDelete}
        onEdit={handleEditPerson}
      />
    </div>
  );
}

export default App;
