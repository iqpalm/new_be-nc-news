const db = require("../db/connection.js");
const testData = require("../db/data/test-data/index.js");
const seed = require("../db/seeds/seed.js");
const app = require("../app");
const request = require("supertest");

beforeEach(() => {
  return seed(testData);
});

afterAll(() => {
  return db.end();
});

describe("GET - /api/topics", () => {
  test("GET - status 200 - responds with an array of topic objects", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then((res) => {
        expect(res.body).toEqual({
          topics: [
            { slug: "mitch", description: "The man, the Mitch, the legend" },
            { slug: "cats", description: "Not dogs" },
            { slug: "paper", description: "what books are made of" },
          ],
        });
      });
  });
});

describe("GET - /*", () => {
  test("GET - status 404 path not found- ", () => {
    return request(app)
      .get("/api/tropics")
      .expect(404)
      .then((res) => {
        expect(res.body).toEqual({ msg: "invalid path" });
      });
  });
});

describe("GET /api/articles/:article_id", () => {
  test("GET - status 200 - responds with an article object", () => {
    return request(app)
      .get("/api/articles/1")
      .expect(200)
      .then((res) => {
        expect(res.body).toEqual({
          article: [
            {
              author: "butter_bridge",
              title: "Living in the shadow of a great man",
              article_id: 1,
              body: "I find this existence challenging",
              topic: "mitch",
              created_at: "2020-07-09T20:11:00.000Z",
              votes: 100,
              comment_count: 13,
            },
          ],
        });
      });
  });
});

describe("GET /api/articles/:article_id", () => {
  test("GET - status 200 - responds with an article object even when no comments with comment_count = 0", () => {
    return request(app)
      .get("/api/articles/2")
      .expect(200)
      .then((res) => {
        expect(res.body).toEqual({
          article: [
            {
              author: "icellusedkars",
              title: "Sony Vaio; or, The Laptop",
              article_id: 2,
              body: "Call me Mitchell. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would buy a laptop about a little and see the codey part of the world. It is a way I have of driving off the spleen and regulating the circulation. Whenever I find myself growing grim about the mouth; whenever it is a damp, drizzly November in my soul; whenever I find myself involuntarily pausing before coffin warehouses, and bringing up the rear of every funeral I meet; and especially whenever my hypos get such an upper hand of me, that it requires a strong moral principle to prevent me from deliberately stepping into the street, and methodically knocking people’s hats off—then, I account it high time to get to coding as soon as I can. This is my substitute for pistol and ball. With a philosophical flourish Cato throws himself upon his sword; I quietly take to the laptop. There is nothing surprising in this. If they but knew it, almost all men in their degree, some time or other, cherish very nearly the same feelings towards the the Vaio with me.",
              topic: "mitch",
              created_at: "2020-10-16T05:03:00.000Z",
              votes: 0,
              comment_count: 0,
            },
          ],
        });
      });
  });
});

describe("GET /api/articles/somethingwrong", () => {
  test("GET - status 400 bad request- ", () => {
    return request(app)
      .get("/api/articles/somethingwrong")
      .expect(400)
      .then((res) => {
        expect(res.body).toEqual({
          msg: "Bad request - invalid type used in URL",
        });
      });
  });
});

describe("GET /api/articles/99999", () => {
  test("GET - status No article found for article_id- ", () => {
    return request(app)
      .get("/api/articles/99999")
      .expect(404)
      .then((res) => {
        expect(res.body).toEqual({
          msg: "No article found for article_id: 99999",
        });
      });
  });
});

describe("PATCH /api/articles/:article_id", () => {
  test("PATCH - status 200 - responds with an updated article object", () => {
    const articleUpdates = { inc_votes: 10 };

    return request(app)
      .patch("/api/articles/1")
      .send(articleUpdates)
      .expect(200)
      .then((res) => {
        expect(res.body).toEqual({
          article: [
            {
              author: "butter_bridge",
              title: "Living in the shadow of a great man",
              article_id: 1,
              body: "I find this existence challenging",
              topic: "mitch",
              created_at: "2020-07-09T20:11:00.000Z",
              votes: 110,
            },
          ],
        });
      });
  });
});

describe("PATCH /api/articles/:article_id", () => {
  test("PATCH - status 400 - responds with an error when no inc_votes in request body", () => {
    const articleUpdates = { cats: 10 };

    return request(app)
      .patch("/api/articles/1")
      .send(articleUpdates)
      .expect(400)
      .then((res) => {
        expect(res.body).toEqual({
          msg: "Bad request data provided is incorrect",
        });
      });
  });
});

describe("PATCH /api/articles/:article_id", () => {
  test("PATCH - status 400 - responds with an error when inc_votes in request body but not a number", () => {
    const articleUpdates = { inc_votes: "cat" };

    return request(app)
      .patch("/api/articles/1")
      .send(articleUpdates)
      .expect(400)
      .then((res) => {
        expect(res.body).toEqual({
          msg: "Bad request - invalid type used in URL",
        });
      });
  });
});

describe("PATCH /api/articles/:article_id", () => {
  test("PATCH - status 200 - responds with an updated article object even with additional properties in body", () => {
    const articleUpdates = { inc_votes: 10, name: "Mitch" };

    return request(app)
      .patch("/api/articles/1")
      .send(articleUpdates)
      .expect(200)
      .then((res) => {
        expect(res.body).toEqual({
          article: [
            {
              author: "butter_bridge",
              title: "Living in the shadow of a great man",
              article_id: 1,
              body: "I find this existence challenging",
              topic: "mitch",
              created_at: "2020-07-09T20:11:00.000Z",
              votes: 110,
            },
          ],
        });
      });
  });
});

