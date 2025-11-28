import { useState } from 'react'

const Blog = ({ blog, onLike, onDelete, currentUser }) => {
  const [showDetails, setShowDetails] = useState(false)

  const canDelete = blog.user && (
    blog.user.username === currentUser?.username ||
    blog.user.id === currentUser?.id ||
    (typeof blog.user === 'string' && blog.user === currentUser?.id)
  )

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleDetails = () => {
    setShowDetails(!showDetails)
  }

  return (
    <div className="blog" style={blogStyle}>
      <div className="blog-title-author">
        {blog.title} {blog.author}
        <button className="blog-toggle" onClick={toggleDetails} style={{ marginLeft: '10px' }}>
          {showDetails ? 'hide' : 'view'}
        </button>
      </div>
      {showDetails && (
        <div className="blog-details">
          <div className="blog-url">
            <a href={blog.url} target="_blank" rel="noopener noreferrer">
              {blog.url}
            </a>
          </div>
          <div className="blog-likes">
            likes {blog.likes || 0}
            <button className="blog-like-button" onClick={onLike} style={{ marginLeft: '10px' }}>
              like
            </button>
          </div>
          {blog.user && (
            <div className="blog-user">
              {blog.user.name || blog.user.username}
            </div>
          )}
          {canDelete && (
            <button 
              className="blog-delete-button"
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
              remove
            </button>
          )}
        </div>
      )}
    </div>
  )
}

export default Blog