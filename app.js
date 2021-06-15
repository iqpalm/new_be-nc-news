const express = require("express");

const apiRouter = require("./routes/api.router");

const {
  customErrors,
  handle500Errors,
  handlePSQLErrors,
  send404,
} = require("./controllers/errors.controllers");

const app = express();

app.use(express.json());

app.use("/api", apiRouter);

app.use(send404);

app.use(customErrors);
app.use(handlePSQLErrors);
app.use(handle500Errors);

module.exports = app;
