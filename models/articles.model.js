const db = require("../db/connection.js");
const articlesRouter = require("../routes/articles.router.js");

exports.selectArticleById = async (article_id) => {
  const results = await db.query(
    `SELECT articles.*,count(comments.comment_id)::int AS comment_count FROM articles JOIN comments ON comments.article_id = articles.article_id WHERE articles.article_id = $1 GROUP BY articles.article_id;`,
    [article_id]
  );

  return results.rows;
};
