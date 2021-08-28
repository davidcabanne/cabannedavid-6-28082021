// import http node package
const http = require("http");

// create Server
const server = http.createServer((req, res) => {
  res.end("voilà la nouvelle nouvelle réponse du server !");
});

// listening Server | env variable | setting up default port
server.listen(process.env.PORT || 3000);
