const express = require("express");

const topicsRouter = require("./topics.router");
const articlesRouter = require("./articles.router");

const { getEndpoints } = require("../controllers/api.controllers");
const apiRouter = express.Router();

apiRouter.get("/", getEndpoints);
apiRouter.use("/topics", topicsRouter);
apiRouter.use("/articles", articlesRouter);

module.exports = apiRouter;
