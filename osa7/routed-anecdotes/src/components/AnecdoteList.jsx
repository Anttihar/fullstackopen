import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const AnecdoteList = ({ anecdotes }) => {
  AnecdoteList.propTypes = {
    anecdotes: PropTypes.array.isRequired
  }

  return (
    <div>
      <h2>Anecdotes:</h2>
      <ul>
        {anecdotes.map(anecdote =>
          <li key={anecdote.id}>
            <Link to={`/anecdotes/${anecdote.id}`}> {anecdote.content} </Link>
          </li>
        )}
      </ul>
    </div>
  )
}

export default AnecdoteList