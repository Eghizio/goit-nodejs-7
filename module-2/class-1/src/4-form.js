import path from "path";
import express from "express";
import colors from "colors";

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/", express.static(path.join("src", "public")));

const users = [
  { email: "admin@mail.com", pwd: "adminadmin", id: 1 },
  { email: "adam@mail.com", pwd: "adam321", id: 2 },
  { email: "beth@mail.com", pwd: "beth123", id: 3 },
];

const sanitizeUser = ({ pwd, ...user }) => user;

app.post("/login", (req, res) => {
  const data = req.body;

  console.log(data.email, data.password);

  const user = users.find(({ email }) => email === data.email);

  if (!user || user.pwd !== data.password) return res.sendStatus(401);

  return res.json({ email: user.email, id: user.id });
});

app.post("/register", (req, res) => {
  const data = req.body;

  console.log({ data });


  const isEmailTaken = !!users.find(({ email }) => email === data.email);
  if (isEmailTaken) return res.status(400).send("Email taken"); // OWASP

  const createdUser = { ...data, id: users.length + 1 };
  users.push(createdUser);

  return res.status(201).json(sanitizeUser(createdUser));
});


// ADMIN ONLY
app.get("/users", (req, res) => res.json({ users: users.map(sanitizeUser) }))



const PORT = 3000;
app.listen(PORT, () => {
  console.log(colors.cyan(`[server] Server running on port ${PORT}`));
});