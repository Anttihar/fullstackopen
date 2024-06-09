import { useState } from "react"
import blogService from "../services/blogs"
import { FcCollapse, FcExpand, FcLike } from "react-icons/fc"
import { MdDelete } from "react-icons/md"
import PropTypes from "prop-types"
import { useDispatch } from "react-redux"
import { deleteBlog, likeBlog } from "../reducers/blogReducer"

const Blog = ({ blog, user }) => {
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

  const deleteStyle = {
    color: "red",
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
      blogService.update(likedBlog)
        .then(likedBlog => dispatch(likeBlog(likedBlog)))
    } catch (error) {
      /*setErrorMessage("jotain meni pieleen")*/
      console.error(error)
    }
  }

  const handleDelete = (id) => {
    if (window.confirm(`Haluatko varmasti poistaa tämän blogin?`)) {
      blogService.remove(id)
        .then(() => {
          dispatch(deleteBlog(id))
          /*
          setMessage("Blogi poistettu")
          setTimeout(() => {
            setMessage("")
          }, 5000)
          */
        })
        .catch((error) => {
          console.log(error.response.status)
          /*
          if (error.response.status === 401) {
            setErrorMessage(
              "Käyttöoikeutesi eivät riitä tämän blogin poistamiseen",
            )
            setTimeout(() => {
              setErrorMessage("")
            }, 5000)
          } else {
            setErrorMessage("Blogin poistaminen epäonnistui")
            setTimeout(() => {
              setErrorMessage("")
            }, 5000)
          } */
        })
    }
  }

  Blog.propTypes = {
    blog: PropTypes.object.isRequired
  }

  return (
    <div style={blogStyle} className="blog">
      {blog.title}, {blog.author}
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
        <br />
        {blog.user.name}
        <br />
        {user === blog.user.name && (
          <MdDelete
            style={deleteStyle}
            onClick={() => handleDelete(blog.id)}
            id="delete"
          />
        )}
      </div>
    </div>
  )
}

export default Blog
