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
// POST request
router.post("/", auth, multer, saucesCtrl.createSauce);

// PUT request | Update / modify an existing sauce
router.put("/:id", auth, multer, saucesCtrl.updateSauce);

// DELETE request | Delete an existing sauce
router.delete("/:id", auth, saucesCtrl.deleteSauce);

// GET request for ONE specific sauce
router.get("/:id", auth, saucesCtrl.getOneSauce);

// GET request for ALL sauces
router.get("/", auth, saucesCtrl.getAllSauces);

// POST request for likes & dislikes
router.post("/:id/like", auth, saucesCtrl.manageLike);

// [=>] EXPORT Router
// -
module.exports = router;
