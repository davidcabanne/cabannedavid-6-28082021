// [1] IMPORT SECT.
// 'http' node package
const http = require("http");
// 'express' App
const app = require("./app");
// dotEnv variables
const dotEnv = require("dotenv").config({ path: "./config/.env" });
const configMongodb = require("./config/mongodb");

// [2] SERVER SECT.
// returns a valid PORT as a nbr or a string
const normalizePort = (val) => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};
// env variable | setting up default port
const port = normalizePort(process.env.PORT);
// tells express which port to set
app.set("port", port);

// [3] ERROR SECT.
const errorHandler = (error) => {
  if (error.syscall !== "listen") {
    throw error;
  }
  const address = server.address();
  const bind =
    typeof address === "string" ? "pipe " + address : "port: " + port;
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges.");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use.");
      process.exit(1);
      break;
    default:
      throw error;
  }
};

// [4] CREATE Server
// app = function => receives req & res
const server = http.createServer(app);

server.on("error", errorHandler);
server.on("listening", () => {
  const address = server.address();
  const bind = typeof address === "string" ? "pipe " + address : "port " + port;
  console.log("Listening on " + bind);
});

// [=>] LISTEN Server on chosen port
server.listen(port);
