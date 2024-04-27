import { useSelector, useDispatch } from "react-redux"
import { voteAnecdote } from '../reducers/anecdoteReducer'

const Anecdotes = () => {
  const dispatch = useDispatch()

  const anecdotes = useSelector(({ filter, anecdotes }) => {
    const filterValue = filter['filter']
    if (filterValue !== '') {
      return (
        anecdotes.filter(anecdote => {
          return anecdote.content.toLowerCase().includes(filterValue.toLowerCase())
        })
      )
    }
    return anecdotes
  })

  const arrayforsort = [...anecdotes]
  
  const sortedAnecdotes = arrayforsort.sort((a, b) => b.votes - a.votes)

  const handleVoteClick = (anecdote) => {
    const votedAnecdote = { ...anecdote, votes: anecdote.votes + 1 }
    dispatch(voteAnecdote(votedAnecdote))
  }

  return (
    <div>
      {sortedAnecdotes.map(anecdote =>
        <ol key={anecdote.id}>          
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
          </div>
          <button onClick={ () => handleVoteClick(anecdote)}>vote</button>
        </ol>
      )}
    </div>
  )
}

export default Anecdotes