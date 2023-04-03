import express from "express";
import colors from "colors";

const app = express();

const users = ["Adam", "Beth", "Cecil"];

app.get("/users/:id/", (req, res) => {
  const userId = parseInt(req.params.id, 10);

  if (Number.isNaN(userId)) return res.sendStatus(400);

  if (userId < 0 || userId >= users.length) return res.sendStatus(404);

  const requestedUser = users[userId];

  return res.json({ name: requestedUser })
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(colors.cyan(`[server] Server running on port ${PORT}`));
});