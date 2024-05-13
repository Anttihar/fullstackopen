import { useState } from "react"
import LoginForm from "./LoginForm"
import PropTypes from "prop-types"

const AddBlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: title,
      author: author,
      url: url,
    })
    setTitle("")
    setAuthor("")
    setUrl("")
  }

  const inputStyle = {
    marginBottom: 1,
  }

  LoginForm.propTypes = {
    createBlog: PropTypes.func.isRequired,
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
