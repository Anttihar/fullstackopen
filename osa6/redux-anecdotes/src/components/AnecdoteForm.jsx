import { useDispatch } from "react-redux"
import { createAnecdote } from "../reducers/anecdoteReducer"
import { createNotification, emptyNotification } from "../reducers/notificationReducer"

const AddAnecdote = () => {
  const dispatch = useDispatch()

  const newAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(createAnecdote(content))
    dispatch(createNotification(`New anecdote created: '${content}'`))
    setTimeout(() => {
      dispatch(emptyNotification())
    }, 5000);
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

export default AddAnecdote