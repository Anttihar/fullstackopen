import { useState } from "react"
import { useDispatch } from "react-redux"
import loginService from '../services/login'
import blogService from '../services/blogs'
import { setUser } from "../reducers/userReducer"
import { setMessage, setErrorMessage } from "../reducers/messageReducer"

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
      <form onSubmit={handleLogin}>
        <input
          id="username"
          name="username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          placeholder="Käyttäjänimi"
        />
        <br />
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Salasana"
        />
        <br />
        <button id="login-button" type="submit">
          Kirjaudu
        </button>
      </form>
    </div>
  )
}

export default LoginForm