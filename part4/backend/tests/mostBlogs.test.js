import { describe, test } from "node:test";
import assert from "node:assert";
import mostBlogs from "../utils/mostBlogs.js";

describe("mostBlogs function", () => {
  test("returns null for empty list", () => {
    const blogs = [];
    const result = mostBlogs(blogs);
    assert.strictEqual(result, null);
  });

  test("when list has only one blog", () => {
    const blogs = [
      { title: "Test Blog", author: "Test Author", likes: 5 }
    ];
    const result = mostBlogs(blogs);
    assert.deepStrictEqual(result, {
      author: "Test Author",
      blogs: 1
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
    const result = mostBlogs(blogs);
    assert.deepStrictEqual(result, {
      author: "Robert C. Martin",
      blogs: 3
    });
  });
});