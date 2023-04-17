import * as TasksService from "./service.js";

export const getAll = async (req, res) => {
  const tasks = await TasksService.getAll();
  return res.json({ tasks });
};

export const getById = async (req, res) => {
  const id = req.params.id;

  const requestedTask = await TasksService.getById(id);

  if (!requestedTask) return res.sendStatus(404);

  return res.json(requestedTask);
};

export const create = async (req, res) => {
  const { name } = req.body; // Validate

  if (!name) return res.sendStatus(400);

  const createdTask = await TasksService.create(name);

  return res.status(201).json(createdTask);
};

export const updateById = async (req, res) => {
  const id = req.params.id;
  const updatedTaskFields = req.body; // Validate

  const updatedTask = await TasksService.updateById(id, updatedTaskFields);

  return res.json(updatedTask);
};

export const deleteById = async (req, res) => {
  const id = req.params.id;

  const deletedTask = await TasksService.deleteById(id);

  if (!deletedTask) return res.sendStatus(404);

  return res.json(deletedTask);
};