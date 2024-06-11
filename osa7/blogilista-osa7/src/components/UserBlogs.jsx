import { useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { Link } from "react-router-dom"

const UserBlog = () => {
  const navigate = useNavigate()

  const users = useSelector(state => state.users)
  const id = useParams().id
  const user = users.find(user => user.id === id)

  if (!user) {
    return null
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <h3>Lisätyt blogit:</h3>
      <ul>
        {user.blogs.map(blog =>
          <li key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          </li>
        )}
      </ul>
      <button onClick={() => navigate(-1)}>Takaisin</button>
    </div>
  )
}

export default UserBlog