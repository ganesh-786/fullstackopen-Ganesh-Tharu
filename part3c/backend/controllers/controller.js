import { Person } from "../models/Person.js";

export const createUser = async (req, res, next) => {
  try {
    const { name, number } = req.body;

    // Check if person already exists
    const existingPerson = await Person.findOne({ name });
    if (existingPerson) {
      return res
        .status(400)
        .json({ error: `${name} is already added to phonebook` });
    }

    const newPerson = new Person({ name, number });
    const savedPerson = await newPerson.save();
    res.status(201).json(savedPerson);
  } catch (error) {
    console.log("Error during Creating user", error);
    if (error.name === "ValidationError") {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: "Error creating user" });
    next(error);
  }
};

export const getUser = async (req, res) => {
  try {
    const people = await Person.find({});
    res.status(200).json(people);
  } catch (error) {
    console.log("error during getting user", error);
    res.status(500).json({ error: "Error getting users" });
  }
};

export const getInfo = async (req, res) => {
  try {
    const peoples = await Person.find({});
    const display = `Phonebook has ${peoples.length} people <br> ${new Date()}`;
    res.status(200).send(display);
  } catch (error) {
    console.log("error while getting info", error);
  }
};

export const updateUser = async (req, res) => {
  try {
    const id = req.params._id;
    const { name, number } = req.body;
    const updatedPerson = await Person.findByIdAndUpdate(
      id,
      { name, number },
      { new: true, runValidators: true, context: "query" }
    );
    if (!updatedPerson) {
      return res.status(404).json({ error: "Person not found" });
    }
    res.status(200).json(updatedPerson);
  } catch (error) {
    console.log("Error during updating user", error);
    if (error.name === "ValidationError") {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: "Error updating user" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const id = req.params._id;
    console.log(id);
    const deletedPerson = await Person.findByIdAndDelete(id);
    if (!deletedPerson) {
      return res.status(404).json({ error: "Person not found" });
    }
    res.status(200).json({ message: "Person deleted", deleted: deletedPerson });
  } catch (error) {
    console.log("Error during deleting user", error);
    res.status(500).json({ error: "Error deleting user" });
  }
};

export const middleware = () => {};
