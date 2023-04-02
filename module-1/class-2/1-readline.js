import readline from "readline"; // there is a readline/promises module available as well ;)

const lineReader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log("Please write something...");


lineReader.question("What day of the month is it?\n", (answer) => {
  if (answer === "10") return console.log("It's raining money!");
  console.log("Be frugal!");
});

lineReader.on("line", (input) => {
  if (input === "exit") process.exit();
  console.log("Your input = ", input);
});
