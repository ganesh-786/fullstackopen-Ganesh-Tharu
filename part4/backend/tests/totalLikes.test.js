import { describe, test } from "node:test";
import assert from "node:assert";
import { totalLikes } from "../utils/totalLikes.js";

describe("totalLikes", () => {
  test("of empty list is zero", () => {
    const blogs = [];
    assert.strictEqual(totalLikes(blogs), 0);
  });

  test("when list has only one blog, equals the likes of that", () => {
    const blogs = [{ title: "Blog 1", likes: 5 }];
    assert.strictEqual(totalLikes(blogs), 5);
  });

  test("of a bigger list is calculated right", () => {
    const blogs = [
      { title: "Blog 1", likes: 5 },
      { title: "Blog 2", likes: 10 },
      { title: "Blog 3", likes: 0 },
      { title: "Blog 4", likes: 7 },
    ];
    assert.strictEqual(totalLikes(blogs), 22);
  });
});
