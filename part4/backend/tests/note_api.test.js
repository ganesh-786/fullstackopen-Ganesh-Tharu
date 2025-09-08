import mongoose from "mongoose";
import supertest from "supertest";
import app from "../app.js";
import { test, after } from "node:test";

const api = supertest(app);

test("notes are returned as json", async () => {
  await api
    .get("/api/notes")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

after(async () => {
  await mongoose.connection.close();
});
