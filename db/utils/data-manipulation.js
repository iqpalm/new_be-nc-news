// extract any functions you are using to manipulate your data, into this file
exports.mappedTopics = (topicData) => {
  return topicData.map((topic) => {
    return [topic.slug, topic.description];
  });
};

exports.mappedUsers = (userData) => {
  return userData.map((user) => {
    return [user.username, user.avatar_url, user.name];
  });
};

exports.mappedArticles = (articleData) => {
  return articleData.map((article) => {
    return [
      article.title,
      article.body,
      article.votes || 0,
      article.topic,
      article.author,
      article.created_at,
    ];
  });
};

exports.createArticleRef = (articleRows) => {
  const articleRef = {};
  articleRows.forEach((article) => {
    articleRef[article.title] = article.article_id;
  });
  return articleRef;
};

exports.formatCommentData = (commentData, articleRef) => {
  return commentData.map((comment) => {
    return [
      comment.created_by,
      articleRef[comment.belongs_to],
      comment.votes,
      comment.created_at,
      comment.body,
    ];
  });
};
