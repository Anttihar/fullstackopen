import { useState } from "react"
import { useDispatch } from "react-redux"
import { likeBlog } from "../reducers/blogReducer"
import { setErrorMessage, setMessage } from "../reducers/messageReducer"
import { Link } from "react-router-dom"
import PropTypes from "prop-types"
import { FcCollapse, FcExpand, FcLike } from "react-icons/fc"

const Blog = ({ blog, i }) => {
  const [visible, setVisible] = useState(false)
  const dispatch = useDispatch()

  const hideWhenVisible = {
    display: visible ? "none" : "",
  }

  const showWhenVisible = {
    display: visible ? "" : "none",
  }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const handleLike = (blog) => {
    const likedBlog = { ...blog, likes: blog.likes + 1 }
    try {
      dispatch(likeBlog(likedBlog))
      dispatch(setMessage(`Tykätty blogista ${likedBlog.title}!`))
      setTimeout(() => {
        dispatch(setMessage(null))
      }, 5000)
    } catch (error) {
      console.error(error)
      dispatch(setErrorMessage('Jotakin meni pieleen..'))
    }
  }

  Blog.propTypes = {
    blog: PropTypes.object.isRequired
  }

  return (
    <tr>
      <td>
        {i + 1}
      </td>
      <td>
        <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
        <p className="mb-0" style={showWhenVisible}>Linkki blogiin: <a href={blog.url}>{blog.url}</a></p>
        <p className="mb-0" style={showWhenVisible}>Tykkää! <FcLike onClick={() => handleLike(blog)} /></p>
        <p className="mb-0" style={showWhenVisible}>Blogin lisännyt: {blog.user.name}</p>
      </td>
      <td>
        {blog.author}
      </td>
      <td>
        {blog.likes}
      </td>
      <td>
        <FcExpand style={hideWhenVisible} onClick={() => toggleVisibility()} />
        <FcCollapse style={showWhenVisible} onClick={() => toggleVisibility()} />
      </td>
    </tr>
  )
}

export default Blog
