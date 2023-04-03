import { Router } from "express";

const books = [
  { title: "Lord of the Rings", id: 1 },
  { title: "Hunger Games", id: 2 },
  { title: "Naruto", id: 3 },
];

export const booksRouter = Router();

booksRouter.get("/", (req, res) => res.json({ books }));

booksRouter.get("/:index", (req, res) => {
  const bookIndex = parseInt(req.params.index, 10);

  if (Number.isNaN(bookIndex)) return res.sendStatus(400);

  if (bookIndex < 0 || bookIndex >= books.length) return res.sendStatus(404);

  const requestedBook = books[bookIndex];

  return res.json({ title: requestedBook });
});