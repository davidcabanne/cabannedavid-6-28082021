// [1] IMPORT SECT.
// -
const passwordValidator = require("password-validator");

// [2] Create a more secure password schema
// -
const passwordSchema = new passwordValidator();

// [3] passwordSchema properties
passwordSchema
  .is()
  .min(8) // Minimum length 8
  .is()
  .max(30) // Maximum length 30
  .has()
  .uppercase() // Must have uppercase letters
  .has()
  .lowercase() // Must have lowercase letters
  .has()
  .digits(2) // Must have at least 2 digits
  .has()
  .not()
  .spaces() // Should not have spaces
  .is()
  .not()
  .oneOf(["Passw0rd", "Password123"]); // Blacklist these values

// [=>] MODULE EXPORT
// -
module.exports = passwordSchema;
