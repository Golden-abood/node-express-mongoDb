const express = require("express");
const Joi = require("joi");
const app = express();

app.use(express.json());
const books = [
  {
    id: 1,
    name: "John",
  },
  {
    id: 2,
    name: "abood",
  },
  {
    id: 3,
    name: "asddvs",
  },
  {
    id: 4,
    name: "Johasdan",
  },

  {
    id: 5,
    name: "asda",
  },
];
app.get("/", (req, res) => {
  res.send("Welcome");
});

app.get("/api/books", (req, res) => {
  res.json(books);
});

app.get("/api/books/:id", (req, res) => {
  const book = books.find((book) => book.id === parseInt(req.params.id));
  if (book) {
    res.status(200).json(book);
  } else {
    res.status(404).send("book not found");
  }
});

app.post("/api/books", (req, res) => {
  const schema = Joi.object({
    id: Joi.required(),
    name: Joi.string().required().min(3).max(30),
  });
  const book = {
    id: books.length + 1,
    name: req.body.name,
  };
  const { error } = schema.validate(book);
  if (error) {
    res.status(400).send(error.details);
    return;
  } else {
    books.push(book);
    res.status(201).json(books);
  }
});
const PORT = 4000;

app.listen(PORT, () => console.log("Port: " + PORT));
