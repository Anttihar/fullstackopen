import { useState } from "react"
import { useDispatch } from "react-redux"
import { createBlog } from "../reducers/blogReducer"
import { setMessage, setErrorMessage } from "../reducers/messageReducer"
import { Button, FloatingLabel, Form, Col } from "react-bootstrap"

const AddBlogForm = ({ addFormRef }) => {
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")
  const [validated, setValidated] = useState(null)
  const dispatch = useDispatch()

  const addBlog = async (event) => {
    handleValidation(event)
    event.preventDefault()
    const newObject = {
      title,
      author,
      url,
      likes: 0
    }
    try {
      await dispatch(createBlog(newObject))
      dispatch(setMessage('Uusi blogi lisätty'))
      setTimeout(() => {
        dispatch(setMessage(null))
      }, 5000)
      setTitle('')
      setAuthor('')
      setUrl('')
      addFormRef.current.toggleVisibility()
      setValidated(null)
    } catch (error) {
      console.error(error)
      dispatch(setErrorMessage("Jotain meni pieleen"))
      setTimeout(() => {
        dispatch(setErrorMessage(null))
      }, 5000)
    }
  }

  const handleValidation = (event) => {
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
    }
    setValidated(true)
  }

  return (
    <div className="mt-3">
      <h3>Lisää uusi blogi:</h3>
      <br />
      <Form noValidate validated={validated} onSubmit={addBlog}>
        <Col sm={6}>
          <FloatingLabel className="mb-2" controlId="formTitle" label="Otsikko">
            <Form.Control
              required
              placeholder="Otsikko"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
            <Form.Control.Feedback type="invalid">Täytä tämä kenttä</Form.Control.Feedback>
          </FloatingLabel>
          <FloatingLabel className="mb-2" controlId="formAuthor" label="Julkaisija">
            <Form.Control
              required
              placeholder="Julkaisija"
              value={author}
              onChange={(event) => setAuthor(event.target.value)}
            />
            <Form.Control.Feedback type="invalid">Täytä tämä kenttä</Form.Control.Feedback>
          </FloatingLabel>
          <FloatingLabel className="mb-2" controlId="formUrl" label="URL">
            <Form.Control
              required
              placeholder="URL"
              value={url}
              onChange={(event) => setUrl(event.target.value)}
            />
            <Form.Control.Feedback type="invalid">Täytä tämä kenttä</Form.Control.Feedback>
          </FloatingLabel>
          <Button className="mb-2" id="formAddButton" type="submit">
            Tallenna
          </Button>
        </Col>
      </Form>
    </div>
  )
}

export default AddBlogForm
