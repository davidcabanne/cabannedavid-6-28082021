// [1] IMPORT SECT.
// -
const express = require("express");
const userCtrl = require("../controllers/userCtrl");
const checkPassword = require("../middleware/checkPassword");

// [2] CREATE ROUTER
// -
const router = express.Router();

// [3] Middlewares
// -
// POST request => signUp
router.post("/signup", checkPassword, userCtrl.signup);

// POST request => logIn
router.post("/login", userCtrl.login);

// [=>] EXPORT Router
// -
module.exports = router;
