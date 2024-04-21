import { useSelector, useDispatch } from "react-redux"
import { vote } from '../reducers/anecdoteReducer'

const Anecdotes = () =>{
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state)

  const sortedAnecdotes = anecdotes.sort((a, b) => b.votes - a.votes)

  return(
    <div>
      <h2>Anecdotes</h2>
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