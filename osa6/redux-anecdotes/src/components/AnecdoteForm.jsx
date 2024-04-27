import PropTypes from "prop-types"

const AnecdoteForm = ({ addAnecdote }) => {

  const newAnecdote = (event) => {
    event.preventDefault()
    const value = event.target.anecdote.value
    event.target.anecdote.value = ''
    addAnecdote({
      content: value,
      votes: 0
    })
  }

  AnecdoteForm.propTypes = {
    addAnecdote: PropTypes.func.isRequired
  }

  return (
    <div>
      <h2>Create new</h2>
      <form id="anecdoteForm" onSubmit={newAnecdote}>
        <input 
          type="text"
          name="anecdote"
        />
        <br/>
        <button type="submit">Create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm