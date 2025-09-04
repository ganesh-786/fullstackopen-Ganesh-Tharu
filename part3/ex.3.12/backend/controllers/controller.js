import { Person } from "../models/Person.js";

export const createUser = async (req, res) => {
  try {
    const { name, number } = req.body;
    const newPerson = new Person({ name, number });
    const savedPerson = await newPerson.save();
    {
      savedPerson.map((person) => {
        console.log(`PhoneBook: \n ${person.name} ${person.number}`);
      });
    }
    res.status(201).json(savedPerson);
  } catch (error) {
    console.log("Error during Creating user", error);
    res.status(500).json({ error: "Error creating user" });
  }
};

export const getUser = async (req, res) => {
  try {
    const people = await Person.find({});
    console.log("Phonebook:");
    {
      people.map((p) => {
        console.log(`${p.name} ${p.number}`);
      });
    }
    res.status(200).json(people);
  } catch (error) {
    console.log("error during getting user", error);
    res.status(500).json({ error: "Error getting users" });
  }
};
