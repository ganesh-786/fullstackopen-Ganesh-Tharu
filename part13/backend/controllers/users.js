const router = require("express").Router();

const { User, Blog } = require("../models");

router.get("/", async (req, res) => {
  const users = await User.findAll({
    include: {
      model: Blog,
      attributes: ["id", "author", "url", "title", "likes"],
    },
  });
  res.json(users);
});

router.post("/", async (req, res) => {
  const user = await User.create(req.body);
  res.json(user);
});

const userFinder = async (req, res, next) => {
  req.user = await User.findOne({
    where: { username: req.params.username },
  });
  next();
};

router.put("/:username", userFinder, async (req, res) => {
  if (req.user) {
    if (req.body.username !== undefined) {
      req.user.username = req.body.username;
    }
    await req.user.save();
    res.json(req.user);
  } else {
    res.status(404).end();
  }
});

module.exports = router;
