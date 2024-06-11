import { useDispatch, useSelector } from "react-redux"
import { deleteBlog } from "../reducers/blogReducer"
import { MdDelete } from "react-icons/md"
import { setMessage, setErrorMessage } from "../reducers/messageReducer"

const Name = ({ blog }) => {
  const dispatch = useDispatch()
  const user = useSelector(({ user }) => user.user)

  const deleteStyle = {
    color: "red",
  }

  const handleDelete = (id) => {
    if (window.confirm(`Haluatko varmasti poistaa tämän blogin?`)) {
      try {
        dispatch(deleteBlog(id))
        dispatch(setMessage('Blogi poistettu'))
        setTimeout(() => {
          dispatch(setMessage(null))
        }, 5000)
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
      {blog.user.name}
      <br/>
      {user.username === blog.user.username && (
        <MdDelete
          style={deleteStyle}
          onClick={() => handleDelete(blog.id)}
          id="delete"
        />
      )}
    </div>
  )
}

export default Name