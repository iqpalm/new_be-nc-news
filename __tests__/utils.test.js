const {
  mappedTopics,
  mappedUsers,
  mappedArticles,
  createArticleRef,
  formatCommentData,
} = require("../db/utils/data-manipulation");

describe("topics ", () => {
  test("when given an empty object in an array will return a nested array with 2 undefined values", () => {
    expect(mappedTopics([{}])).toEqual([[undefined, undefined]]);
  });
  test("When given an array with an object containing slug and description keys, return their values inside the nested array", () => {
    expect(mappedTopics([{ slug: "test1", description: "test2" }])).toEqual([
      ["test1", "test2"],
    ]);
  });
  test("mappedTopics does not mutate the origional", () => {
    const input = [{ test: "test", test1: "test1" }];
    const unmutated = [{ test: "test", test1: "test1" }];
    const output = mappedTopics(input);
    expect(input).toEqual(unmutated);
    expect(output).not.toBe(input);
  });
});

describe("users ", () => {
  test("when given an empty object in an array will return a nested array with 3 undefined values", () => {
    expect(mappedUsers([{}])).toEqual([[undefined, undefined, undefined]]);
  });
  test("When given an array with an object containing username, avatar_url and name keys, return their values inside the nested array", () => {
    expect(
      mappedUsers([{ username: "test1", avatar_url: "test2", name: "test3" }])
    ).toEqual([["test1", "test2", "test3"]]);
  });
  test("mappedUsers does not mutate the origional", () => {
    const input = [{ test1: "test1", test2: "test2", test3: "test3" }];
    const unmutated = [{ test1: "test1", test2: "test2", test3: "test3" }];
    const output = mappedUsers(input);
    expect(input).toEqual(unmutated);
    expect(output).not.toBe(input);
  });
});

describe("articles ", () => {
  test("when given an empty object in an array will return a nested array with 5 undefined values and 1 set to 0 for votes", () => {
    expect(mappedArticles([{}])).toEqual([
      [undefined, undefined, 0, undefined, undefined, undefined],
    ]);
  });
  test("When given an array with an object containing article keys, returns their values inside a nested array", () => {
    expect(
      mappedArticles([
        {
          title: "test1",
          body: "test2",
          votes: "test3",
          topic: "test4",
          author: "test5",
          created_at: "test6",
        },
      ])
    ).toEqual([["test1", "test2", "test3", "test4", "test5", "test6"]]);
  });
  test("mappedArticles does not mutate the origional", () => {
    const input = [
      {
        test1: "test1",
        test2: "test2",
        test3: "test3",
        test4: "test4",
        test5: "test5",
        test6: "test6",
      },
    ];
    const unmutated = [
      {
        test1: "test1",
        test2: "test2",
        test3: "test3",
        test4: "test4",
        test5: "test5",
        test6: "test6",
      },
    ];
    const output = mappedArticles(input);
    expect(input).toEqual(unmutated);
    expect(output).not.toBe(input);
  });
});

describe("createArticleRef", () => {
  it("returns an empty object for no articles", () => {
    expect(createArticleRef([])).toEqual({});
  });
  it("each articles id is added on a key of the article title", () => {
    const articles = [
      { article_id: 1, title: "test 1" },
      { article_id: 2, title: "test 2" },
    ];
    const expectedArticleRef = {
      "test 1": 1,
      "test 2": 2,
    };
    expect(createArticleRef(articles)).toEqual(expectedArticleRef);
  });
  it("does not mutate the original input", () => {
    const shops = [{ article_id: 1, title: "test 1" }];
    const nonMutatedShops = [{ article_id: 1, title: "test 1" }];
    createArticleRef(shops);
    expect(shops).toEqual(nonMutatedShops);
  });
});

describe("formatCommentData", () => {
  it("returns an empty array for no comments", () => {
    expect(formatCommentData([])).toEqual([]);
  });
  it("each comment is replaced with [created_by, article_id, votes, created_at,body]", () => {
    const comments = [
      {
        created_by: "article-a",
        belongs_to:
          "The People Tracking Every Touch, Pass And Tackle in the World Cup",
        votes: 10,
        created_at: new Date(1577890920000),
        body: "The click is inevitable",
      },
    ];
    const articleRef = {
      "The People Tracking Every Touch, Pass And Tackle in the World Cup": 18,
    };

    const date = new Date(1577890920000);

    const expectedValues = [
      ["article-a", 18, 10, date, "The click is inevitable"],
    ];
    expect(formatCommentData(comments, articleRef)).toEqual(expectedValues);
  });
  it("does not mutate the original inputs", () => {
    const comments = [
      {
        created_by: "article-a",
        belongs_to:
          "The People Tracking Every Touch, Pass And Tackle in the World Cup",
        votes: 10,
        created_at: new Date(1577890920000),
        body: "The click is inevitable",
      },
    ];
    const nonMutatedComments = [
      {
        created_by: "article-a",
        belongs_to:
          "The People Tracking Every Touch, Pass And Tackle in the World Cup",
        votes: 10,
        created_at: new Date(1577890920000),
        body: "The click is inevitable",
      },
    ];
    const articleRef = {
      "The People Tracking Every Touch, Pass And Tackle in the World Cup": 18,
    };
    const nonMutatedArticleRef = {
      "The People Tracking Every Touch, Pass And Tackle in the World Cup": 18,
    };
    formatCommentData(comments, articleRef);
    expect(comments).toEqual(nonMutatedComments);
    expect(articleRef).toEqual(nonMutatedArticleRef);
  });
});
