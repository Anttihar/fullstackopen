import { useState } from "react"
import { FcCollapse, FcExpand, FcLike } from "react-icons/fc"
import { MdDelete } from "react-icons/md"
import PropTypes from "prop-types"

const Blog = ({ blog, handleDelete, addLike }) => {
  const [visible, setVisible] = useState(false)

  const blogStyle = {
    paddingTop: 5,
    paddingLeft: 5,
    paddingBottom: 5,
    border: 'solid',
    borderRadius: 3,
    borderWidth: 1,
    marginBottom: 5
  }

  const likeStyle = {
    marginLeft: 5
  }

  const hideWhenVisible = {
    display: visible ? 'none' : ''
  }

  const showWhenVisible = {
    display: visible ? '' : 'none'
  }

  const deleteStyle = {
    color: 'red'
  }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const handleLike = (blog) => {
    addLike({ ...blog, likes: blog.likes + 1 })
  }

  Blog.propTypes = {
    blog: PropTypes.object.isRequired,
    handleDelete: PropTypes.func.isRequired,
    addLike: PropTypes.func.isRequired
  }

  return (
    <div style={ blogStyle } id="blog">
      { blog.title }, { blog.author }
      <FcExpand
        style={ hideWhenVisible }
        onClick={ toggleVisibility }
        id="expand"
      />
      <FcCollapse
        style={ showWhenVisible }
        onClick={ toggleVisibility }
        id="collapse"
      />
      <div style={ showWhenVisible } id="expanded">
        { blog.url } <br/>
        Tykkäykset: { blog.likes }
        <FcLike
          style={ likeStyle }
          onClick={ () => handleLike(blog) }
          id="like"
        />
        <br/>
        {blog.user.name}
        <br/>
        <MdDelete
          style={ deleteStyle }
          onClick={ () => handleDelete(blog.id) }
          id="delete"
        />
      </div>
    </div>
  )
}

export default Blog