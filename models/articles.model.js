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
  if (!vote_count.hasOwnProperty("inc_votes")) {
    return Promise.reject({
      status: 400,
      msg: `Bad request data provided is incorrect`,
    });
  }
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
};

exports.selectArticles = async (
  sort_by = "created_at",
  order = "desc",
  topic
) => {
  const validColumns = [
    "author",
    "title",
    "article_id",
    "body",
    "topic",
    "created_at",
    "votes",
    "comment_count",
  ];

  const validOrderOptions = ["ASC", "asc", "desc", "DESC"];

  if (!validColumns.includes(sort_by)) {
    return Promise.reject({ status: 400, msg: "Invalid sort_by column" });
  }

  if (!validOrderOptions.includes(order)) {
    return Promise.reject({ status: 400, msg: "Invalid order provided" });
  }

  let queryStr = `SELECT articles.*,count(comments.comment_id)::int AS comment_count FROM articles LEFT JOIN comments ON comments.article_id = articles.article_id`;
  const queryValues = [];

  if (topic) {
    queryStr += ` WHERE topic = $1`;
    queryValues.push(topic);
  }

  queryStr += ` GROUP BY articles.article_id ORDER BY ${sort_by} ${order};`;

  const results = await db.query(queryStr, queryValues);

  if (results.rows.length === 0) {
    const topicResult = await db.query(
      `SELECT * FROM topics WHERE slug = $1;`,
      [topic]
    );
    if (topicResult.rows.length === 0) {
      return Promise.reject({
        status: 404,
        msg: `No articles found`,
      });
    }
  }

  return results.rows;
};

exports.selectCommentsByArticleId = async (article_id) => {
  const results = await db.query(
    `SELECT comment_id,votes,created_at,author,body FROM comments WHERE article_id = $1;`,
    [article_id]
  );

  if (results.rows.length === 0) {
    const articleIdResult = await db.query(
      "SELECT * FROM articles WHERE article_id = $1",
      [article_id]
    );
    if (articleIdResult.rows.length === 0) {
      return Promise.reject({
        status: 404,
        msg: `No article found for article_id: ${article_id}`,
      });
    }
  }
  return results.rows;
};
