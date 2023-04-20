import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

const { JWT_SECRET } = process.env;

const dataPayload = {
  id: 1337,
  name: "Kuba",
};


console.log({ JWT_SECRET, dataPayload });

const token = jwt.sign(dataPayload, JWT_SECRET, { noTimestamp: true });
console.log({ token });

const verified = jwt.verify(token, JWT_SECRET);
console.log({ verified });

// const maybeVerified = jwt.verify(token, "fakeSecret");
// console.log({ maybeVerified });


// const fakeToken = "ey.dupa321.legitsignaturenoscam";

// jwt.verify(fakeToken, JWT_SECRET, (error, decoded) => {
//   if (error) return console.log("Ooopsie", error); // handle faulty token

//   console.log("Decoded token: ", decoded);
//   // do something with decoded token
// });


console.clear();

const tokenString = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMzNywibmFtZSI6Ikt1YmEiLCJpYXQiOjE2ODE5Mjc5NDV9.C27LSLY8GnM_rX2oohssXakmkzOZHbjx_6EqMMCpNqg";

const [header, payload, signature] = tokenString.split(".");

const decoded = atob(payload);
const encoded = btoa(decoded);

console.log({
  tokenString,
  decoded,
  encoded,
  isPaylodTheSame: encoded === payload
});
