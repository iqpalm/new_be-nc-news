const express = require("express");

const articlesRouter = express.Router();

const {
  getArticleById,
  updateArticleById,
  getArticles,
  getCommentsByArticleId,
  postCommentByArticleId,
} = require("../controllers/articles.controllers");

articlesRouter.get("/:article_id", getArticleById);
articlesRouter.patch("/:article_id", updateArticleById);
articlesRouter.get("/", getArticles);
articlesRouter.get("/:article_id/comments", getCommentsByArticleId);
articlesRouter.post("/:article_id/comments", postCommentByArticleId);

module.exports = articlesRouter;
