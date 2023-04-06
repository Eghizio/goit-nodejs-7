import dotenv from "dotenv";

dotenv.config();

const SmsSender = ({ apiKey }) => {
  if (!apiKey) throw new Error("No API key provided!");

  const send = (message) => {
    console.log(`Sending message...`);
    // We send a request to SMS provider with our message and API key
    // SMS provider checks if API key is valid
    console.log({ apiKey })
  };

  return { send };
};



const sender = SmsSender({ apiKey: process.env.API_KEY });

sender.send("Hello there");
