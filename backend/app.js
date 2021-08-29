// [1] IMPORT SECT.
// -
const express = require("express");
require("./config/mongodb");
const saucesRoutes = require("./routes/saucesRoutes");
const userRoutes = require("./routes/userRoutes");
// allows to access the file system paths
const path = require("path");

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

// routing manager for 'images' folder
// middleware allows to load files in folder
app.use("/images", express.static(path.join(__dirname, "images")));

// for this route => use *dirname*Routes
app.use("/api/sauces", saucesRoutes);
app.use("/api/auth", userRoutes);

// [=>] EXPORT App
// -
module.exports = app;
