import { describe, test } from "node:test";
import assert from "node:assert";
import favoriteBlog from "../utils/favoriteBlog.js";

describe("favoriteBlog function", () => {
  describe("returns the blog with most likes", () => {
    test("when list has only one blog", () => {
      const blogs = [{ title: "Exodus", likes: 5, favorite: true }];
      const result = favoriteBlog(blogs);
      assert.deepStrictEqual(result, blogs[0]);
    });

    test("when list has multiple blogs", () => {
      const blogs = [
        { title: "Exodus", likes: 5, favorite: true },
        { title: "Harry Potter", likes: 10, favorite: true },
        { title: "LOTR", likes: 7, favorite: false },
      ];
      const result = favoriteBlog(blogs);
      assert.deepStrictEqual(result, blogs[1]);
    });

    test("returns null for empty list", () => {
      const blogs = [];
      const result = favoriteBlog(blogs);
      assert.deepStrictEqual(result, null);
    });
  });
});
