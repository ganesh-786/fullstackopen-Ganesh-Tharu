import { useParams, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import userService from '../services/users'

const User = () => {
  const id = useParams().id
  const [user, setUser] = useState(null)

  useEffect(() => {
    userService.getById(id).then((user) => setUser(user))
  }, [id])

  if (!user) {
    return null
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {user.blogs && user.blogs.length > 0 ? (
          user.blogs.map((blog) => (
            <li key={blog.id}>
              <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
            </li>
          ))
        ) : (
          <li>No blogs added yet</li>
        )}
      </ul>
    </div>
  )
}

export default User

