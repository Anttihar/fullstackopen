import { useSelector, useDispatch } from "react-redux"
import { vote } from '../reducers/anecdoteReducer'

const Anecdotes = () =>{
  const dispatch = useDispatch()
  const anecdotes = useSelector(({ filter, anecdotes }) => {
    if (filter) {
    return anecdotes.filter(anecdote => 
      anecdote.content.toLowerCase().includes(filter.toLowerCase()))
    }
    return anecdotes
  })

  const sortedAnecdotes = anecdotes.sort((a, b) => b.votes - a.votes)

  return(
    <div>
      {sortedAnecdotes.map(anecdote =>
        <ul key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={ () => dispatch(vote(anecdote.id))}>vote</button>
          </div>
        </ul>
      )}
    </div>
  )
}

export default Anecdotes