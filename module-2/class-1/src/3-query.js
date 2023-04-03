import express from "express";
import colors from "colors";

const app = express();

const users = [
  { name: "Adam" },
  { name: "Beth" },
  { name: "Cecil" },
];

app.get("/users", (req, res) => {
  const limit = parseInt(req.query.limit, 10) || Infinity;
  const skip = parseInt(req.query.skip) || 0;
  console.log({ limit, skip });

  const paginatedUsers = users.slice(skip, limit);

  return res.json({ users: paginatedUsers });
});


const fruits = ["Apple", "Lemon", "Pineapple", "Pear", "Grapes", "Tomato"];

app.get("/fruits", (req, res) => {
  const filterQuery = req.query.filter || "";

  const filteredFruits = fruits
    .filter(fruit => fruit.toLowerCase().includes(filterQuery.toLowerCase()));

  return res.json({ fruits: filteredFruits });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(colors.cyan(`[server] Server running on port ${PORT}`));
});