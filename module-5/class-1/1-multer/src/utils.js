import fs from "node:fs/promises";

const isAccessible = (dir) => fs.access(dir).then(() => true).catch(() => false);

export const initDirectory = async (dir) => {
  if (await isAccessible(dir)) return console.log(`Directory '${dir}' already exists.`);

  console.log(`Initializing directory '${dir}'...`);
  await fs.mkdir(dir);
};

export const sleep = (ms) => new Promise(r => setTimeout(r, ms));
