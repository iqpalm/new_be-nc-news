exports.selectEndpoints = async (article_id) => {
  const endPoints = {
    "GET /api": {
      description:
        "serves up a json representation of all the available endpoints of the api",
    },
    "GET /api/topics": {
      description: "serves an array of all topics",
      queries: [],
      exampleResponse: {
        topics: [{ slug: "football", description: "Footie!" }],
      },
    },
    "GET /api/articles": {
      description: "serves an array of all topics",
      queries: ["author", "topic", "sort_by", "order"],
      exampleResponse: {
        articles: [
          {
            title: "Seafood substitutions are increasing",
            topic: "cooking",
            author: "weegembump",
            body: "Text from the article..",
            created_at: 1527695953341,
          },
        ],
      },
    },
    "GET /api/articles/:article_id": {
      description:
        "serves an array of one article with the corresponding article_id",
      params: ["article_id"],
      exampleResponse: {
        article: [
          {
            title: "Seafood substitutions are increasing",
            topic: "cooking",
            author: "weegembump",
            body: "Text from the article..",
            created_at: 1527695953341,
            article_id: 12,
            votes: 10,
            comment_count: 10,
          },
        ],
      },
    },
    "PATCH /api/articles/:article_id": {
      description:
        "serves an array of one updated article with the corresponding article_id with the votes amended",
      params: ["article_id"],
      request: { inc_votes: 10 },
      exampleResponse: {
        article: [
          {
            title: "Seafood substitutions are increasing",
            topic: "cooking",
            author: "weegembump",
            body: "Text from the article..",
            created_at: 1527695953341,
            article_id: 12,
            votes: 10,
          },
        ],
      },
    },
    "GET /api/articles/:article_id/comments": {
      description:
        "serves an array of comments for the corresponding article_id",
      params: ["article_id"],
      exampleResponse: {
        article: [
          {
            comment_id: 12,
            author: "weegembump",
            body: "Text from the article..",
            created_at: 1527695953341,
            votes: 10,
          },
        ],
      },
    },
    "POST /api/articles/:article_id/comments": {
      description:
        "serves an array of comment for the corresponding article_id",
      params: ["article_id"],
      request: {
        username: "icellusedkars",
        body: "The click is inevitable",
      },
      exampleResponse: {
        article: [
          {
            comment_id: 12,
            author: "weegembump",
            body: "Text from the article..",
            article_id: 2,
            created_at: 1527695953341,
            votes: 0,
          },
        ],
      },
    },
  };
  return endPoints;
};
