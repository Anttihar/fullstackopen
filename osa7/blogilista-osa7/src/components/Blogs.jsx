import { useSelector } from "react-redux"
import Blog from "./Blog"
import Togglable from "./Togglable"
import AddBlogForm from "./AddBlogForm"

const Blogs = () => {
  const blogs = useSelector(({ blogs }) => blogs)
  const sortedBlogs = [...blogs].sort((a,b) => b.likes - a.likes)

  return (
    <div>
      <Togglable buttonLabel="Lisää uusi blogi">
        <AddBlogForm />
      </Togglable>
      <h3>Blogit:</h3>
      {sortedBlogs.map(blog => (
        <Blog
          key={blog.id}
          blog={blog}
        />
      ))}
    </div>
  )
}

export default Blogs