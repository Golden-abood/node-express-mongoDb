const express = require("express");
const router = express.Router();

const Joi = require("joi");

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

router.get("/", (req, res) => {
  res.json(books);
});

router.get("/:id", (req, res) => {
  const book = books.find((book) => book.id === parseInt(req.params.id));
  if (book) {
    res.status(200).json(book);
  } else {
    res.status(404).send("book not found");
  }
});

router.post("/", (req, res) => {
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

module.exports = router;
