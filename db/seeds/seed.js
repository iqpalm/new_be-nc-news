const format = require('pg-format');
const db = require('../connection');
const { mappedTopics } = require('../utils/');

const seed = async (data) => {
  const { articleData, commentData, topicData, userData } = data;
  await db.query('DROP TABLE IF EXISTS comments;');
  await db.query('DROP TABLE IF EXISTS articles;');
  await db.query('DROP TABLE IF EXISTS users;');
  await db.query('DROP TABLE IF EXISTS topics;');
  await db.query(
    'CREATE TABLE topics (slug TEXT UNIQUE PRIMARY KEY NOT NULL, description TEXT NOT NULL);'
  );
  await db.query(
    'CREATE TABLE users (username TEXT UNIQUE PRIMARY KEY NOT NULL, avatar_url TEXT, name VARCHAR(100) NOT NULL);'
  );
  await db.query(
    "CREATE TABLE articles (article_id SERIAL PRIMARY KEY, title TEXT NOT NULL, body TEXT NOT NULL, votes INT DEFAULT '0', topic TEXT REFERENCES topics (slug), author TEXT REFERENCES users (username), created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);"
  );
  await db.query(
    'CREATE TABLE comments (comment_id SERIAL PRIMARY KEY, author TEXT REFERENCES users(username), article_id INT REFERENCES articles (article_id), votes INT DEFAULT 0, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, body TEXT NOT NULL)'
  );

  const mappedTopicsData = mappedTopics(topicData);

  await db.query(
    format(
      `INSERT INTO topics (slug,description) VALUES %L RETURNING *;`,
      mappedTopicsData
    )
  );

  const mappedUsers = userData.map((user) => {
    return [user.username, user.avatar_url, user.name];
  });

  await db.query(
    format(
      `INSERT INTO users (username,avatar_url,name) VALUES %L RETURNING *;`,
      mappedUsers
    )
  );

  const mappedArticles = articleData.map((article) => {
    return [
      article.title,
      article.body,
      article.votes || 0,
      article.topic,
      article.author,
      article.created_at
    ];
  });

  const results = await db.query(
    format(
      `INSERT INTO articles (title,body,votes,topic,author,created_at) VALUES %L RETURNING *;`,
      mappedArticles
    )
  );

  let articleRef = {};
  results.rows.forEach((result) => {
    articleRef[result.title] = result.article_id;
  });

  const commentsCopy = [];
  commentData.forEach((comment, i) => {
    commentsCopy[i] = { ...comment };
  });

  commentsCopy.forEach((comment) => {
    comment.articleId = articleRef[comment.belongs_to];
  });

  const mappedComments = commentsCopy.map((comment) => {
    return [
      comment.created_by,
      comment.articleId,
      comment.votes || 0,
      comment.created_at,
      comment.body
    ];
  });

  await db.query(
    format(
      `INSERT INTO comments (author, article_id, votes, created_at, body ) VALUES %L RETURNING *;`,
      mappedComments
    )
  );
};

module.exports = seed;
