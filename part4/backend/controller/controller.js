import { User } from "../models/user.js";
import bcryptjs from "bcryptjs";
// Delete a blog by id
export const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Blog.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ error: "blog not found" });
    }
    res.status(204).end();
  } catch (error) {
    console.log("error while deleting blog!", error);
    res.status(500).json({ error: "internal server error" });
  }
};

// Update a blog by id
export const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, author, url, likes } = req.body;
    const updated = await Blog.findByIdAndUpdate(
      id,
      { title, author, url, likes },
      { new: true, runValidators: true }
    );
    if (!updated) {
      return res.status(404).json({ error: "blog not found" });
    }
    res.status(200).json(updated);
  } catch (error) {
    console.log("error while updating blog!", error);
    res.status(500).json({ error: "internal server error" });
  }
};
import { Blog } from "../models/blog.js";

export const getBlog = async (req, res) => {
  try {
    const blogs = await Blog.find({});
    res.status(200).json(blogs);
  } catch (error) {
    console.log("error while getting Blogs", error);
  }
};

export const createBlog = async (req, res) => {
  try {
    const { title, author, url, likes } = req.body;
    if (!title || !url) {
      res.status(400).json({ error: "title and url are required" });
      return;
    }
    const blog = new Blog({
      title,
      author,
      url,
      likes: likes === undefined ? 0 : likes,
    });
    await blog.save();
    res.status(201).json(blog);
  } catch (error) {
    console.log("erorr while creating blog!", error);
    res.status(500).json({ error: "internal server error" });
  }
};

export const createUser = async (req, res) => {
  try {
    const { username, name, password } = req.body;
    // Validate presence
    if (!username || !password) {
      return res
        .status(400)
        .json({ error: "username and password are required" });
    }
    // Validate length
    if (username.length < 3 || password.length < 3) {
      return res
        .status(400)
        .json({
          error: "username and password must be at least 3 characters long",
        });
    }
    // Check username uniqueness
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: "username must be unique" });
    }
    const hashPassword = await bcryptjs.hash(password, 12);
    const users = new User({ username, name, password: hashPassword });
    await users.save();
    res.status(201).json({ message: `new user:${username} created` });
  } catch (error) {
    res
      .status(400)
      .json({ error: error.message || "some error during create User!" });
  }
};
