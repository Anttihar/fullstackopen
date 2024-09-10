import { useNavigate } from "react-router-dom"
import { useField } from "../hooks"
import PropTypes from 'prop-types'

const CreateNew = (props) => {
  const reset = useField('reset')
  const content = useField('text')
  const author = useField('text')
  const info = useField('text')
  

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    })
    props.setNoti(content.value)
    navigate('/')
  }

  CreateNew.propTypes = {
    addNew: PropTypes.func.isRequired,
    setNoti: PropTypes.func.isRequired
  }

  return (
    <div>
      <h2>Create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          Content: <input {...content} />
        </div>
        <div>
          Author: <input {...author} />
        </div>
        <div>
          Url for more info: <input {...info} />
        </div>
        <button type="submit">Create</button>
        <button {...reset}>Reset</button>
      </form>
    </div>
  )
}

export default CreateNew