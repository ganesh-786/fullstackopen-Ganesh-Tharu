import { useSelector } from 'react-redux'
import Blog from './Blog'

const BlogList = () => {
  const blogs = useSelector((state) => state.blogs)

  return (
    <div>
      <h2>blogs</h2>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  )
}

export default BlogList

