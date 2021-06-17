const express = require("express");

const articlesRouter = express.Router();

const {
  getArticleById,
  updateArticleById,
  getArticles,
  getCommentsByArticleId,
  postCommentByArticleId,
} = require("../controllers/articles.controllers");

articlesRouter
  .route("/:article_id")
  .get(getArticleById)
  .patch(updateArticleById);

articlesRouter
  .route("/:article_id/comments")
  .get(getCommentsByArticleId)
  .post(postCommentByArticleId);

articlesRouter.get("/", getArticles);

module.exports = articlesRouter;
