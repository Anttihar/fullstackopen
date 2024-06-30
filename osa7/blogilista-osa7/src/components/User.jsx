import { Link } from "react-router-dom"

const User = ({ user, i }) => {
  return (
    <tr>
      <td>{i + 1}</td>
      <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
      <td>{user.blogs.length}</td>
    </tr>
  )
}

export default User