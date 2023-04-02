// import fs from "fs";
import fs from "fs/promises";
import { join } from "path";

const data = { secret: "dupa" };

// fs.writeFileSync("db.txt", JSON.stringify(data) + "\n", { flag: "a" });

// const retrievedData = fs.readFileSync("db.txt", { encoding: "utf-8" });

// console.log(retrievedData.toString());
// console.log(retrievedData);

// const objects = retrievedData.split("\n").filter(Boolean);

// objects.forEach((obj, i) => console.log(i, JSON.parse(obj).secret));


const serializeData = (data) => JSON.stringify(data) + "\n";

await fs.writeFile("db.txt", serializeData(data), { flag: "a" });

const contents = await fs.readFile("db.txt", { encoding: 'utf-8' });

console.log(contents)


const printDirectory = async (directoryName) => {
  const files = await fs.readdir(directoryName);

  const stats = await Promise.all(files.map(async (file) => {
    const filePath = join(directoryName, file);

    const { size, mtime } = await fs.stat(filePath);
    return {
      name: file,
      size,
      date: mtime,
    };
  }));

  console.table(stats);
};

printDirectory(".");
// printDirectory("npm-example");