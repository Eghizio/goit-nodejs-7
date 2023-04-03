import { Router } from "express";
import { booksRouter } from "./books.js";
import { usersRouter } from "./users.js";

export const apiRouter = Router();

apiRouter.use("/users", usersRouter);
apiRouter.use("/books", booksRouter);
