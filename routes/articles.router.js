const express = require("express");

const articlesRouter = express.Router();

const { getArticleById } = require("../controllers/articles.controllers");

articlesRouter.get("/:article_id", getArticleById);

module.exports = articlesRouter;
