import { useSelector, useDispatch } from "react-redux"
import { vote } from '../reducers/anecdoteReducer'

const Anecdotes = () =>{
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state)

  return(
    <div>
      <h2>Anecdotes</h2>
        {anecdotes.map(anecdote =>
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