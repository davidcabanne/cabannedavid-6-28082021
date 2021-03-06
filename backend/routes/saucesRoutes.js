// [1] IMPORT SECT.
// -
const express = require("express");
const saucesCtrl = require("../controllers/saucesCtrl");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

// [2] CREATE ROUTER
// -
const router = express.Router();

// [3] Middlewares
// -
// auth middleware always comes first
// prevents any request to be processed without authentification

// POST request
router.post("/", auth, multer, saucesCtrl.createSauce);

// PUT request | Update / modify an existing sauce
router.put("/:id", auth, multer, saucesCtrl.updateSauce);

// POST request for likes & dislikes
router.post("/:id/like", auth, saucesCtrl.manageLike);

// DELETE request | Delete an existing sauce
router.delete("/:id", auth, saucesCtrl.deleteSauce);

// GET request for ONE specific sauce
router.get("/:id", auth, saucesCtrl.getOneSauce);

// GET request for ALL sauces
router.get("/", auth, saucesCtrl.getAllSauces);

// [=>] EXPORT Router
// -
module.exports = router;
