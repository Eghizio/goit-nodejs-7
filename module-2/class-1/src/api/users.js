import { Router } from "express";

const users = [
  { email: "admin@mail.com", id: 1 },
  { email: "adam@mail.com", id: 2 },
  { email: "beth@mail.com", id: 3 },
];

export const usersRouter = Router();

usersRouter.get("/", (req, res) => res.json({ users }));

usersRouter.get("/:index", (req, res) => {
  const userIndex = parseInt(req.params.index, 10);

  if (Number.isNaN(userIndex)) return res.sendStatus(400);

  if (userIndex < 0 || userIndex >= users.length) return res.sendStatus(404);

  const requestedUser = users[userIndex];

  return res.json({ name: requestedUser });
});