import express from "express";
import colors from "colors";

const app = express();

const logger = (req, res, next) => {
  const { method, originalUrl } = req;

  const date = new Date().toLocaleString();
  console.log(colors.yellow(`[${method}] ${date} - ${originalUrl}`));

  next();
};

const visitsCounter = () => {
  // let visits = 0;
  const visits = {};

  return (req, res, next) => {
    const { originalUrl } = req;

    visits[originalUrl] = visits[originalUrl] ? ++visits[originalUrl] : 1;
    console.log(colors.magenta(`Visits: (${visits[originalUrl]}) - ${originalUrl}`));

    next();
  };
};

// app.use(visitsCounter);
// app.use(logger);

app.use(logger, visitsCounter());


app.get("/", (request, response) => {
  return response.send("Hello there!");
});

app.get("/hi", (request, response) => {
  return response.send("<h1 style='color:dodgerblue'>Hi!</h1>");
});

app.use((req, res) => {
  const notFoundMessage = "Ooopsie! You got lost? There is no such path!";
  return res
    .status(404)
    .send(`<h1 style='color:crimson'>${notFoundMessage}</h1>`);
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(colors.cyan(`[server] Server running on port ${PORT}`));
});