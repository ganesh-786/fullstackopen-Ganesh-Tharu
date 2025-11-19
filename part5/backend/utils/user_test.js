import assert from "node:assert";

function validateUser({ username, password }) {
  if (!username || !password) {
    return "username and password are required";
  }
  if (username.length < 3 || password.length < 3) {
    return "username and password must be at least 3 characters long";
  }
  return null;
}

// Unit tests for validateUser
assert.strictEqual(
  validateUser({ username: "ab", password: "12345" }),
  "username and password must be at least 3 characters long"
);
assert.strictEqual(
  validateUser({ username: "abc", password: "12" }),
  "username and password must be at least 3 characters long"
);
assert.strictEqual(
  validateUser({ username: "", password: "12345" }),
  "username and password are required"
);
assert.strictEqual(
  validateUser({ username: "abc", password: "" }),
  "username and password are required"
);
assert.strictEqual(validateUser({ username: "abc", password: "12345" }), null);
