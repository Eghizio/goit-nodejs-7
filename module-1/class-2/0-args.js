import colors from "colors";

const args = process.argv.slice(2);

const getArg = (argName) => args
  .find(arg => arg.startsWith(`${argName}=`))
  .slice(argName.length + 1);


const color = getArg("color")
const msg = getArg("msg");

console.log({ color, msg });


const prettyPrint = (color, msg = "Please provide a msg argument") => {
  const coloringFunction = colors[color];

  const textToPrint = coloringFunction ? coloringFunction(msg) : msg;

  console.log(textToPrint);
};

prettyPrint(color, msg);