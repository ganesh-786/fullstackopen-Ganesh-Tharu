import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [notification, setNotification] = useState(null)
  const blogFormRef = useRef()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    if (user) {
      blogService.getAll().then(blogs =>
        setBlogs(blogs.sort((a, b) => (b.likes || 0) - (a.likes || 0)))
      )
    }
  }, [user])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      setUser(user)
      blogService.setToken(user.token)
      setUsername('')
      setPassword('')
      setNotification(null)
    } catch (_exception) {
      setNotification('wrong username or password')
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    blogService.setToken(null)
  }

  const handleCreateBlog = async (blogObject) => {
    try {
      const createdBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(createdBlog).sort((a, b) => (b.likes || 0) - (a.likes || 0)))
      blogFormRef.current.toggleVisibility()
      setNotification(`a new blog ${createdBlog.title} by ${createdBlog.author} added`)
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    } catch (_exception) {
      setNotification('failed to create blog')
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }

  const handleLike = async (blog) => {
    try {
      // Get user ID - handle both object and string formats
      const userId = blog.user?.id || blog.user?._id || blog.user || (typeof blog.user === 'string' ? blog.user : null)
      
      const updatedBlog = await blogService.update(blog.id, {
        user: userId,
        likes: (blog.likes || 0) + 1,
        author: blog.author,
        title: blog.title,
        url: blog.url
      })
      setBlogs(blogs.map(b => b.id === blog.id ? updatedBlog : b).sort((a, b) => (b.likes || 0) - (a.likes || 0)))
    } catch (_exception) {
      setNotification('failed to like blog')
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }

  const handleDelete = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      try {
        await blogService.remove(blog.id)
        setBlogs(blogs.filter(b => b.id !== blog.id).sort((a, b) => (b.likes || 0) - (a.likes || 0)))
        setNotification(`blog ${blog.title} deleted`)
        setTimeout(() => {
          setNotification(null)
        }, 5000)
      } catch (_exception) {
        setNotification('failed to delete blog')
        setTimeout(() => {
          setNotification(null)
        }, 5000)
      }
    }
  }

  if (user === null) {
    return (
      <div>
        {notification && (
          <div style={{ border: '2px solid red', padding: '10px', marginBottom: '10px' }}>
            {notification}
          </div>
        )}
        <h2>log in to application</h2>
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      {notification && (
        <div style={{ border: '2px solid green', padding: '10px', marginBottom: '10px' }}>
          {notification}
        </div>
      )}
      <h2>blogs</h2>
      <p>{user.name} logged in</p>
      <button onClick={handleLogout}>logout</button>
      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <BlogForm createBlog={handleCreateBlog} />
      </Togglable>
      {blogs.map(blog =>
        <Blog 
          key={blog.id} 
          blog={blog} 
          onLike={() => handleLike(blog)}
          onDelete={() => handleDelete(blog)}
          currentUser={user}
        />
      )}
    </div>
  )
}

export default App