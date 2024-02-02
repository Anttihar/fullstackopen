
const AddBlog = (props) => {
    return (
        <form onSubmit={props.addBlog}>
          <input 
            type="text"
            value={props.title}
            onChange={({ target }) => props.setTitle(target.value)}
            placeholder="Otsikko"
          />
          <br />
          <input
            type="text"
            value={props.author}
            onChange={({ target }) => props.setAuthor(target.value)}
            placeholder="Julkaisija"
          />
          <br />
          <input
            type="text"
            value={props.url}
            onChange={({ target }) => props.setUrl(target.value)}
            placeholder="Blogin url"
          />
          <br />
          <button type="submit">Tallenna</button>
        </form>
    )
}

export default AddBlog