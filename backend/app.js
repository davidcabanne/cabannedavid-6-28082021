// [1] IMPORT SECT.
// -
const express = require("express");
const mongoose = require("mongoose");
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");

mongoose
  .connect(
    "mongodb+srv://yungdavo:cluster0011@cluster0.xsxcm.mongodb.net/test?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

// [2] Create express App
// -
const app = express();

// [3] Middlewares
// -
// CORS midWare general | default options // allows app to acess to API
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

// for parsing application/json
app.use(express.json());

// for this route => use *name*Routes
app.use("/api/product", productRoutes);
app.use("/api/auth", userRoutes);

// [=>] EXPORT App
// -
module.exports = app;
