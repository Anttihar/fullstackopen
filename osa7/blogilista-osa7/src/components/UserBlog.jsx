import { FcLike } from "react-icons/fc"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { likeBlog } from "../reducers/blogReducer"
import { setMessage, setErrorMessage } from "../reducers/messageReducer"

const UserBlog = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const blogs = useSelector(state => state.blogs)
  const id = useParams().id
  const blog = blogs.find(blog => blog.id === id)

  if (!blog) {
    return null
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

  return (
    <div>
      <h3>{blog.title}</h3>
      <p>
        Linkki: <a href={blog.url}>{blog.url}</a> <br />
        Tykkäykset: {blog.likes} <FcLike onClick={() => handleLike(blog)} /> <br />
        Lisännyt: {blog.user.name}
      </p>
      <button onClick={() => navigate(-1)}>Takaisin</button>
    </div>
  )
}

export default UserBlog