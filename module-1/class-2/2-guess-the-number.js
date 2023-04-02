// Plan out step by step TDD style
// TODO: Show guessing game surprise!
import * as commander from "commander";
import readline from "readline";
import fs from "fs";


const getResultsFileName = () => {
  commander.program.option(
    "-f, --file [type]",
    "File where we will save our game results",
    "results.txt"
  );

  commander.program.parse(process.argv);

  return commander.program.opts().file;
};


const isNumber = (val) => typeof val === "number" && !isNaN(val);

const lineReader = readline.createInterface({ input: process.stdin, output: process.stdout });

console.log("Please provide a number!");

const MAX = 1000;
const SECRET_NUMBER = Math.round(Math.random() * MAX);

let tries = 0;

lineReader.on("line", (answer) => {
  const guess = Number.parseInt(answer);

  if (!isNumber(guess)) {
    return console.log(`${answer} is not a number. Please provide a legit value...`,);
  }

  tries++;

  if (guess === SECRET_NUMBER) {
    console.log(`Hooray! You've won! ${SECRET_NUMBER} was the secret number!`);
    const msg = `You guessed after ${tries} tries!`;
    console.log(msg);
    fs.appendFileSync(getResultsFileName(), `${new Date().toISOString()} ${msg}\n`);
    process.exit();
  }

  if (guess < SECRET_NUMBER) console.log("More");
  if (guess > SECRET_NUMBER) console.log("Less");
});
