import { useEffect } from "react"
import Anecdotes from "./components/AnecdoteList"
import AnecdoteForm from "./components/AnecdoteForm"
import Filter from "./components/Filter"
import Notification from "./components/Notification"
import anecdoteService from "./services/anecdotes"
import { setAnecdotes } from "./reducers/anecdoteReducer"
import { useDispatch } from "react-redux"
import { createAnecdote } from "./reducers/anecdoteReducer"
import { createNotification, emptyNotification } from "./reducers/notificationReducer"

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    anecdoteService
      .getAll()
      .then(anecdotes => dispatch(setAnecdotes(anecdotes)))
  }, [dispatch])

  const addAnecdote = async (newAnecdote) => {
    console.log('addAnecdotes kutsuttu', newAnecdote)
    const createdAnecdote = await anecdoteService.createAnecdote(newAnecdote)
    try {
      console.log('luotu: ', createdAnecdote)
      dispatch(createAnecdote(createdAnecdote.content))
      dispatch(createNotification(`New anecdote created: '${createdAnecdote.content}'`))
      setTimeout(() => {
        dispatch(emptyNotification())
      }, 5000)
    }
    catch (error) {
      console.log('error')
    }
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      <Filter />
      <Notification />
      <Anecdotes />
      <AnecdoteForm addAnecdote={addAnecdote} />
    </div>
  )
}

export default App