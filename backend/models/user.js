// [1] IMPORT SECT.
// -
const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

// [2] User Schema
// -
const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// [2] Add validator as a plugin
// -
userSchema.plugin(uniqueValidator);

// [=>] MODULE EXPORT
// -
module.exports = mongoose.model("User", userSchema);
