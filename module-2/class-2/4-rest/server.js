import express from "express";
import morgan from "morgan";
import { nanoid } from "nanoid";

const app = express();

app.use(morgan("dev"));
app.use(express.json());

const books = new Map([
  ["1", { id: "1", title: "First", author: "Adam", read: false }],
  ["2", { id: "2", title: "Secon", author: "Adam", read: true }],
  ["3", { id: "3", title: "Third", author: "Beth", read: false }],
]);

app.get("/books", (req, res) => res.json({ books: Array.from(books.values()) }));

app.get("/books/:id", (req, res) => {
  const requestedBook = books.get(req.params.id);

  if (!requestedBook) return res.sendStatus(404);

  return res.json(requestedBook);
});

app.post("/books", (req, res) => {
  const book = req.body;

  console.log({ book });

  const newBook = { ...book, read: false, id: nanoid() };

  books.set(newBook.id, newBook);

  return res.status(201).json(newBook); // or just the object with `id`
});

app.patch("/books/:id", (req, res) => {
  const id = req.params.id;
  const updatePayload = req.body;

  const bookToUpdate = books.get(id);

  if (!bookToUpdate) return res.sendStatus(404);

  // beware that ID can be now changed! We should validate and check the data
  const updatedBook = { ...bookToUpdate, ...updatePayload };

  books.set(id, updatedBook);

  return res.json(updatedBook);
});

app.delete("/books/:id", (req, res) => {
  const id = req.params.id;

  if (!books.has(id)) return res.sendStatus(404);

  books.delete(id);

  return res.json(bookToDelete); // should just return the id or true/false
});


app.listen(3000, () => console.log(`Listening on port 3000...`));
