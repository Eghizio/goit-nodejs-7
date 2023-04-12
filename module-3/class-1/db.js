import { MongoClient, ObjectId, ServerApiVersion } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const { MONGODB_URI } = process.env;

const client = new MongoClient(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

console.log("Connecting to the MongoDB...");

// Top Level Await for modules

await client.connect(async (error) => {
  if (error) return console.log("Ooopsie", error);
});
console.log("Connected to DB!");

const collections = await client.db("test-db").collections();
console.log(collections.map(col => col.collectionName));

const users = client.db("test-db").collection("users");
const usersCount = await users.countDocuments();
console.log({ usersCount });

const user = await users.findOne();
console.log({ user });


const findUserByName = (name) => users.findOne({ name });

const adam = await findUserByName("Adam");
const niedam = await findUserByName("nieAdam");
console.log({ adam, niedam });


const x = await users.insertOne({ name: "Beth", age: 456, books: ["First", "Second"] });
console.log({ x });

const d = await users.deleteOne({ _id: new ObjectId("6436fb62de1e093c5591cf64") });
const dm = await users.deleteMany({ name: "Beth" });
console.log({ d, dm });

await users.insertOne({ name: "Maryla", age: 9001, books: ["The Everlasting One", "Ancient being"] });