import { useState } from "react"
import { useDispatch } from "react-redux"
import { likeBlog } from "../reducers/blogReducer"
import { setErrorMessage, setMessage } from "../reducers/messageReducer"
import Name from "./Name"
import { Link } from "react-router-dom"
import PropTypes from "prop-types"
import { FcCollapse, FcExpand, FcLike } from "react-icons/fc"

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false)
  const dispatch = useDispatch()

  const blogStyle = {
    paddingTop: 5,
    paddingLeft: 5,
    paddingBottom: 5,
    border: "solid",
    borderRadius: 3,
    borderWidth: 1,
    marginBottom: 5,
  }

  const likeStyle = {
    marginLeft: 5,
  }

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
    <div style={blogStyle} className="blog">
      <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>, {blog.author}
      <FcExpand
        style={hideWhenVisible}
        onClick={toggleVisibility}
        id="expand"
      />
      <FcCollapse
        style={showWhenVisible}
        onClick={toggleVisibility}
        id="collapse"
      />
      <div style={showWhenVisible} id="expanded">
        {blog.url}
        <br />
        Tykkäykset: {blog.likes}
        <FcLike style={likeStyle} onClick={() => handleLike(blog)} id="like" />
        <Name blog={blog} />
      </div>
    </div>
  )
}

export default Blog
