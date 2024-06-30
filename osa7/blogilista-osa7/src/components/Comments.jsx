import { useState } from "react"
import Togglable from "./Togglable"
import { useDispatch } from "react-redux"
import { setErrorMessage, setMessage } from "../reducers/messageReducer"
import { addComment } from "../reducers/blogReducer"
import { Button, Form } from "react-bootstrap"

const Comments = ({ blog }) => {
  const [comment, setComment] = useState('')
  const dispatch = useDispatch()

  const newComment = (event) => {
    event.preventDefault()
    const newComment = {
      comment: comment
    }
    try {
      dispatch(addComment(newComment, blog.id))
      dispatch(setMessage('Kommentti lisätty!'))
      setTimeout(() => {
        dispatch(setMessage(null))
      }, 5000)
      setComment('')
    } catch (error) {
      console.error(error)
      dispatch(setErrorMessage('Kommentin lähetys epäonnistui'))
      setTimeout(() => {
        dispatch(setErrorMessage(null))
      }, 5000)
    }
  }

  return (
    <div>
      <ul>
        {blog.comments.map(comment =>
          <li key={comment.id}>
            {comment.comment}
          </li>
        )}
      </ul>
      <Togglable buttonLabel='Uusi kommentti'>
        <Form onSubmit={newComment}>
          <Form.Group className="formComment mb-2">
            <Form.Control
              onChange={(event) => setComment(event.target.value)}
              placeholder="Kirjoita kommentti.."
            />
          </Form.Group>
          <Button type="submit" size="sm">Lähetä</Button>
        </Form>
      </Togglable>
    </div>
  )
}

export default Comments