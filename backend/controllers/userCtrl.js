// [1] IMPORT SECT.
// -
const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
// dotEnv variables
const dotEnv = require("dotenv").config({ path: "./config/.env" });

// [2] middleWares Functions
// -
exports.signup = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = new User({
        email: req.body.email,
        password: hash,
      });
      user
        .save()
        .then(() => res.status(201).json({ message: "User créé !" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: "User non trouvé !" });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: "Password incorrect !" });
          }
          res.status(200).json({
            userId: user._id,
            // jsonWebToken => function "sign", takes 3 args
            // token will hold encoded userId => create new signed objects and auth
            // if user[1] uploads a new sauce, it prevents user[2] to modify it
            token: jwt.sign(
              {
                // [1] arg = > userId matches
                userId: user._id,
              },
              // [2] arg => secret token
              process.env.SECRET_TOKEN,
              {
                // [3] arg => token duration
                expiresIn: "24h",
              }
            ),
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};
