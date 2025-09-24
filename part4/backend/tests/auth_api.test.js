import mongoose from "mongoose";
import supertest from "supertest";
import assert from "assert";
import { beforeEach, describe, test, after } from "node:test";
import app from "../server.js";
import { User } from "../models/user.js";

const api = supertest(app);

const testUser = {
  username: "testuser",
  name: "Test User",
  password: "testpass",
};

let token = null;

beforeEach(async () => {
  await User.deleteMany({});
  await api.post("/api/users").send(testUser);
  // Wait for user to be saved and indexed
  const loginRes = await api
    .post("/api/login")
    .send({ username: testUser.username, password: testUser.password });
  token = loginRes.body.token;
});

describe("blog creation authentication", () => {
  test("adding a blog fails with 401 if token not provided", async () => {
    const newBlog = {
      title: "No Token Blog",
      author: "No Auth",
      url: "http://notoken.com",
    };
    await api.post("/api/blogs").send(newBlog).expect(401);
  });

  test("adding a blog succeeds with valid token", async () => {
    const newBlog = {
      title: "Token Blog",
      author: "Auth",
      url: "http://token.com",
    };
    const res = await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${token}`)
      .send(newBlog)
      .expect(201);
    assert.strictEqual(res.body.title, newBlog.title);
    assert(res.body.user.username === testUser.username);
  });
});

describe("blog deletion authorization", () => {
  test("deleting a blog fails with 401 if not creator", async () => {
    // Create a blog as testUser
    const newBlog = {
      title: "Delete Me",
      author: "Owner",
      url: "http://deleteme.com",
    };
    const blogRes = await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${token}`)
      .send(newBlog);
    // Create another user
    await api
      .post("/api/users")
      .send({ username: "other", name: "Other", password: "otherpass" });
    const loginOther = await api
      .post("/api/login")
      .send({ username: "other", password: "otherpass" });
    const otherToken = loginOther.body.token;
    // Try to delete as other user
    await api
      .delete(`/api/blogs/${blogRes.body.id}`)
      .set("Authorization", `Bearer ${otherToken}`)
      .expect(401);
  });

  test("deleting a blog succeeds for creator", async () => {
    const newBlog = {
      title: "Delete Mine",
      author: "Owner",
      url: "http://deletemine.com",
    };
    const blogRes = await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${token}`)
      .send(newBlog);
    await api
      .delete(`/api/blogs/${blogRes.body.id}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(204);
  });
});

after(async () => {
  await mongoose.connection.close();
});
