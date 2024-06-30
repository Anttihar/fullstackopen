import { useSelector } from "react-redux"
import User from "./User"
import { Table } from "react-bootstrap"

const Users = () => {
  const users = useSelector(state => state.users)
  const sortedUsers = [...users].sort((a, b) => b.blogs.length - a.blogs.length)

  return (
    <div>
      <h3>Käyttäjät:</h3>
      <Table striped bordered>
        <thead>
          <tr>
            <th>#</th>
            <th>Nimi:</th>
            <th>Blogit:</th>
          </tr>
        </thead>
        <tbody>
          {sortedUsers.map((user, i) =>
            <User
              key={user.id}
              user={user}
              i={i}
            />
          )}
        </tbody>
      </Table>
    </div>
  )
}

export default Users