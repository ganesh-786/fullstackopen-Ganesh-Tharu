import { Blog } from "../models/blog.js";

export const initialBlogs = [
  {
    title: "First Blog",
    author: "Author One",
    url: "http://firstblog.com",
    likes: 5,
  },
  {
    title: "Second Blog",
    author: "Author Two",
    url: "http://secondblog.com",
    likes: 10,
  },
];

export const nonExistingId = async () => {
  const blog = new Blog({
    title: "temp",
    author: "nobody",
    url: "http://temp.com",
  });
  await blog.save();
  await blog.deleteOne();
  return blog._id.toString();
};

export const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((b) => b.toJSON());
};
