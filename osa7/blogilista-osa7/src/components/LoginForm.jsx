import { useState } from "react"
import PropTypes from "prop-types"

const LoginForm = ({ login }) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = (event) => {
    event.preventDefault()
    login(username, password)
    setUsername("")
    setPassword("")
  }

  LoginForm.propTypes = {
    login: PropTypes.func.isRequired,
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
