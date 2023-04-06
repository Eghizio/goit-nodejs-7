import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use("/", express.static("./public"));

app.get("/users", (req, res) => res.json({ users: ["Adam", "Beth", "Cecil"] }));

app.get("/books", (req, res) => res.json({ books: ["First", "Second", "Third"] }));

app.listen(3000, () => console.log(`Server listening on 3000...`));
