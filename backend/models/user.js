// [1] IMPORT SECT.
// -
const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

// [2] User Schema
// -
const userSchema = mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: [true, "Veuillez entrer votre adresse email"],
    match: [
      /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
      "Veuillez entrer une adresse email correcte",
    ],
  },
  password: {
    type: String,
    required: [true, "Veuillez choisir un mot de passe"],
  },
});

// [2] Add validator as a plugin
// -
userSchema.plugin(uniqueValidator);

// [=>] MODULE EXPORT
// -
module.exports = mongoose.model("User", userSchema);
