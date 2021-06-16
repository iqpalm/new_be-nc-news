const express = require("express");

const articlesRouter = express.Router();

const {
  getArticleById,
  updateArticleById,
  getArticles,
} = require("../controllers/articles.controllers");

articlesRouter.get("/:article_id", getArticleById);
articlesRouter.patch("/:article_id", updateArticleById);
articlesRouter.get("/", getArticles);

module.exports = articlesRouter;
