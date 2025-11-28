import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload.sort((a, b) => (b.likes || 0) - (a.likes || 0))
    },
    appendBlog(state, action) {
      return state.concat(action.payload).sort((a, b) => (b.likes || 0) - (a.likes || 0))
    },
    updateBlog(state, action) {
      return state
        .map((blog) => (blog.id === action.payload.id ? action.payload : blog))
        .sort((a, b) => (b.likes || 0) - (a.likes || 0))
    },
    removeBlog(state, action) {
      return state
        .filter((blog) => blog.id !== action.payload)
        .sort((a, b) => (b.likes || 0) - (a.likes || 0))
    },
  },
})

export const { setBlogs, appendBlog, updateBlog, removeBlog } = blogSlice.actions

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (blogObject) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(blogObject)
    dispatch(appendBlog(newBlog))
    return newBlog
  }
}

export const likeBlog = (blog) => {
  return async (dispatch) => {
    const userId = blog.user?.id || blog.user?._id || blog.user || (typeof blog.user === 'string' ? blog.user : null)
    const updatedBlog = await blogService.update(blog.id, {
      user: userId,
      likes: (blog.likes || 0) + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url,
    })
    dispatch(updateBlog(updatedBlog))
    return updatedBlog
  }
}

export const deleteBlog = (id) => {
  return async (dispatch) => {
    await blogService.remove(id)
    dispatch(removeBlog(id))
  }
}

export const addCommentToBlog = (id, comment) => {
  return async (dispatch) => {
    const updatedBlog = await blogService.addComment(id, comment)
    dispatch(updateBlog(updatedBlog))
    return updatedBlog
  }
}

export default blogSlice.reducer

