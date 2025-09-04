import React, { useEffect, useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

import axios from "axios";
import "../index.css";
import Notification from "./components/Notification";
const BaseUrl = `http://localhost:3001/api/persons`;
const Info = `http://localhost:3001/info`;
function App() {
  const [persons, setPersons] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [searchNumber, setSearchNumber] = useState("");
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [editingPerson, setEditingPerson] = useState(null); // Track person being edited
  const [notify, setNotify] = useState("");

  // Make notification disappear after 5 seconds
  useEffect(() => {
    if (notify) {
      const timer = setTimeout(() => setNotify(""), 5000);
      return () => clearTimeout(timer);
    }
  }, [notify]);

  useEffect(() => {
    axios.get(`${BaseUrl}`).then((response) => {
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
            .put(`${BaseUrl}/${editingPerson._id}`, {
              id: editingPerson._id,
              name: newName,
              number: newNumber,
            })
            .then((res) => {
              setPersons((prev) =>
                prev.map((p) => (p.id === editingPerson._id ? res.data : p))
              );
              setNewName("");
              setNewNumber("");
              setEditingPerson(null);
              axios.get(`${BaseUrl}`).then((res) => {
                const data = res.data;
                setPersons(data);
                console.log(data);
              });
              setNotify("Updated Successfully!");
            })
            .catch((err) => {
              console.error(err);
            })
        : "Thanks for staying!";
      return;
    }

    if (persons.some((p) => p.name?.toLowerCase() === newName.toLowerCase())) {
      alert(`${newName} is already added to phonebook`);
      return;
    }

    axios
      .post(`${BaseUrl}`, {
        name: newName,
        number: newNumber,
      })
      .then((res) => {
        setNewName("");
        setNewNumber("");
        axios.get(`${BaseUrl}`).then((res) => {
          const data = res.data;
          setPersons(data);
          console.log(data);
        });
        setNotify("Added Successfully!");
      })
      .catch((err) => {
        console.error(err);
        setNotify("Could not save the person");
      });
  };

  const handleDelete = (id) => {
    if (window.confirm("Do you want to delete?")) {
      axios
        .delete(`${BaseUrl}/${id}`)
        .then(() => {
          setPersons((prev) => prev.filter((p) => p.id !== id));
          setNotify("Delete Success!");
          axios.get(`${BaseUrl}`).then((res) => {
            const data = res.data;
            setPersons(data);
            console.log(data);
          });
        })
        .catch((error) => {
          if (error.response && error.response.status === 404) {
            setNotify("This person was already deleted from the server.");
            setPersons((prev) => prev.filter((p) => p.id !== id));
          } else {
            setNotify("An error occurred while deleting.");
          }
          console.log(error);
        });
    } else {
      // User cancelled
      setNotify("Glad to see you Staying!");
    }
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
      <Notification message={notify} />
      <a href={Info}>
        <button>GetInfo</button>
      </a>
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
