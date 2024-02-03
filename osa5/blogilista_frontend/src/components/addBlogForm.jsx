import { useState } from "react"

const AddBlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: title,
      author: author,
      url: url
    })
    setTitle('')
    setAuthor('')
    setUrl('')
  }


  return (
    <div>
      <h3>Lisää uusi blogi:</h3>
      <form onSubmit={addBlog}>
        <input
          value={title}
          onChange={ event => setTitle(event.target.value) }
          placeholder="Otsikko"
        />
        <br />
        <input
          value={author}
          onChange={ event => setAuthor(event.target.value) }
          placeholder="Julkaisija"
        />
        <br />
        <input
          value={url}
          onChange={ event => setUrl(event.target.value) }
          placeholder="Blogin url"
        />
        <br />
        <button type="submit">Tallenna</button>
      </form>
    </div>
  )
}

export default AddBlogForm