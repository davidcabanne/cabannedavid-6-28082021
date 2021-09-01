// [1] IMPORT SECT.
// -
const mongoose = require("mongoose");
const sanitizerPlugin = require("mongoose-sanitizer-plugin");
const uniqueValidator = require("mongoose-unique-validator");
const mongooseTypeEmail = require("mongoose-type-email");

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
    required: [true, "Veuillez entrer votre mot de passe"],
  },
});

// [2] PLUGIN | Validator
// -
userSchema.plugin(uniqueValidator);

// [3] PLUGIN | Sanitizer
// -
// Sanitizer for Mongoose model, cleans model data before saving in MongoDB
// Uses HTML Sanitizer from Google Caja in order to purify
userSchema.plugin(sanitizerPlugin);

// [=>] MODULE EXPORT
// -
module.exports = mongoose.model("User", userSchema);
