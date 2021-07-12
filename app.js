const express = require("express");
const cors = require("cors");
const apiRouter = require("./routes/api.router");

const { getStatus } = require("./controllers/home.controller");

const {
  customErrors,
  handle500Errors,
  handlePSQLErrors,
  send404,
} = require("./controllers/errors.controllers");

const app = express();

app.use(cors());
app.use(express.json());

app.route("/").get(getStatus);
app.use("/api", apiRouter);

app.use(send404);

app.use(customErrors);
app.use(handlePSQLErrors);
app.use(handle500Errors);

module.exports = app;
