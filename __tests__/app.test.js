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
        //const date = new Date(1594329060000);
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
