import Anecdotes from "./components/AnecdoteList"
import AddAnecdote from "./components/AnecdoteForm"
import Filter from "./components/Filter"
import Notification from "./components/Notification"

const App = () => {

  return (
    <div>
      <h2>Anecdotes</h2>
      <Filter />
      <Notification />
      <Anecdotes />
      <AddAnecdote />
    </div>
  )
}

export default App