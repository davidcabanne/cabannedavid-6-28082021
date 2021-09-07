// [1] IMPORT SECT.
// -
const multer = require("multer");

// [2] create a dictionary for the img folder
// -
const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
};

// [3] create a config object for multer
// -
const storage = multer.diskStorage({
  // [1] sets destination folder
  destination: (req, file, callback) => {
    callback(null, "images");
  },
  // [2] sets new file name
  filename: (req, file, callback) => {
    // [a] remove space / replace by '_'
    const name = file.originalname.split(" ").join("_");
    // [b] use mime_types to generate file extension
    // element from dictionnary = matches mime type sent from front-end
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + "." + extension);
  },
});

// [=>] EXPORT multer
// -
// multer method => store single image file
module.exports = multer({ storage: storage }).single("image");
