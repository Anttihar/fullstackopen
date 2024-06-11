import { useSelector } from "react-redux"
import User from "./User"

const Users = () => {
  const users = useSelector(state => state.users)
  const sortedUsers = [...users].sort((a, b) => b.blogs.length - a.blogs.length)

  return (
    <div>
      <h3>Käyttäjät:</h3>
      <table>
        <thead>
          <tr>
            <th>Nimi:</th><th>Blogit:</th>
          </tr>
        </thead>
        <tbody>
          {sortedUsers.map(user =>
            <User
              key={user.id}
              user={user}
            />
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Users