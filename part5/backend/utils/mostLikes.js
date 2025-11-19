const mostLikes = (blogs) => {
  if (!blogs || blogs.length === 0) return null;

  const authorLikes = {};
  
  blogs.forEach(blog => {
    authorLikes[blog.author] = (authorLikes[blog.author] || 0) + (blog.likes || 0);
  });

  const topAuthor = Object.keys(authorLikes).reduce((max, author) => 
    authorLikes[author] > authorLikes[max] ? author : max
  );

  return {
    author: topAuthor,
    likes: authorLikes[topAuthor]
  };
};

export default mostLikes;