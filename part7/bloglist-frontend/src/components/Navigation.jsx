import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { clearUser } from '../reducers/userReducer'
import blogService from '../services/blogs'

const Navigation = () => {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    dispatch(clearUser())
    blogService.setToken(null)
  }

  const padding = {
    padding: 5,
  }

  return (
    <div style={{ backgroundColor: '#f0f0f0', padding: '10px', marginBottom: '10px' }}>
      <Link to="/" style={padding}>
        blogs
      </Link>
      <Link to="/users" style={padding}>
        users
      </Link>
      {user ? (
        <span style={padding}>
          {user.name} logged in{' '}
          <button onClick={handleLogout} style={{ marginLeft: '5px' }}>
            logout
          </button>
        </span>
      ) : (
        <Link to="/login" style={padding}>
          login
        </Link>
      )}
    </div>
  )
}

export default Navigation

