import { useState } from "react"
import { useDispatch } from "react-redux"
import { createBlog } from "../reducers/blogReducer"
import { setMessage, setErrorMessage } from "../reducers/messageReducer"

const AddBlogForm = () => {
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")
  const dispatch = useDispatch()

  const addBlog = (event) => {
    event.preventDefault()
    const newObject = {
      title,
      author,
      url,
      likes: 0
    }
    try {
      dispatch(createBlog(newObject))
      dispatch(setMessage('Uusi blogi lisätty onnistuneesti!'))
      setTimeout(() => {
        dispatch(setMessage(null))
      }, 5000)
      setTitle("")
      setAuthor("")
      setUrl("")
    } catch (error) {
      console.error(error)
      dispatch(setErrorMessage("Jotain meni pieleen"))
      dispatch(setTimeout(() => {
        setErrorMessage(null)
      }, 5000))
    }
  }

  const inputStyle = {
    marginBottom: 1,
  }

  return (
    <div>
      <h3>Lisää uusi blogi:</h3>
      <form onSubmit={addBlog}>
        <input
          id="title"
          style={inputStyle}
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Otsikko"
        />
        <br />
        <input
          id="author"
          style={inputStyle}
          value={author}
          onChange={(event) => setAuthor(event.target.value)}
          placeholder="Julkaisija"
        />
        <br />
        <input
          id="url"
          style={inputStyle}
          value={url}
          onChange={(event) => setUrl(event.target.value)}
          placeholder="URL"
        />
        <br />
        <button id="add-button" type="submit">
          Tallenna
        </button>
      </form>
    </div>
  )
}

export default AddBlogForm
