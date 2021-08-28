// [1] IMPORT SECT.
// -
const express = require("express");
const productCtrl = require("../controllers/productCtrl");
const auth = require("../middleware/auth");

// [2] CREATE ROUTER
// -
const router = express.Router();

// [3] Middlewares
// -
// POST request
router.post("/", auth, productCtrl.createProduct);

// PUT request | Update / modify an existing product
router.put("/:id", auth, productCtrl.updateProduct);

// DELETE request | Delete an existing product
router.delete("/:id", auth, productCtrl.deleteProduct);

// GET request for ONE specific product
router.get("/:id", auth, productCtrl.getOneProduct);

// GET request for ALL products
router.get("/", auth, productCtrl.getAllProducts);

// [=>] EXPORT Router
// -
module.exports = router;
