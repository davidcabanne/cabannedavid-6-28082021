// [1] IMPORT SECT.
// -
const mongoose = require("mongoose");
const validate = require("mongoose-validator");

const nameValidator = [
  validate({
    validator: "isLength",
    arguements: [3, 50],
    message: "Le nom de votre sauce doit contenir entre 3 et 50 caractères.",
  }),
  validate({
    validator: "matches",
    arguements: /^[a-z\d\-_\s]+$/i, // ReGex prevents user to write symbols
    message: "Seulement les chiffres et les lettres sont autorisés.",
  }),
];

const manufacturerValidator = [
  validate({
    validator: "isLength",
    arguements: [3, 50],
    message: "Le nom du fabricant doit contenir entre 3 et 50 caractères.",
  }),
  validate({
    validator: "matches",
    arguements: /^[a-z\d\-_\s]+$/i, // ReGex prevents user to write symbols
    message: "Seulement les chiffres et les lettres sont autorisés.",
  }),
];

const descriptionValidator = [
  validate({
    validator: "isLength",
    arguements: [10, 200],
    message:
      "La description doit contenir entre {ARGS[0]} et {ARGS[1]} caractères.",
  }),
  validate({
    validator: "matches",
    arguements: /^[a-z\d\-_\s]+$/i, // ReGex prevents user to write symbols
    message: "Seulement les chiffres et les lettres sont autorisés.",
  }),
];

const pepperValidator = [
  validate({
    validator: "isLength",
    arguements: [3, 20],
    message: "L'ingrédient doit contenir entre 3 et 20 caractères.",
  }),
  validate({
    validator: "matches",
    arguements: /^[a-z\d\-_\s]+$/i, // ReGex prevents user to write symbols
    message: "Seulement les chiffres et les lettres sont autorisés.",
  }),
];

// [2] Create a more secure input schema
// -
const checkSchema = new mongoose.Schema({
  name: { type: String, required: true, validate: nameValidator },
  manufacturer: {
    type: String,
    required: true,
    validate: manufacturerValidator,
  },
  description: { type: String, required: true, validate: descriptionValidator },
  mainPepper: { type: String, required: true, validate: pepperValidator },
});

// [=>] MODULE EXPORT
// -
module.exports = checkSchema;
