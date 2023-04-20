import { Router } from "express";
import jwt from "jsonwebtoken";
import { config } from "./config.js";
import { auth, customAuth } from "./middlewares.js";
import { User } from "./User.js";
import bcrypt from "bcrypt"; // could use argon2

export const api = Router();

const sanitizeUser = ({ email, _id }) => ({ _id, email }); // remove password and other stuff

// // We can easily change the implementation of this abstraction.
// // So we don't have to change the code that is using it. Just changing the internals here ;)
// const hashPassword = (pwd) => "_dupa_" + pwd;
// const validatePassword = (pwd, hash) => hash.replace("_dupa_", "") === pwd;

const hashPassword = async (pwd) => {
  const salt = await bcrypt.genSalt(10); // 10 salt rounds
  const hash = await bcrypt.hash(pwd, salt);

  return hash;
};

const validatePassword = (pwd, hash) => bcrypt.compare(pwd, hash);


api.post("/register", async (req, res) => {
  const { email, password } = req.body;

  console.log("Register", { email, password });

  const isEmailTaken = await User.findOne({ email });

  if (isEmailTaken) return res.status(409).json({ "message": "Email already taken" });

  const hashedPassword = await hashPassword(password);

  const user = await User.create({ email, password: hashedPassword });

  console.log({ user });

  return res.status(201).json(sanitizeUser(user));
});

api.post("/login", async (req, res) => {
  const { email, password } = req.body;

  console.log("Login", { email, password });

  const user = await User.findOne({ email });

  if (!user) return res.status(403).json({ "message": "Invalid credentials" });

  const isValidPassword = await validatePassword(password, user.password);

  if (!isValidPassword) return res.status(403).json({ "message": "Invalid credentials" });

  const token = jwt.sign({ id: user._id }, config.JWT_SECRET);

  return res.json({ token });
});


api.get("/public", (req, res) => res.json({ message: "Public resources" }));

// Private/Protected routes

api.get("/secret/passport", auth, (req, res) => res.json({ message: "Top secret resources" }));

api.get("/secret/custom", customAuth, (req, res) => res.json({ message: "Top secret resources", user: req.user.email }));
