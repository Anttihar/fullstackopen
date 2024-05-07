import PropTypes from 'prop-types'

const Notification = ({ message }) => {
  const style = {
    'color': 'green',
    'padding': 10,
    'border': 2,
    'borderStyle': 'solid',
    'fontSize': 17
  }

  Notification.propTypes = {
    message: PropTypes.string
  }

  if (!message) {
    return null
  }
  return (
    <div style={style}>
      Created new anecdote: <strong>{message}</strong>
    </div>
  )
}

export default Notification