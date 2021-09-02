// [1] IMPORT SECT.
// -
const mongoose = require("mongoose");
const sanitizerPlugin = require("mongoose-sanitizer-plugin");

const sauceSchema = mongoose.Schema({
  userId: { type: String, required: true },
  name: {
    type: String,
    required: true,
    minLength: [3, "Must be at least 3 characters, got {VALUE}"],
    maxLength: [30, "Must be less than 50 characters, got {VALUE}"],
  },
  manufacturer: { type: String, required: true, minLength: 3, maxLength: 30 },
  description: { type: String, required: true, minLength: 3, maxLength: 50 },
  mainPepper: { type: String, required: true, minLength: 3, maxLength: 20 },
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
