const HelloModule = require("./0-hello");

const { message, dupa } = HelloModule;

console.log(message, dupa);
console.log(HelloModule.user);

HelloModule.greet("Teściowa");