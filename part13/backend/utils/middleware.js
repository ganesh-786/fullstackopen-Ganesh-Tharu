const jwt = require("jsonwebtoken");
const { SECRET } = require("./config");

const tokenExtractor = (req, res, next) => {
  const authorization = req.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    req.token = authorization.substring(7);
  } else {
    req.token = null;
  }
  next();
};

const userExtractor = async (req, res, next) => {
  if (!req.token) {
    return res.status(401).json({ error: "token missing or invalid" });
  }
  try {
    const decodedToken = jwt.verify(req.token, SECRET);
    req.user = { id: decodedToken.id, username: decodedToken.username };
    next();
  } catch (error) {
    return res.status(401).json({ error: "token invalid" });
  }
};

module.exports = {
  tokenExtractor,
  userExtractor,
};

