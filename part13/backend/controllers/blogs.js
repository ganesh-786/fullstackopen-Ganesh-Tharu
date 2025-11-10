const router = require("express").Router();

const { Blog, User } = require("../models");
const { userExtractor } = require("../utils/middleware");

router.get("/", async (req, res) => {
  const blogs = await Blog.findAll({
    include: {
      model: User,
      attributes: ["name", "username"],
    },
  });
  res.json(blogs);
});

router.post("/", userExtractor, async (req, res) => {
  const blog = await Blog.create({
    ...req.body,
    userId: req.user.id,
  });
  const blogWithUser = await Blog.findByPk(blog.id, {
    include: {
      model: User,
      attributes: ["name", "username"],
    },
  });
  res.json(blogWithUser);
});

const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id, {
    include: {
      model: User,
      attributes: ["name", "username"],
    },
  });
  next();
};

router.get("/:id", blogFinder, async (req, res) => {
  if (req.blog) {
    res.json(req.blog);
  } else {
    res.status(404).end();
  }
});

router.delete("/:id", userExtractor, blogFinder, async (req, res) => {
  if (req.blog) {
    if (req.blog.userId !== req.user.id) {
      return res
        .status(403)
        .json({ error: "only the creator can delete a blog" });
    }
    await req.blog.destroy();
    res.status(200).json({ message: "Given ID_Blog deleted successfully!" });
  } else {
    res.status(404).end();
  }
});

router.put("/:id", blogFinder, async (req, res) => {
  if (req.blog) {
    if (req.body.likes !== undefined) {
      req.blog.likes = req.body.likes;
    }
    await req.blog.save();
    const updatedBlog = await Blog.findByPk(req.blog.id, {
      include: {
        model: User,
        attributes: ["name", "username"],
      },
    });
    res.json(updatedBlog);
  } else {
    res.status(404).end();
  }
});

module.exports = router;
