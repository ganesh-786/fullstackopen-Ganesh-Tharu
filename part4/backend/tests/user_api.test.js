import mongoose from "mongoose";
import supertest from "supertest";
import { describe, test, beforeEach, after } from "node:test";
import assert from "assert";

import app from "../server.js";
import { User } from "../models/user.js";

const api = supertest(app);

describe("User creation validation", () => {
  beforeEach(async () => {
    await User.deleteMany({});
    const user = new User({ username: "root", name: "Root User", passwordHash: "hashedpassword" });
    await user.save();
  });

  test("fails if username is missing", async () => {
    const newUser = { password: "validpass" };
    const result = await api.post("/api/users").send(newUser).expect(400);
    assert(result.body.error.includes("username and password are required"));
  });

  test("fails if password is missing", async () => {
    const newUser = { username: "validuser" };
    const result = await api.post("/api/users").send(newUser).expect(400);
    assert(result.body.error.includes("username and password are required"));
  });

  test("fails if username is too short", async () => {
    const newUser = { username: "ab", password: "validpass" };
    const result = await api.post("/api/users").send(newUser).expect(400);
    assert(result.body.error.includes("at least 3 characters long"));
  });

  test("fails if password is too short", async () => {
    const newUser = { username: "validuser", password: "ab" };
    const result = await api.post("/api/users").send(newUser).expect(400);
    assert(result.body.error.includes("at least 3 characters long"));
  });

  test("fails if username is not unique", async () => {
    const newUser = { username: "root", password: "anotherpass" };
    const result = await api.post("/api/users").send(newUser).expect(400);
    assert(result.body.error.includes("username must be unique"));
  });

  test("succeeds with valid user", async () => {
    const newUser = { username: "newuser", password: "validpass" };
    const result = await api.post("/api/users").send(newUser).expect(201);
    assert(result.body.message.includes("new user:newuser created"));
  });

  after(async () => {
    await mongoose.connection.close();
  });
});
