import  { useDispatch } from "react-redux"
import { createAnecdote } from "../reducers/anecdoteReducer"
import PropTypes from "prop-types"

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const newAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(createAnecdote(content))
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