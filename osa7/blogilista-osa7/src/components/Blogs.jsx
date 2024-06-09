import { useSelector } from "react-redux"
import Blog from "./Blog"

const Blogs = ({ user }) => {
  const blogs = useSelector(state => state.blogs)
  console.log('blogit: ', blogs)
  return (
    <div>
      <h3>Blogit:</h3>
      {blogs.map(blog => (
        <Blog
          key={blog.id}
          blog={blog}
          user={user.name}
        />
      ))}
    </div>
  )
}

export default Blogs