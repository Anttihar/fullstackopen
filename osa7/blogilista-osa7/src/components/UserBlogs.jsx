import { useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { Link } from "react-router-dom"
import { Button, Table } from "react-bootstrap"

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
      <Table striped bordered>
        <thead>
          <tr>
            <th>#</th>
            <th>Otsikko</th>
            <th>Tykkäykset</th>
          </tr>
        </thead>
        <tbody>
          {user.blogs.map((blog, i) =>
            <tr key={blog.id}>
              <td>{i + 1}</td>
              <td><Link to={`/blogs/${blog.id}`}>{blog.title}</Link></td>
              <td>{blog.likes}</td>
            </tr>
          )}
        </tbody>
      </Table>
      <Button size="sm" onClick={() => navigate(-1)}>Takaisin</Button>
    </div>
  )
}

export default UserBlog