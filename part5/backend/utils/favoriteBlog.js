const favoriteBlog = (blogs) => {
  if (!blogs || blogs.length === 0) return null;
  return blogs.reduce(
    (fav, blog) => (!fav || blog.likes > fav.likes ? blog : fav),
    null
  );
};

export default favoriteBlog;
