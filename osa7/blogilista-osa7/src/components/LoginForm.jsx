import { useState } from "react"
import { useDispatch } from "react-redux"
import loginService from '../services/login'
import blogService from '../services/blogs'
import { setUser } from "../reducers/userReducer"
import { setMessage, setErrorMessage } from "../reducers/messageReducer"
import { Form, Row, Col, Button } from "react-bootstrap"

const LoginForm = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const dispatch = useDispatch()

  const handleLogin = (event) => {
    event.preventDefault()
    login(username, password)
    setUsername("")
    setPassword("")
  }

  const login = async (username, password) => {
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem("loggedAppUser", JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch(setUser(user))
      dispatch(setMessage(`Moi ${user.name}!`))
      setTimeout(() => {
        dispatch(setMessage(null))
      }, 5000)
    } catch (exeption) {
      dispatch(setErrorMessage("Virheellinen käyttäjätunnus tai salasana"))
      setTimeout(() => {
        dispatch(setErrorMessage(null))
      }, 5000)
    }
  }

  return (
    <div>
      <h3>Kirjaudu sisään:</h3>
      <Form onSubmit={handleLogin}>
        <Form.Group as={Row} className="formUsername mb-2">
          <Form.Label column sm="1">Käyttäjänimi</Form.Label>
          <Col sm="3">
            <Form.Control
              placeholder="Käyttäjänimi"
              onChange={(event) => setUsername(event.target.value)}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="formPassword mb-2">
          <Form.Label column sm="1">Salasana</Form.Label>
          <Col sm="3">
            <Form.Control
              type="password"
              placeholder="Salasana"
              onChange={(event => setPassword(event.target.value))}
            />
          </Col>
        </Form.Group>
        <Button id="login-button" type="submit">
          Kirjaudu
        </Button>
      </Form>
    </div>
  )
}

export default LoginForm