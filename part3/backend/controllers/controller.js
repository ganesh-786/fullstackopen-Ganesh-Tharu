const data = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

export const getUser = (req, res) => {
  res.status(200).json(data);
};

export const getInfo = (req, res) => {
  res
    .status(200)
    .send(`Phonebook has info for ${data.length} people <br> ${new Date()}`);
};

export const getUnique = (req, res) => {
  const id = Number(req.params.id);
  const person = data.find((i) => i.id === id);
  if (person) {
    res.status(200).json(person);
  } else {
    res.status(404).json({ error: "Person not found" });
  }
};
export const createUser = (req, res) => {
  const { name, number } = req.body;
  // Check if a person with the same name or number already exists
  const exists = data.some((i) => i.name === name || i.number === number);
  if (exists) {
    return res
      .status(409)
      .json({ error: "Person with same name or number already exists" });
  }
  const obj = {
    id: Math.floor(Math.random() * 100).toString(),
    name,
    number,
  };
  data.push(obj);
  res.status(201).json(data);
};

export const updateUser = (req, res) => {
  const id = String(req.params.id);
  const { name, number } = req.body;
  const index = data.findIndex((i) => i.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "Person not found" });
  }
  // Update the user in the array
  data[index].name = name;
  data[index].number = number;
  res.status(200).json(data[index]);
};

export const deleteUser = (req, res) => {
  const id = req.params.id;
  const index = data.findIndex((i) => i.id === id);
  if (index !== -1) {
    const deleted = data.splice(index, 1);
    res.status(200).json({ message: "Person deleted", deleted: deleted[0] });
  } else {
    res.status(404).json({ error: "Person not found" });
  }
};
