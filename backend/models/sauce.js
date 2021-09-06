// [1] IMPORT SECT.
// -
const mongoose = require("mongoose");
const sanitizerPlugin = require("mongoose-sanitizer-plugin");

const sauceSchema = mongoose.Schema({
  userId: { type: String, required: true },
  name: {
    type: String,
    required: true,
    minLength: [3, "Must be at least 3 characters"],
    maxLength: [30, "Must be less than 30 characters"],
  },
  manufacturer: {
    type: String,
    required: true,
    minLength: [3, "Must be at least 3 characters"],
    maxLength: [30, "Must be less than 30 characters"],
  },
  description: {
    type: String,
    required: true,
    minLength: [3, "Must be at least 3 characters"],
    maxLength: [50, "Must be less than 50 characters"],
  },
  mainPepper: {
    type: String,
    required: true,
    minLength: [3, "Must be at least 3 characters"],
    maxLength: [30, "Must be less than 30 characters"],
  },
  imageUrl: { type: String, required: true },
  heat: { type: Number, required: true },
  likes: { type: Number },
  dislikes: { type: Number },
  usersLiked: { type: [String] },
  usersDisliked: { type: [String] },
});

// [2] PLUGIN | Sanitizer
// -
// Sanitizer for Mongoose model, cleans model data before saving in MongoDB
// Uses HTML Sanitizer from Google Caja in order to purify
sauceSchema.plugin(sanitizerPlugin);

// [=>] MODULE EXPORT
// -
module.exports = mongoose.model("Sauce", sauceSchema);
