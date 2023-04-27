// Let's test some of our code

// const capitalize = (text) => text.charAt(0).toUpperCase() + text.slice(1);

// Let's refactor our code
// const capitalize = (text) => text.charAt(1).toUpperCase() + text.slice(0); // this is bugged!
// Debugging!
// It works!
const capitalize = text => text.slice(0,1).toUpperCase() + text.slice(1, text.length); // refactored (tbh not better xd)


const result = capitalize("dupa");
console.log({ result, isOk: result === "Dupa" });

const testCases = [
  { label: "Should capitalize adam", input: "adam", expected: "Adam" },
  { label: "Should capitalize beth", input: "beth", expected: "Beth" },
  { label: "Should return the same output for numbers", input: "321", expected: "321" },
  // { label: "Should return all upper case", input: "KUBA", expected: "bbbb" },
  { label: "Should return a name with first letter capitalized", input: "Kuba", expected: "Kuba" },
  { label: "Should return output matching the input", input: "KUBA", expected: "KUBA" },
];

const testSuiteResult = testCases.map(({ input, expected, label }, i) => {
  const result = capitalize(input);

  const isOk = result === expected;

  console.log(`${i+1} ${isOk ? "✅" : "❌"} ${label}`);

  if(!isOk) {
    console.log({ input, expected, isOk });
  }

  return isOk;
}).every(Boolean);

console.log(`\n${testSuiteResult ? "✅" : "❌"} ${testSuiteResult ? "All tests passing!" : "Some of the tests failed :("}`);
