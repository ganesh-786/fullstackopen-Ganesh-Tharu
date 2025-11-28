import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { likeBlog, deleteBlog, addCommentToBlog } from '../reducers/blogReducer'
import { showNotification } from '../reducers/notificationReducer'
import { useState } from 'react'

const BlogView = () => {
  const id = useParams().id
  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const [comment, setComment] = useState('')

  const blog = blogs.find((b) => b.id === id)

  if (!blog) {
    return <div>Blog not found</div>
  }

  const canDelete =
    blog.user &&
    (blog.user.username === user?.username ||
      blog.user.id === user?.id ||
      (typeof blog.user === 'string' && blog.user === user?.id))

  const handleLike = async () => {
    try {
      await dispatch(likeBlog(blog)).unwrap()
    } catch (error) {
      dispatch(showNotification('failed to like blog', 'error'))
    }
  }

  const handleDelete = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      try {
        await dispatch(deleteBlog(blog.id)).unwrap()
        dispatch(showNotification(`blog ${blog.title} deleted`))
      } catch (error) {
        dispatch(showNotification('failed to delete blog', 'error'))
      }
    }
  }

  const handleAddComment = async (e) => {
    e.preventDefault()
    if (!comment.trim()) return

    try {
      await dispatch(addCommentToBlog(blog.id, comment)).unwrap()
      setComment('')
      dispatch(showNotification('Comment added'))
    } catch (error) {
      dispatch(showNotification('failed to add comment', 'error'))
    }
  }

  return (
    <div>
      <h2>
        {blog.title} by {blog.author}
      </h2>
      <div>
        <a href={blog.url} target="_blank" rel="noopener noreferrer">
          {blog.url}
        </a>
      </div>
      <div>
        likes {blog.likes || 0}
        <button onClick={handleLike} style={{ marginLeft: '10px' }}>
          like
        </button>
      </div>
      {blog.user && <div>added by {blog.user.name || blog.user.username}</div>}
      {canDelete && (
        <button
          onClick={handleDelete}
          style={{
            marginTop: '5px',
            backgroundColor: '#ff4444',
            color: 'white',
            border: 'none',
            padding: '5px 10px',
            borderRadius: '3px',
            cursor: 'pointer',
          }}
        >
          remove
        </button>
      )}
      <h3>comments</h3>
      <form onSubmit={handleAddComment}>
        <input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Add a comment"
        />
        <button type="submit">add comment</button>
      </form>
      <ul>
        {blog.comments && blog.comments.length > 0 ? (
          blog.comments.map((comment, index) => <li key={index}>{comment}</li>)
        ) : (
          <li>No comments yet</li>
        )}
      </ul>
    </div>
  )
}

export default BlogView

