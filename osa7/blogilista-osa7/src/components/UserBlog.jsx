import { FcLike } from "react-icons/fc"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { likeBlog, deleteBlog } from "../reducers/blogReducer"
import { setMessage, setErrorMessage } from "../reducers/messageReducer"
import Comments from "./Comments"
import { Button } from "react-bootstrap"
import { MdDelete } from "react-icons/md"

const UserBlog = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const blogs = useSelector(state => state.blogs)
  const user = useSelector(({ user }) => user.user)
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

  const handleDelete = (id) => {
    if (window.confirm(`Haluatko varmasti poistaa tämän blogin?`)) {
      try {
        dispatch(deleteBlog(id))
        dispatch(setMessage('Blogi poistettu'))
        setTimeout(() => {
          dispatch(setMessage(null))
        }, 5000)
        navigate(-1)
      } catch (error) {
        console.error(error)
        if (error.response.status === 401) {
          dispatch(setErrorMessage(
            "Käyttöoikeutesi eivät riitä tämän blogin poistamiseen",
          ))
          setTimeout(() => {
            dispatch(setErrorMessage(null))
          }, 5000)
        } else {
          dispatch(setErrorMessage("Blogin poistaminen epäonnistui"))
          setTimeout(() => {
            dispatch(setErrorMessage(null))
          }, 5000)
        }
      }
    }
  }

  return (
    <div>
      <h2>{blog.title}</h2>
      <p>
        Linkki: <a href={blog.url}>{blog.url}</a> <br />
        Tykkäykset: {blog.likes} <FcLike className="ms-2" onClick={() => handleLike(blog)} /> <br />
        Lisännyt: {blog.user.name} <br />
        {user.username === blog.user.username && (
          <Button size="sm" variant="outline-danger" onClick={() => handleDelete(blog.id)}>
            Poista <MdDelete />
          </Button>
        )}
      </p>
      <h3>Kommentit:</h3>
      <Comments blog={blog} /> <br />
      <Button size="sm" variant="outline-primary" onClick={() => navigate(-1)}>Takaisin</Button>
    </div>
  )
}

export default UserBlog