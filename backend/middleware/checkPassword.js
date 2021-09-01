// [1] IMPORT SECT.
// -
const passwordSchema = require("../models/passwordValidator");

// [2] Check if password is valid
// -
module.exports = (req, res, next) => {
  if (!passwordSchema.validate(req.body.password)) {
    res.writeHead(
      400,
      '{"message": "Mot de passe requis : 8 caractères minimum, au moins une majuscule, une minuscule, 2 digits, et sans espaces}',
      { "content-type": "application/json" }
    );
    res.end("Format de mot de passe incorrect");
  } else {
    next();
  }
};
