import { Task } from "./model.js";

export const getAll = () => Task.find({});

export const getById = (id) => Task.findOne({ _id: id });

export const create = (name) => Task.create({ name });

export const updateById = (id, task) => Task.findOneAndUpdate({ _id: id }, task, { new: true });

export const deleteById = (id) => Task.findOneAndDelete({ _id: id });