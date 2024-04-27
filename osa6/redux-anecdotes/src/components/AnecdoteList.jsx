import { useSelector, useDispatch } from "react-redux"
import { vote } from '../reducers/anecdoteReducer'
import { emptyNotification, voteNotification } from "../reducers/notificationReducer"

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

  const handleVoteClick = (id, content) => {
    dispatch(vote(id))
    dispatch(voteNotification(`Voted anecdote: '${content}'`))
    setTimeout(() => {
      dispatch(emptyNotification())
    }, 5000)
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
          <button onClick={ () => handleVoteClick(anecdote.id, anecdote.content)}>vote</button>
        </ol>
      )}
    </div>
  )
}

export default Anecdotes