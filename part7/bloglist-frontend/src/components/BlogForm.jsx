import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { showNotification } from '../reducers/notificationReducer'

const BlogForm = ({ blogFormRef }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const dispatch = useDispatch()

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const createdBlog = await dispatch(createBlog({ title, author, url })).unwrap()
      blogFormRef.current.toggleVisibility()
      dispatch(showNotification(`a new blog ${createdBlog.title} by ${createdBlog.author} added`))
      setTitle('')
      setAuthor('')
      setUrl('')
    } catch (error) {
      dispatch(showNotification('failed to create blog', 'error'))
    }
  }

  return (
    <div>
      <h2>create new</h2>
      <form className="blog-form" onSubmit={handleSubmit}>
        <div>
          title:
          <input
            className="blog-form-title"
            type="text"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author:
          <input
            className="blog-form-author"
            type="text"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <input
            className="blog-form-url"
            type="text"
            value={url}
            name="Url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button className="blog-form-submit" type="submit">
          create
        </button>
      </form>
    </div>
  )
}

export default BlogForm

