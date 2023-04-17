import { Router } from "express";
import * as TasksController from "./modules/tasks/controller.js";

export const api = Router();


api.get("/tasks", TasksController.getAll);

api.get("/tasks/:id", TasksController.getById);

api.post("/tasks", TasksController.create);

api.patch("/tasks/:id", TasksController.updateById);

api.delete("/tasks/:id", TasksController.deleteById);
