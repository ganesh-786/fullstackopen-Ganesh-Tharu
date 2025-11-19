const mostBlogs = (blogs) => {
  if (!blogs || blogs.length === 0) return null;

  const authorCounts = {};
  
  blogs.forEach(blog => {
    authorCounts[blog.author] = (authorCounts[blog.author] || 0) + 1;
  });

  const topAuthor = Object.keys(authorCounts).reduce((max, author) => 
    authorCounts[author] > authorCounts[max] ? author : max
  );

  return {
    author: topAuthor,
    blogs: authorCounts[topAuthor]
  };
};

export default mostBlogs;