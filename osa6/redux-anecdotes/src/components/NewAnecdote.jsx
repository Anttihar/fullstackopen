import { useDispatch } from "react-redux"
import { createAnecdote } from "../reducers/anecdoteReducer"

const AddAnecdote = () => {
  const dispatch = useDispatch()

  const newAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(createAnecdote(content))

  }
  return (
    <div>
      <h2>Create new</h2>
      <form onSubmit={newAnecdote}>
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

export default AddAnecdote