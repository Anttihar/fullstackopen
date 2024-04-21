import Anecdotes from "./components/AnecdoteList"
import AddAnecdote from "./components/AnecdoteForm"
import Filter from "./components/Filter"

const App = () => {

  return (
    <div>
      <h2>Anecdotes</h2>
      <Filter />
      <Anecdotes />
      <AddAnecdote />
    </div>
  )
}

export default App