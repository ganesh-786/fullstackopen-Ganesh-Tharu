describe("deletion of a blog", () => {
  test("a blog can be deleted (4.13)", async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToDelete = blogsAtStart[0];

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

    const blogsAtEnd = await helper.blogsInDb();
    assert.strictEqual(blogsAtEnd.length, blogsAtStart.length - 1);
    const titles = blogsAtEnd.map((b) => b.title);
    assert(!titles.includes(blogToDelete.title));
  });

  test("returns 404 if blog does not exist (4.13)", async () => {
    const nonExistingId = await helper.nonExistingId();
    await api.delete(`/api/blogs/${nonExistingId}`).expect(404);
  });
});

describe("updating a blog", () => {
  test("a blog's likes can be updated (4.14)", async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToUpdate = blogsAtStart[0];
    const updatedBlog = { ...blogToUpdate, likes: blogToUpdate.likes + 10 };

    const response = await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedBlog)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    assert.strictEqual(response.body.likes, updatedBlog.likes);
  });

  test("returns 404 if blog to update does not exist (4.14)", async () => {
    const nonExistingId = await helper.nonExistingId();
    const updatedBlog = {
      title: "Nonexistent",
      author: "Nobody",
      url: "http://nope.com",
      likes: 1,
    };
    await api.put(`/api/blogs/${nonExistingId}`).send(updatedBlog).expect(404);
  });
});
import mongoose from "mongoose";
import supertest from "supertest";
import assert from "assert";
import { beforeEach, describe, test, after } from "node:test";
import app from "../server.js";
import { Blog } from "../models/blog.js";
import * as helper from "../utils/blog_helper.js";

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(helper.initialBlogs);
});

describe("when there are some blogs initially saved", () => {
  test("blogs are returned as json (4.8)", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("all blogs are returned (4.8)", async () => {
    const response = await api.get("/api/blogs");
    assert.strictEqual(response.body.length, helper.initialBlogs.length);
  });

  test("unique identifier property is named id (4.9)", async () => {
    const response = await api.get("/api/blogs");
    const ids = response.body.map((r) => r.id);
    ids.forEach((id) => assert.ok(id)); // ensures "id" exists
  });
});

describe("addition of a new blog", () => {
  test("a valid blog can be added (4.10)", async () => {
    const newBlog = {
      title: "Async/Await Simplified",
      author: "Ganesh Tharu",
      url: "http://example.com/async-await",
      likes: 12,
    };

    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1);

    const titles = blogsAtEnd.map((b) => b.title);
    assert(titles.includes("Async/Await Simplified"));
  });

  test("if likes property is missing, it defaults to 0 (4.11)", async () => {
    const newBlog = {
      title: "No Likes Blog",
      author: "Anonymous",
      url: "http://nolikes.com",
    };

    const result = await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    assert.strictEqual(result.body.likes, 0);
  });

  test("blog without title or url is not added (4.12)", async () => {
    const noTitle = { author: "Test", url: "http://notitle.com" };
    const noUrl = { author: "Test", title: "No URL" };

    await api.post("/api/blogs").send(noTitle).expect(400);
    await api.post("/api/blogs").send(noUrl).expect(400);

    const blogsAtEnd = await helper.blogsInDb();
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length);
  });
});

after(async () => {
  await mongoose.connection.close();
});
