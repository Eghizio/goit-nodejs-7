import express from "express";
import morgan from "morgan";

const app = express();

const ourLogger = (req, res, next) => {
  const method = req.method;
  const url = req.originalUrl;
  const date = new Date().toLocaleString();

  console.log(`[${method}] ${url} - ${date}`);
  next();
};



// app.use(ourLogger);
app.use(morgan("dev"));

app.get("/users", (req, res) => res.json({ users: ["Adam", "Beth", "Cecil"] }));

app.get("/error", (req, res) => {
  throw new Error("Something went wrong!");
});


app.listen(3000, () => console.log("Listening on 3000..."));