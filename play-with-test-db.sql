\c nc_news_test

SELECT articles.*,count(comments.comment_id) FROM articles JOIN comments ON comments.article_id = articles.article_id WHERE articles.article_id = 1 GROUP BY articles.article_id;
