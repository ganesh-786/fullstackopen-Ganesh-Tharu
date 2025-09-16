import mongoose from "mongoose";
import supertest from "supertest";
import { describe, test } from "node:test";

import app from "../server.js";
import { User } from "../models/user.js";

const api = supertest(app);

describe("User creation validation", () => {
  beforeEach(async () => {
    await User.deleteMany({});
    await new User({ username: "root", password: "secret" }).save();
  });

  test("fails if username is missing", async () => {
    const newUser = { password: "validpass" };
    const result = await api.post("/api/users").send(newUser).expect(400);
    expect(result.body.error).toContain("username and password are required");
  });

  test("fails if password is missing", async () => {
    const newUser = { username: "validuser" };
    const result = await api.post("/api/users").send(newUser).expect(400);
    expect(result.body.error).toContain("username and password are required");
  });

  test("fails if username is too short", async () => {
    const newUser = { username: "ab", password: "validpass" };
    const result = await api.post("/api/users").send(newUser).expect(400);
    expect(result.body.error).toContain("at least 3 characters long");
  });

  test("fails if password is too short", async () => {
    const newUser = { username: "validuser", password: "ab" };
    const result = await api.post("/api/users").send(newUser).expect(400);
    expect(result.body.error).toContain("at least 3 characters long");
  });

  test("fails if username is not unique", async () => {
    const newUser = { username: "root", password: "anotherpass" };
    const result = await api.post("/api/users").send(newUser).expect(400);
    expect(result.body.error).toContain("username must be unique");
  });

  test("succeeds with valid user", async () => {
    const newUser = { username: "newuser", password: "validpass" };
    const result = await api.post("/api/users").send(newUser).expect(201);
    expect(result.body.message).toContain("new user:newuser created");
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });
});
