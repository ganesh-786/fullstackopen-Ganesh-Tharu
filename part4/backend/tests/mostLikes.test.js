import { describe, test } from "node:test";
import assert from "node:assert";
import mostLikes from "../utils/mostLikes.js";

describe("mostLikes function", () => {
  test("returns null for empty list", () => {
    const blogs = [];
    const result = mostLikes(blogs);
    assert.strictEqual(result, null);
  });

  test("when list has only one blog", () => {
    const blogs = [
      { title: "Test Blog", author: "Test Author", likes: 5 }
    ];
    const result = mostLikes(blogs);
    assert.deepStrictEqual(result, {
      author: "Test Author",
      likes: 5
    });
  });

  test("when list has multiple blogs", () => {
    const blogs = [
      { title: "Blog 1", author: "Robert C. Martin", likes: 5 },
      { title: "Blog 2", author: "Robert C. Martin", likes: 3 },
      { title: "Blog 3", author: "Robert C. Martin", likes: 2 },
      { title: "Blog 4", author: "Edsger W. Dijkstra", likes: 10 },
      { title: "Blog 5", author: "Edsger W. Dijkstra", likes: 7 }
    ];
    const result = mostLikes(blogs);
    assert.deepStrictEqual(result, {
      author: "Edsger W. Dijkstra",
      likes: 17
    });
  });
});