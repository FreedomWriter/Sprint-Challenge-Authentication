const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const authenticate = require("../auth/authenticate-middleware.js");
const authRouter = require("../auth/auth-router.js");
const jokesRouter = require("../jokes/jokes-router.js");

const server = express();

server.use(morgan("dev"));
server.use(helmet());
server.use(cors());
server.use(express.json());

server.use("/api/auth", authRouter);
server.use("/api/jokes", authenticate, jokesRouter);

server.get("/", (req, res) => {
  res.send("<h2>Your dad isn't as funny as mine</h2>");
});

server.use((err, req, res, next) => {
  console.log(err.message);
  res.status(500).json({
    message: "Something went wrong!",
    error: err.message
  });
});
module.exports = server;
