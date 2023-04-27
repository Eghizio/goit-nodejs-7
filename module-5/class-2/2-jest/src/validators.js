const { reportResult } = require("./analytics"); 

const nameValidator = (name) => name.length >= 3 && name.length <= 32;

const ageValidator = (age) => age >= 0 && age <= 142;

const emailValidator = (email) => {
  if(typeof email !== "string") throw new Error("Email must be a string!");
  return email.includes("@") && email.includes(".");
};

const userValidator = ({ name, age, email }) => {
  const isValid =
    nameValidator(name)
    && ageValidator(age)
    && emailValidator(email);

  reportResult({ name, age, email }, isValid); // sending results to some analytics API (external dependency)

  if (!isValid) throw new Error("Invalid user data!");
  
  return isValid;
};

module.exports = {
  nameValidator,
  ageValidator,
  emailValidator,
  userValidator,
};