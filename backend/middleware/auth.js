// [1] IMPORT SECT.
// -
const jwt = require("jsonwebtoken");

// [=>] EXPORT middleware
module.exports = (req, res, next) => {
  try {
    // targets headers => authorization
    // split and select [1]
    // => [0] = [bearer] & [1] = [token]
    const token = req.headers.authorization.split(" ")[1];
    // verify token
    const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);

    // targets userId in decodedToken
    const userId = decodedToken.userId;
    if (req.body.userId && req.body.userId !== userId) {
      throw "User ID non valable !";
    } else {
      // if all good => to next middleware !
      next();
    }
  } catch (error) {
    res.status(401).json({ error: error | "Requête non authentifiée !" });
  }
};
