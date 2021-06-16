\c nc_news_test

--SELECT articles.*,count(comments.comment_id) FROM articles JOIN comments ON comments.article_id = articles.article_id WHERE articles.article_id = 1 GROUP BY articles.article_id;

--SELECT articles.*,count(comments.comment_id) FROM articles LEFT JOIN comments ON comments.article_id = articles.article_id WHERE articles.article_id = 2 GROUP BY articles.article_id;

--SELECT * FROM articles ORDER BY created_at DESC;

SELECT * FROM articles WHERE topic = 'mitch' ORDER BY title asc;