const express = require("express");

const router = express.Router();
const Joi = require("joi");

const authors = [
  {
    id: 1,
    firstName: "John",
    lastName: "golden",
    country: "syria",
  },
  {
    id: 2,
    firstName: "John",
    lastName: "golden",
    country: "syria",
  },
  {
    id: 3,
    firstName: "John",
    lastName: "golden",
    country: "syria",
  },
  {
    id: 4,
    firstName: "John",
    lastName: "golden",
    country: "syria",
  },

  {
    id: 5,
    firstName: "John",
    lastName: "golden",
    country: "syria",
  },
];

router.get("/", (req, res) => {
  res.json(authors);
});

router.get("/:id", (req, res) => {
  const author = authors.find(
    (author) => author.id === parseInt(req.params.id)
  );
  if (author) {
    res.status(200).json(author);
  } else {
    res.status(404).send("author not found");
  }
});

router.post("/", (req, res) => {
  const schema = Joi.object({
    id: Joi.required(),
    firstName: Joi.string().required().min(3).max(30),
    lastName: Joi.string().required().min(3).max(30),
    country: Joi.string().required().min(3).max(30),
  });
  const author = {
    id: authors.length + 1,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    country: req.body.country,
  };
  const { error } = schema.validate(author);
  if (error) {
    res.status(400).send(error.details);
    return;
  } else {
    authors.push(author);
    res.status(201).json(authors);
  }
});

module.exports = router;
