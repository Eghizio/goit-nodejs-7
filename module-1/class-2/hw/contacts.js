import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";

const contactsPath = path.join("db", "contacts.json");


export const listContacts = () => fs.readFile(contactsPath, { encoding: "utf-8" });

export const getContactById = (id) => listContacts().then(contacts => JSON.parse(contacts).find(contact => contact.id === id));

export const removeContact = (id) => listContacts().then(contacts => fs.writeFile(contactsPath, JSON.stringify(JSON.parse(contacts).filter(contact => contact.id !== id), null, 2)));

export const addContact = (name, email, phone) => listContacts().then(contacts => fs.writeFile(contactsPath, JSON.stringify([...JSON.parse(contacts), {id: nanoid(), name, email, phone }], null, 2)));
