// [1] IMPORT SECT.
// -
const express = require("express");
const userCtrl = require("../controllers/userCtrl");

// [2] CREATE ROUTER
// -
const router = express.Router();

// [3] Middlewares
// -
// POST request => signUp
router.post("/", userCtrl.signup);

// POST request => logIn
router.post("/", userCtrl.login);

// [=>] EXPORT Router
// -
module.exports = router;
