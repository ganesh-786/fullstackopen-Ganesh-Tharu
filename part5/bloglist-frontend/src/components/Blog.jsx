const Blog = ({ blog, onLike, onDelete, currentUser }) => {
  const canDelete = blog.user && (
    blog.user.username === currentUser?.username ||
    blog.user.id === currentUser?.id ||
    (typeof blog.user === 'string' && blog.user === currentUser?.id)
  )

  return (
    <div style={{ 
      border: '1px solid #ccc', 
      padding: '10px', 
      margin: '5px 0',
      borderRadius: '4px'
    }}>
      <div>
        <strong>{blog.title}</strong> by {blog.author}
      </div>
      <div>
        <a href={blog.url} target="_blank" rel="noopener noreferrer">
          {blog.url}
        </a>
      </div>
      <div>
        {blog.likes} likes
        <button onClick={onLike} style={{ marginLeft: '10px' }}>
          like
        </button>
      </div>
      {blog.user && (
        <div>
          added by {blog.user.name || blog.user.username}
        </div>
      )}
      {canDelete && (
        <button 
          onClick={onDelete} 
          style={{ 
            marginTop: '5px',
            backgroundColor: '#ff4444',
            color: 'white',
            border: 'none',
            padding: '5px 10px',
            borderRadius: '3px',
            cursor: 'pointer'
          }}
        >
          delete
        </button>
      )}
    </div>
  )
}

export default Blog