const format = require('pg-format');
const db = require('../connection');

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
    'CREATE TABLE articles (article_id SERIAL PRIMARY KEY, title TEXT NOT NULL, body TEXT NOT NULL, votes INT DEFAULT 0, topic TEXT REFERENCES topics (slug), author TEXT REFERENCES users (username), created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);'
  );
  await db.query(
    'CREATE TABLE comments (comment_id SERIAL PRIMARY KEY, author TEXT REFERENCES users(username), article_id INT REFERENCES articles (article_id), votes INT DEFAULT 0, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, body TEXT NOT NULL)'
  );
  await db.query('');
  // 2. insert data
  console.log(data.articleData);
};

module.exports = seed;
