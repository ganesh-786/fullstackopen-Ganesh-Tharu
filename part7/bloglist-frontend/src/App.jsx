import { useEffect, useRef } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from './reducers/userReducer'
import { initializeBlogs } from './reducers/blogReducer'
import blogService from './services/blogs'
import Notification from './components/Notification'
import Navigation from './components/Navigation'
import LoginForm from './components/LoginForm'
import BlogList from './components/BlogList'
import BlogView from './components/BlogView'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import Users from './components/Users'
import User from './components/User'
import './index.css'

const App = () => {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const blogFormRef = useRef()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }, [dispatch])

  useEffect(() => {
    if (user) {
      dispatch(initializeBlogs())
    }
  }, [user, dispatch])

  return (
    <div className="container">
      <Navigation />
      <Notification />
      <Routes>
        <Route
          path="/login"
          element={user ? <Navigate replace to="/" /> : <LoginForm />}
        />
        <Route
          path="/"
          element={
            user ? (
              <div>
                <BlogList />
                <Togglable buttonLabel="create new blog" ref={blogFormRef}>
                  <BlogForm blogFormRef={blogFormRef} />
                </Togglable>
              </div>
            ) : (
              <Navigate replace to="/login" />
            )
          }
        />
        <Route
          path="/blogs/:id"
          element={user ? <BlogView /> : <Navigate replace to="/login" />}
        />
        <Route
          path="/users"
          element={user ? <Users /> : <Navigate replace to="/login" />}
        />
        <Route
          path="/users/:id"
          element={user ? <User /> : <Navigate replace to="/login" />}
        />
      </Routes>
    </div>
  )
}

export default App

