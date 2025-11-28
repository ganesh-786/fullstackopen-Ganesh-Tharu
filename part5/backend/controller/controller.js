import { User } from "../models/user.js";
import bcryptjs from "bcryptjs";
import { Blog } from "../models/Blog.js";

// List all users with their blogs populated
export const getUsers = async (req, res) => {
  try {
    const users = await User.find({}).populate("blogs", {
      title: 1,
      author: 1,
      url: 1,
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "internal server error" });
  }
};

// Delete a blog by id
export const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({ error: "blog not found" });
    }
    // Only allow deletion if the user matches
    if (!blog.user || blog.user.toString() !== req.user.id.toString()) {
      return res
        .status(401)
        .json({ error: "only the creator can delete this blog" });
    }
    await Blog.findByIdAndDelete(id);
    // Remove blog from user's blogs array
    const user = await User.findById(req.user.id);
    if (user) {
      user.blogs = user.blogs.filter((bid) => bid.toString() !== id.toString());
      await user.save();
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
    const { title, author, url, likes, user } = req.body;
    const updateData = { title, author, url, likes };
    // Only update user if provided
    if (user) {
      updateData.user = user;
    }
    const updated = await Blog.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    ).populate("user", { username: 1, name: 1, _id: 1 });
    if (!updated) {
      return res.status(404).json({ error: "blog not found" });
    }
    // Transform user._id to user.id for consistency
    const blogObj = updated.toJSON();
    if (blogObj.user && blogObj.user._id) {
      blogObj.user.id = blogObj.user._id.toString();
      delete blogObj.user._id;
    }
    res.status(200).json(blogObj);
  } catch (error) {
    console.log("error while updating blog!", error);
    res.status(500).json({ error: "internal server error" });
  }
};

export const getBlog = async (req, res) => {
  try {
    const blogs = await Blog.find({}).populate("user", {
      username: 1,
      name: 1,
      _id: 1,
    });
    // Transform user._id to user.id for consistency
    const blogsWithId = blogs.map(blog => {
      const blogObj = blog.toJSON();
      if (blogObj.user && blogObj.user._id) {
        blogObj.user.id = blogObj.user._id.toString();
        delete blogObj.user._id;
      }
      return blogObj;
    });
    res.status(200).json(blogsWithId);
  } catch (error) {
    console.log("error while getting Blogs", error);
    res.status(500).json({ error: "internal server error" });
  }
};

export const createBlog = async (req, res) => {
  try {
    const { title, author, url, likes } = req.body;
    if (!title || !url) {
      return res.status(400).json({ error: "title and url are required" });
    }
    // Use authenticated user from middleware
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(401).json({ error: "invalid user or token" });
    }
    // Save user if not already saved (should be, but for safety)
    await user.save();
    const blog = new Blog({
      title,
      author,
      url,
      likes: likes === undefined ? 0 : likes,
      user: user._id,
    });
    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();
    // Always populate user field in response
    await savedBlog.populate({ path: "user", select: "username name _id" });
    // Transform user._id to user.id for consistency
    const blogObj = savedBlog.toJSON();
    if (blogObj.user && blogObj.user._id) {
      blogObj.user.id = blogObj.user._id.toString();
      delete blogObj.user._id;
    }
    res.status(201).json(blogObj);
  } catch (error) {
    console.log("error while creating blog!", error);
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
      return res.status(400).json({
        error: "username and password must be at least 3 characters long",
      });
    }
    // Check username uniqueness
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: "username must be unique" });
    }
    const passwordHash = await bcryptjs.hash(password, 12);
    const user = new User({ username, name, passwordHash });
    await user.save();
    res.status(201).json({ message: `new user:${username} created` });
  } catch (error) {
    res
      .status(400)
      .json({ error: error.message || "some error during create User!" });
  }
};
