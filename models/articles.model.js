const db = require("../db/connection.js");

exports.selectArticleById = async (article_id) => {
  const results = await db.query(
    `SELECT articles.*,count(comments.comment_id)::int AS comment_count FROM articles LEFT JOIN comments ON comments.article_id = articles.article_id WHERE articles.article_id = $1 GROUP BY articles.article_id;`,
    [article_id]
  );

  if (results.rows.length === 0) {
    return Promise.reject({
      status: 404,
      msg: `No article found for article_id: ${article_id}`,
    });
  }
  return results.rows;
};

exports.amendArticleById = async (article_id, vote_count) => {
  if (vote_count.hasOwnProperty("inc_votes")) {
    const results = await db.query(
      `UPDATE articles SET votes = votes + $2 WHERE article_id = $1 RETURNING *;`,
      [article_id, vote_count.inc_votes]
    );

    if (results.rows.length === 0) {
      return Promise.reject({
        status: 404,
        msg: `No article found for article_id: ${article_id}`,
      });
    }
    return results.rows;
  } else {
    return Promise.reject({
      status: 400,
      msg: `Bad request data provided is incorrect`,
    });
  }
};
