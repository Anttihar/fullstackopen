import PropTypes from 'prop-types'

const AnecdoteList = ({ anecdotes }) => {
  AnecdoteList.propTypes = {
    anecdotes: PropTypes.object.isRequired
  }

  return (
    <div>
      <h2>Anecdotes:</h2>
      <ul>
        {anecdotes.map(anecdote => <li key={anecdote.id} >{anecdote.content}</li>)}
      </ul>
    </div>
  )
  
}

export default AnecdoteList