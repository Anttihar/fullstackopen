import { useRef } from "react"
import { useSelector } from "react-redux"
import Blog from "./Blog"
import Togglable from "./Togglable"
import AddBlogForm from "./AddBlogForm"
import { Table } from "react-bootstrap"
import { FcLike } from "react-icons/fc"

const Blogs = () => {
  const addFormRef = useRef()
  const blogs = useSelector(({ blogs }) => blogs)
  const sortedBlogs = [...blogs].sort((a,b) => b.likes - a.likes)
  console.log(blogs)
  return (
    <div>
      <Togglable buttonLabel="Lisää uusi blogi" ref={addFormRef}>
        <AddBlogForm addFormRef={addFormRef} />
      </Togglable>
      <h3>Blogit:</h3>
      <Table size="md" striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Otsikko</th>
            <th>Julkaisija</th>
            <th><FcLike /></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {sortedBlogs.map((blog, i) => (
            <Blog
              key={blog.id}
              blog={blog}
              i={i}
            />
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default Blogs