describe("GET - /api/articles", () => {
  test("GET - status 200 - responds with an array of article objects", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then((res) => {
        const { articles } = res.body;
        expect(articles).toBeInstanceOf(Array);
        expect(articles).toHaveLength(12);
        articles.forEach((article) => {
          expect(article).toEqual(
            expect.objectContaining({
              article_id: expect.any(Number),
              title: expect.any(String),
              body: expect.any(String),
              votes: expect.any(Number),
              topic: expect.any(String),
              author: expect.any(String),
              created_at: expect.any(String),
              comment_count: expect.any(Number),
            })
          );
        });
      });
  });
});

describe("GET - /api/articles", () => {
  test("GET - status 200 - responds with an array of article objects sorted by date descending by default", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then((res) => {
        const { articles } = res.body;
        expect(articles[0]).toEqual({
          author: "icellusedkars",
          title: "Eight pug gifs that remind me of mitch",
          article_id: 3,
          body: "some gifs",
          topic: "mitch",
          created_at: "2020-11-03T09:12:00.000Z",
          votes: 0,
          comment_count: 0,
        });
        expect(articles).toBeSortedBy("created_at", { descending: true });
      });
  });
});

describe("GET - /api/articles", () => {
  test("GET - status 400 - responds with invalid sort_by error message when an invalid column provided in the query part of the URL", () => {
    return request(app)
      .get("/api/articles?sort_by=nonsense")
      .expect(400)
      .then((res) => {
        expect(res.body.msg).toEqual("Invalid sort_by column");
      });
  });
});

describe("GET - /api/articles", () => {
  test("GET - status 400 - responds with invalid order error message when an invalid column provided in the query part of the URL", () => {
    return request(app)
      .get("/api/articles?order=flat")
      .expect(400)
      .then((res) => {
        expect(res.body.msg).toEqual("Invalid order provided");
      });
  });
});

describe("GET - /api/articles", () => {
  test("GET - status 200 - responds with an array of article objects sorted by date descending by default filtered for topic of mitch", () => {
    return request(app)
      .get("/api/articles?topic=mitch")
      .expect(200)
      .then((res) => {
        const { articles } = res.body;
        expect(articles).toBeInstanceOf(Array);
        expect(articles).toHaveLength(11);
        expect(articles[0]).toEqual({
          author: "icellusedkars",
          title: "Eight pug gifs that remind me of mitch",
          article_id: 3,
          body: "some gifs",
          topic: "mitch",
          created_at: "2020-11-03T09:12:00.000Z",
          votes: 0,
          comment_count: 0,
        });
        expect(articles).toBeSortedBy("created_at", { descending: true });
      });
  });
});

describe("GET - /api/articles", () => {
  test("GET - status 404 - responds with no articles found error message when an invalid topic provided in the query part of the URL", () => {
    return request(app)
      .get("/api/articles?topic=dog")
      .expect(404)
      .then((res) => {
        expect(res.body.msg).toEqual("No articles found");
      });
  });
});

describe("GET - /api/articles", () => {
  test("GET - status 200 - responds with an empty array for valid topic of paper with no articles", () => {
    return request(app)
      .get("/api/articles?topic=paper")
      .expect(200)
      .then((res) => {
        const { articles } = res.body;
        expect(articles).toBeInstanceOf(Array);
        expect(articles).toHaveLength(0);
      });
  });
});

describe("GET - /api/articles", () => {
  test("GET - status 200 - responds with an array of article objects sorted by title ascending filtered for topic of mitch", () => {
    return request(app)
      .get("/api/articles?topic=mitch&sort_by=title&order=asc")
      .expect(200)
      .then((res) => {
        const { articles } = res.body;
        expect(articles).toBeInstanceOf(Array);
        expect(articles).toHaveLength(11);
        expect(articles[0]).toEqual({
          author: "icellusedkars",
          title: "A",
          article_id: 6,
          body: "Delicious tin of cat food",
          topic: "mitch",
          created_at: "2020-10-18T01:00:00.000Z",
          votes: 0,
          comment_count: 1,
        });
        expect(articles).toBeSortedBy("title");
      });
  });
});

describe("GET /api/articles/:article_id/comments", () => {
  test("GET - status 200 - responds with an array of comment objects for provided article id", () => {
    return request(app)
      .get("/api/articles/1/comments")
      .expect(200)
      .expect(200)
      .then((res) => {
        const { comments } = res.body;
        expect(comments).toBeInstanceOf(Array);
        expect(comments).toHaveLength(13);
        comments.forEach((comment) => {
          expect(comment).toEqual(
            expect.objectContaining({
              comment_id: expect.any(Number),
              votes: expect.any(Number),
              created_at: expect.any(String),
              author: expect.any(String),
              body: expect.any(String),
            })
          );
        });
      });
  });
});

describe("GET /api/articles/somethingwrong/comments", () => {
  test("GET - status 400 bad request- ", () => {
    return request(app)
      .get("/api/articles/somethingwrong/comments")
      .expect(400)
      .then((res) => {
        expect(res.body).toEqual({
          msg: "Bad request - invalid type used in URL",
        });
      });
  });
});

describe("GET /api/articles/99999/comments", () => {
  test("GET - status No article found for article_id- ", () => {
    return request(app)
      .get("/api/articles/99999/comments")
      .expect(404)
      .then((res) => {
        expect(res.body).toEqual({
          msg: "No article found for article_id: 99999",
        });
      });
  });
});

describe("GET /api/articles/:article_id/comments", () => {
  test("GET - status 200 - responds with an empty array for provided article id with no comments", () => {
    return request(app)
      .get("/api/articles/2/comments")
      .expect(200)
      .expect(200)
      .then((res) => {
        const { comments } = res.body;
        expect(comments).toBeInstanceOf(Array);
        expect(comments).toHaveLength(0);
      });
  });
});
