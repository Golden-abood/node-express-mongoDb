const express = require("express");
const app = express();

const bookPath = require("./routes/book");
const authorPath = require("./routes/author");

app.use(express.json());

app.use("/api/books", bookPath);
app.use("/api/authors", authorPath);

app.get("/", (req, res) => {
  res.send("Welcome");
});

const PORT = 4000;

app.listen(PORT, () => console.log("Port: " + PORT));
