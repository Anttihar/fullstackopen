import PropTypes from 'prop-types'

const Anecdote = ({ anecdote }) => {
  console.log('Anecdote: ', anecdote)

  Anecdote.propTypes = {
    anecdote: PropTypes.object
  }

  return (
    <div>
      <h3>{anecdote.content} by {anecdote.author}</h3>
      <p>Has {anecdote.votes} votes</p>
      <p>For more info click <a href={anecdote.info} target='_blank' rel='noreferrer'>here</a></p>
    </div>
  )
}

export default Anecdote